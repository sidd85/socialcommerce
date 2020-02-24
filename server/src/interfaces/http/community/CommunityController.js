 const { Router } = require("express");
const paginate = require("express-paginate");
const { inject } = require("awilix-express");
const Status = require("http-status");

const CommunityController = {
  get router() {
    const router = Router();

    router.use(inject("communitySerializer"));

    router.get("/", inject("getAllCommunities"), this.index);
    router.get(
      "/findBySearchText",
      inject("getAllCommunitiesByText"),
      this.getAllCommunitiesByText
    );
    router.get("/agentName", inject("getAllAgentName"), this.getAllAgentName);
    
    
    router.get("/getOrderDetail", inject("getOrderDetail"), this.getOrderDetail);
    router.post("/communityDetail", inject("communityDetail"), this.communityDetail);

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
  },

  getAllCommunitiesByText(req, res, next) {
    const { getAllCommunitiesByText, communitySerializer } = req;
    const { SUCCESS, ERROR } = getAllCommunitiesByText.outputs;
    getAllCommunitiesByText
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
    getAllCommunitiesByText.execute(
      req.query.searchText,
      req.query.page,
      req.query.limit
    );
  },
  getAllAgentName(req, res, next) {
    const { getAllAgentName, communitySerializer } = req;
    const { SUCCESS, ERROR } = getAllAgentName.outputs;
    getAllAgentName
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

      getAllAgentName.execute(
      req.query.page,
      req.query.limit
    );
  },
  getOrderDetail(req, res, next) {
    const { getOrderDetail, communitySerializer } = req;
    const { SUCCESS, ERROR } = getOrderDetail.outputs;
    getOrderDetail
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

      getOrderDetail.execute(
      req.query.page,
      req.query.limit
    );
  },
  communityDetail(req, res, next) {
    const { communityDetail, communitySerializer } = req;
    const { SUCCESS, ERROR, NOT_FOUND, UNAUTHORIZED } = communityDetail.outputs;
    communityDetail
      .on(SUCCESS, order => {
        const results = order;
        res.status(Status.OK).json(results);
      })
      .on(UNAUTHORIZED, message => {
        res.status(Status.UNAUTHORIZED).json({ message: message });
      })
      .on(ERROR, next);
      communityDetail.execute(req.body);
  },

};

module.exports = CommunityController;