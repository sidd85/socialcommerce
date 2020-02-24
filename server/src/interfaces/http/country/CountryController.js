const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const CountryController = {
 
  get router() {
    const router = Router();
    router.use(inject('countrySerializer'));    
    router.get("/",inject("getAllCountry"), this.getAllCountry);

    return router;
  },

  getAllCountry(req, res, next) {
    const { getAllCountry, countrySerializer } = req;
    const { SUCCESS, ERROR } = getAllCountry.outputs;
    getAllCountry
      .on(SUCCESS, country => {        
        const itemCount = country.count;
        const pageCount = Math.ceil(itemCount / req.query.limit);
        const limit = req.query.limit;
        const currentPage = req.query.page;
        const results = {
            country: country.rows.map(countrySerializer.serialize),
          pageCount,
          itemCount,
          limit,
          currentPage
        };        
        res.status(Status.OK).json(results);
      })
      .on(ERROR, next);

      getAllCountry.execute(
      req.query.page,
      req.query.limit
    );
  },
};

module.exports = CountryController;