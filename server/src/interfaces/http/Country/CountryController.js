// const { Router } = require('express');
// const { inject } = require('awilix-express');
// const Status = require('http-status');

// const CountryInfoController = {
 
//   get router() {
//     const router = Router();
//     router.use(inject('countryinfoSerializer'));    

//     router.get("/",inject("getAllCountry"), this.getAllCountry);

//     return router;
//   },

//   index(req, res, next) {
//     const { getAllCountry, countryinfoSerializer } = req;
//     const { SUCCESS, ERROR } = getAllCity.outputs;
//     getAllCountry
//       .on(SUCCESS, callinfo => {        
//         const itemCount = callinfo.count;
//         const pageCount = Math.ceil(itemCount / req.query.limit);
//         const limit = req.query.limit;
//         const currentPage = req.query.page;
//         const results = {
//           callinfo: callinfo.rows.map(countryinfoSerializer.serialize),
//           pageCount,
//           itemCount,
//           limit,
//           currentPage
//         };        
//         res.status(Status.OK).json(results);
//       })
//       .on(ERROR, next);

//       getAllCountry.execute(
//       req.query.page,
//       req.query.limit
//     );
//   },
// };

// module.exports = CountryInfoController;