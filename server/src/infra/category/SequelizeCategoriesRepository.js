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

  async getCategory( Data) {
  
    const data = await this.CategoryModel.options.classMethods.getCategory(Data);  
    return data;
    //   if(order.length==1){
    //   return {success:true,message:"successfully update data",value:1};
    // }else{
    //   return {success:false,message:"successfully update data",value:0};
    // }
    
  }

  async getSubCategory( Data) {
  
    const data = await this.CategoryModel.options.classMethods.getSubCategory(Data);  
    return data;
    //   if(order.length==1){
    //   return {success:true,message:"successfully update data",value:1};
    // }else{
    //   return {success:false,message:"successfully update data",value:0};
    // }
    
  }
  getSubCategory

}

module.exports = SequelizeCategoriesRepository;
