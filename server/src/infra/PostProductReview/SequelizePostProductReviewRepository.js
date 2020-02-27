 const CategoryMapper = require("./SequelizePostProductReviewMapper");

class SequelizePostProductReviewRepository {
  constructor({ PostProductReviewModel}) {
    this.PostProductReviewModel = PostProductReviewModel;
  }
  async postProductReview( Data) { 
    const data = await this.PostProductReviewModel.options.classMethods.postProductReview(Data);  
    
    return{message:"successfully inserted review",success:true};
  }

  // async getAllProductReview(...args) {
  //   const callInfo = await this.PostProductReviewModel.options.classMethods.getAllProductReview(
  //     args[0].page,
  //     args[0].limit,
  //     args[0].offset
  //   );
  //   let rows = JSON.parse(JSON.stringify(callInfo));
  //   callInfo.rows = rows;
  //   callInfo.count = rows.length;
  //   console.log(callInfo);
  //   return callInfo;
  // }

  async getAllProductReview( Data) { 
    const data = await this.PostProductReviewModel.options.classMethods.getAllProductReview(Data);  
    return data;
  }
 
}
module.exports =SequelizePostProductReviewRepository;
