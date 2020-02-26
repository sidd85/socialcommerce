const CategoryMapper = require("./SequelizePostProductReviewMapper");

class SequelizePostProductReviewRepository {
  constructor({ PostProductReviewModel}) {
    this.PostProductReviewModel = PostProductReviewModel;
  }
  async postProductReview( Data) { 
    const data = await this.PostProductReviewModel.options.classMethods.postProductReview(Data);  
    
    return {message:"Successfully inserted review",success:true};
  }
}
module.exports =SequelizePostProductReviewRepository;
