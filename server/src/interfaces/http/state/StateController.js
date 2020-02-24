const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const getAllState = {
 
  get router() {
    const router = Router();
    router.use(inject("stateSerializer"));          
    router.post("/",inject("getAllState"), this.getAllState);
    return router;
  },
  getAllState(req, res, next) {
    const { getAllState, stateSerializer } = req;
    const { SUCCESS, ERROR, NOT_FOUND, UNAUTHORIZED } = getAllState.outputs;
    getAllState
      .on(SUCCESS, order => {
        const results = order;
        res.status(Status.OK).json(results);
      })
      .on(UNAUTHORIZED, message => {
        res.status(Status.UNAUTHORIZED).json({ message: message });
      })
      .on(ERROR, next);
      getAllState.execute(req.body);
  },
};

module.exports = getAllState;