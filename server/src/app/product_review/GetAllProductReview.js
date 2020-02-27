
// const Operation = require('src/app/Operation');

// class GetAllProductReview extends Operation {
//   constructor({ postProductReviewRepository }) {
//     super();
//     this.postProductReviewRepository = postProductReviewRepository;
//   }

//   async execute(page = 1, limit = 10) {
//     const { SUCCESS, ERROR } = this.outputs;
//     try {
//       const callinfo = await this.postProductReviewRepository.getAllProductReview({
//         attributes: ['review_id','customer_id','product_id','review','rating','created_on'],
//         limit: limit,
//         offset: (page-1)*limit
//       });
//       this.emit(SUCCESS, callinfo);
//     } catch(error) {
//       this.emit(ERROR, error);
//     }
//   }
// }

// GetAllProductReview.setOutputs(['SUCCESS', 'ERROR']);

// module.exports = GetAllProductReview;

const Operation = require('src/app/Operation');
class GetAllProductReview extends Operation {
  constructor({ postProductReviewRepository }) {
    super();
    this.postProductReviewRepository =  postProductReviewRepository;
  }
  async execute(Data) {
    const { SUCCESS, ERROR, UNAUTHORIZED } = this.outputs;

    try {
      // this.isAuthorized(user);
      const data = await this.postProductReviewRepository.getAllProductReview(Data);
      this.emit(SUCCESS, data );
    } catch(error) {
      if(error.message === 'UnauthorizedError') {
        this.emit(UNAUTHORIZED, "User not authorized for this action");
      }
      this.emit(ERROR, error);
    }
  }
}
GetAllProductReview.setOutputs(['SUCCESS', 'ERROR', 'UNAUTHORIZED']);

module.exports = GetAllProductReview;
////////////////////////////////////