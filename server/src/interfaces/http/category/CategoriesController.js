const { Router } = require("express");
const paginate = require("express-paginate");
const { inject } = require("awilix-express");
const Status = require("http-status");

const CategoriesController = {
  get router() {
    const router = Router();

    router.use(inject("categorySerializer"));
    router.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    router.get("/", inject("getAllCategories"), this.index);
    router.get("/findByDepartment", inject("getAllCategoriesByDepartment"), this.getAllCategoriesByDepartment);
    return router;
  },

  index(req, res, next) {
    const { getAllCategories, categorySerializer } = req;
    const { SUCCESS, ERROR } = getAllCategories.outputs;
    getAllCategories
      .on(SUCCESS, categories => {
        const itemCount = categories.count;
        const pageCount = Math.ceil(itemCount / req.query.limit);
        const limit = req.query.limit;
        const currentPage = req.query.page;
        const results = {
          categories: categories.rows.map(categorySerializer.serialize),
          pageCount,
          itemCount,
          limit,
          currentPage
        };
        res.status(Status.OK).json(results);
      })
      .on(ERROR, next);

    getAllCategories.execute(
      req.query.page,
      req.query.limit
    );
  },

  getAllCategoriesByDepartment(req, res, next) {
    const { getAllCategoriesByDepartment, categorySerializer } = req;
    const { SUCCESS, ERROR } = getAllCategoriesByDepartment.outputs;
    getAllCategoriesByDepartment
      .on(SUCCESS, categories => {
        const itemCount = categories.count;
        const pageCount = Math.ceil(itemCount / req.query.limit);
        const limit = req.query.limit;
        const currentPage = req.query.page;
        const results = {
          categories: categories.rows.map(categorySerializer.serialize),
          pageCount,
          itemCount,
          limit,
          currentPage
        };
        res.status(Status.OK).json(results);
      })
      .on(ERROR, next);

    getAllCategoriesByDepartment.execute(
      parseInt(req.query.department) || 0,
      req.query.page,
      req.query.limit
    );
  }
};

module.exports = CategoriesController;
