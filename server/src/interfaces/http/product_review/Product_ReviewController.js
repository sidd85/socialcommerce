const { Router } = require("express");
const paginate = require("express-paginate");
const { inject } = require("awilix-express");
const Status = require("http-status");

const ProductReviewController = {
  get router() {
    const router = Router();

    router.use(inject("product_ReviewSerializer"));
    console.log("ggerger");
    router.post("/findByProductReview", inject("postProductReview"), this.postProductReview);
    return router;
  },

  postProductReview(req, res, next) {
    const { postProductReview, product_ReviewSerializer } = req;
    const { SUCCESS, ERROR, NOT_FOUND, UNAUTHORIZED } = postProductReview.outputs;
    postProductReview
      .on(SUCCESS, order => {
        const results = order;
        res.status(Status.OK).json(results);
      })
      .on(UNAUTHORIZED, message => {
        res.status(Status.UNAUTHORIZED).json({ message: message });
      })
      .on(ERROR, next);
      postProductReview.execute(req.body);
  },

};

module.exports = ProductReviewController;
