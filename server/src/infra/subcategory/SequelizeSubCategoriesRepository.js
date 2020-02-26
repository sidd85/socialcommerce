const CategoryMapper = require("./SequelizeSubCategoryMapper");

class SequelizeSubCategoriesRepository {
  constructor({ SubCategoryModel}) {
    this.SubCategoryModel = SubCategoryModel;
  }

  

  async getSubCategory( Data) {
  
    const data = await this.SubCategoryModel.options.classMethods.getSubCategory(Data);  
    return data;
  }

}

module.exports =SequelizeSubCategoriesRepository;
