const { Router } = require("express");
const paginate = require("express-paginate");
const { inject } = require("awilix-express");
const Status = require("http-status");

const ProductReviewController = {
  get router() {
    const router = Router();

    router.use(inject("customerSessionSerializer"));
    
    router.post("/Cust", inject("postCustomerSession"), this.postCustomerSession);
    
    return router;
  },
  postCustomerSession(req, res, next) {
    const { postCustomerSession, customerSessionSerializer } = req;
    const { SUCCESS, ERROR, NOT_FOUND, UNAUTHORIZED } = postCustomerSession.outputs;
    postCustomerSession
      .on(SUCCESS, order => {
        const results = order;
        console.log(results,"%%%%%%%%%%%%%%%%%%")
        res.status(Status.OK).json(results);
      })
      .on(UNAUTHORIZED, message => {
        res.status(Status.UNAUTHORIZED).json({ message: message });
      })
      .on(ERROR, next);
      console.log(req.body,"!!!!!!!!!!!!!!!!!")
      postCustomerSession.execute(req.body);
  }
};

module.exports = ProductReviewController;
