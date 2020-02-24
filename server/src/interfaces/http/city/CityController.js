const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const CityInfoController = {
 
  get router() {
    const router = Router();
    router.use(inject('cityinfoSerializer'));    

    router.get("/",inject("getAllCity"), this.getAllCity);

    return router;
  },

  index(req, res, next) {
    const { getAllCity, callinfoSerializer } = req;
    const { SUCCESS, ERROR } = getAllCity.outputs;
    getAllCity
      .on(SUCCESS, callinfo => {
        // console.log(callinfo);
        const itemCount = callinfo.count;
        const pageCount = Math.ceil(itemCount / req.query.limit);
        const limit = req.query.limit;
        const currentPage = req.query.page;
        const results = {
          callinfo: callinfo.rows.map(cityinfoSerializer.serialize),
          pageCount,
          itemCount,
          limit,
          currentPage
        };        
        res.status(Status.OK).json(results);
      })
      .on(ERROR, next);

      getAllCity.execute(
      req.query.page,
      req.query.limit
    );
  },
};

module.exports = CityInfoController;