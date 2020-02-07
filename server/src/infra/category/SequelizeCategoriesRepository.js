const CategoryMapper = require("./SequelizeCategoryMapper");

class SequelizeCategoriesRepository {
  constructor({ CategoryModel }) {
    this.CategoryModel = CategoryModel;
  }

  async getAllByDepartment(...args) {
    const categories = await this.CategoryModel.options.classMethods.getAllCategoriesByDepartment(
      args[0].department,
      args[0].page,
      args[0].limit,
      args[0].offset
    );
    let rows = JSON.parse(JSON.stringify(categories));
    categories.rows = rows;
    categories.count = rows.length;
    return categories;
  }

  async getAll(...args) {
    const categories = await this.CategoryModel.options.classMethods.getAllCategories(
      args[0].page,
      args[0].limit,
      args[0].offset
    );
    let rows = JSON.parse(JSON.stringify(categories));
    categories.rows = rows;
    categories.count = rows.length;
    return categories;
  }

  async getAllByCommunity(...args) {
    const categories = await this.CategoryModel.options.classMethods.getAllCategoriesByCommunity(
      args[0].community,
      args[0].page,
      args[0].limit,
      args[0].offset
    );
    let rows = JSON.parse(JSON.stringify(categories));
    categories.rows = rows;
    categories.count = rows.length;
    return categories;
  }
}

module.exports = SequelizeCategoriesRepository;
