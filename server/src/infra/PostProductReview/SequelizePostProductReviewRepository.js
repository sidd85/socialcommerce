const CategoryMapper = require("./SequelizePostProductReviewMapper");

class SequelizePostProductReviewRepository {
  constructor({ PostProductReviewModel}) {
    this.PostProductReviewModel = PostProductReviewModel;
  }
  async postProductReview( Data) { 
    const data = await this.PostProductReviewModel.options.classMethods.postProductReview(Data);  
    
    return data;
  }
}
module.exports =SequelizePostProductReviewRepository;
