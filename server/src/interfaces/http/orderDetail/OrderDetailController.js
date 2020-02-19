const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const OrederDetailController = {
 
  get router() {
    const router = Router();
    router.use(inject('orderDetailSerializer'));          
    router.post("/",inject("getAllOrderDetail"), this.getAllOrderDetail);
    return router;
  },
  getAllOrderDetail(req, res, next) {
    const { getAllOrderDetail, orderDetailSerializer } = req;
    const { SUCCESS, ERROR, NOT_FOUND, UNAUTHORIZED } = getAllOrderDetail.outputs;
    getAllOrderDetail
      .on(SUCCESS, order => {
        const results = order;
        res.status(Status.OK).json(results);
      })
      .on(UNAUTHORIZED, message => {
        res.status(Status.UNAUTHORIZED).json({ message: message });
      })
      .on(ERROR, next);
      getAllOrderDetail.execute(req.body);
  },
};

module.exports = OrederDetailController;