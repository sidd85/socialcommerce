const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const OrderlistController = {
 
  get router() {
    const router = Router();
    router.use(inject("orderSerializer"));          
    router.post("/",inject("getAllOrderlist"), this.getAllOrderlist);
    return router;
  },
  getAllOrderlist(req, res, next) {
    const { getAllOrderlist, orderSerializer } = req;
    const { SUCCESS, ERROR, NOT_FOUND, UNAUTHORIZED } = getAllOrderlist.outputs;
    getAllOrderlist
      .on(SUCCESS, order => {
        const results = order;
        res.status(Status.OK).json(results);
      })
      .on(UNAUTHORIZED, message => {
        res.status(Status.UNAUTHORIZED).json({ message: message });
      })
      .on(ERROR, next);
      getAllOrderlist.execute(req.body);
  },
};

module.exports = OrderlistController;