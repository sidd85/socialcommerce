const { Router } = require("express");
const paginate = require("express-paginate");
const { inject } = require("awilix-express");
const Status = require("http-status");

const CommunityController = {
  get router() {
    const router = Router();

    router.use(inject("communitySerializer"));
    router.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    router.get("/", inject("getAllCommunities"), this.index);
    return router;
  },

  index(req, res, next) {
    const { getAllCommunities, communitySerializer } = req;
    const { SUCCESS, ERROR } = getAllCommunities.outputs;
    getAllCommunities
      .on(SUCCESS, communities => {
        const itemCount = communities.count;
        const pageCount = Math.ceil(itemCount / req.query.limit);
        const limit = req.query.limit;
        const currentPage = req.query.page;
        const results = {
          communities: communities.rows.map(communitySerializer.serialize),
          pageCount,
          itemCount,
          limit,
          currentPage
        };
        res.status(Status.OK).json(results);
      })
      .on(ERROR, next);

    getAllCommunities.execute(
      req.query.page,
      req.query.limit
    );
  }
};

module.exports = CommunityController;
