const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const CityController = {
 
  get router() {
    const router = Router();
    router.use(inject("citySerializer"));          
    router.post("/",inject("getAllCity"), this.getAllCity);
    return router;
  },
  getAllCity(req, res, next) {
    const { getAllCity, citySerializer } = req;
    const { SUCCESS, ERROR, NOT_FOUND, UNAUTHORIZED } = getAllCity.outputs;
    getAllCity
      .on(SUCCESS, order => {
        const results = order;
        res.status(Status.OK).json(results);
      })
      .on(UNAUTHORIZED, message => {
        res.status(Status.UNAUTHORIZED).json({ message: message });
      })
      .on(ERROR, next);
      getAllCity.execute(req.body);
  },

};
module.exports = CityController;

