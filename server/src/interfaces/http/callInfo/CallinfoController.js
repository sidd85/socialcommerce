const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const CallinfoController = {
 
  get router() {
    const router = Router();
    router.use(inject('callinfoSerializer'));    

    router.get("/",inject("getAllCallinfo"), this.index);
    // router.get("/callInfo", inject("getAllCallInfo"), this.getAllCallInfo); 

    return router;
  },

  index(req, res, next) {
    const { getAllCallinfo, callinfoSerializer } = req;
    const { SUCCESS, ERROR } = getAllCallinfo.outputs;
    getAllCallinfo
      .on(SUCCESS, callinfo => {
        // console.log(callinfo);
        const itemCount = callinfo.count;
        const pageCount = Math.ceil(itemCount / req.query.limit);
        const limit = req.query.limit;
        const currentPage = req.query.page;
        const results = {
          callinfo: callinfo.rows.map(callinfoSerializer.serialize),
          pageCount,
          itemCount,
          limit,
          currentPage
        };        
        res.status(Status.OK).json(results);
      })
      .on(ERROR, next);

    getAllCallinfo.execute(
      req.query.page,
      req.query.limit
    );
  },
};

module.exports = CallinfoController;
