const Operation = require('src/app/Operation');
class PostProductReview extends Operation {
  constructor({ postProductReviewRepository }) {
    super();
    this.postProductReviewRepository =  postProductReviewRepository;
  }
  async execute(Data) {
    const { SUCCESS, ERROR, UNAUTHORIZED } = this.outputs;

    try {
      // this.isAuthorized(user);
      const data = await this.postProductReviewRepository.postProductReview(Data);
      this.emit(SUCCESS, data );
    } catch(error) {
      if(error.message === 'UnauthorizedError') {
        this.emit(UNAUTHORIZED, "User not authorized for this action");
      }
      this.emit(ERROR, error);
    }
  }
}
PostProductReview.setOutputs(['SUCCESS', 'ERROR', 'UNAUTHORIZED']);

module.exports = PostProductReview;
