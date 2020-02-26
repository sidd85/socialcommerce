const { Router } = require("express");
const paginate = require("express-paginate");
const { inject } = require("awilix-express");
const Status = require("http-status");

const SubCategoriesController = {
  get router() {
    const router = Router();

    router.use(inject("subCategorySerializer"));
    
    router.post("/findBySubCategory", inject("getSubCategory"), this.getSubCategory);
    return router;
  },

  getSubCategory(req, res, next) {
    const { getSubCategory, subcategorySerializer } = req;
    const { SUCCESS, ERROR, NOT_FOUND, UNAUTHORIZED } = getSubCategory.outputs;
    getSubCategory
      .on(SUCCESS, order => {
        const results = order;
        res.status(Status.OK).json(results);
      })
      .on(UNAUTHORIZED, message => {
        res.status(Status.UNAUTHORIZED).json({ message: message });
      })
      .on(ERROR, next);
      getSubCategory.execute(req.body);
  },

};

module.exports = SubCategoriesController;
