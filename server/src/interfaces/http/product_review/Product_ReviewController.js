const { Router } = require("express");
const paginate = require("express-paginate");
const { inject } = require("awilix-express");
const Status = require("http-status");

const ProductReviewController = {
  get router() {
    const router = Router();

    router.use(inject("product_ReviewSerializer"));
    
    router.post("/findByProductReview", inject("postProductReview"), this.postProductReview);
    router.post("/findBygetAllProductReview",inject("getAllProductReview"), this.getAllProductReview);
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
  // getAllProductReview(req, res, next) {
  //   const { getAllProductReview, product_ReviewSerializer } = req;
  //   const { SUCCESS, ERROR } = getAllProductReview.outputs;
  //   getAllProductReview
  //     .on(SUCCESS, callinfo => {
  //       const itemCount = callinfo.count;
  //       const pageCount = Math.ceil(itemCount / req.query.limit);
  //       const limit = req.query.limit;
  //       const currentPage = req.query.page;       
  //       const results = {
  //         callinfo: callinfo.rows.map(product_ReviewSerializer.serialize),
  //         pageCount,
  //         itemCount,
  //         limit,
  //         currentPage
  //       };       
  //       res.status(Status.OK).json(results);
  //     })
  //     .on(ERROR, next);

  //     getAllProductReview.execute(
  //     req.query.page,
  //     req.query.limit
  //   );
  // }
    


  getAllProductReview(req, res, next) {
    const { getAllProductReview, product_ReviewSerializer } = req;
    const { SUCCESS, ERROR, NOT_FOUND, UNAUTHORIZED } = getAllProductReview.outputs;
    getAllProductReview
      .on(SUCCESS, order => {
        const results = order;
        res.status(Status.OK).json(results);
      })
      .on(UNAUTHORIZED, message => {
        res.status(Status.UNAUTHORIZED).json({ message: message });
      })
      .on(ERROR, next);
      getAllProductReview.execute(req.body);
  }
};

module.exports = ProductReviewController;
