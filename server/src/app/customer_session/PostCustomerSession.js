const Operation = require('src/app/Operation');
class PostProductReview extends Operation {
  constructor({ customerSessionRepository }) {
    super();
    this.customerSessionRepository =  customerSessionRepository;
  }
  async execute(Data) {
    const { SUCCESS, ERROR, UNAUTHORIZED } = this.outputs;

    try {
      // this.isAuthorized(user);
      console.log(Data,"$$$$$$$$$$$$$$$$")
      const data = await this.customerSessionRepository.postCustomerSession(Data);
      console.log(data,"^^^^^^^^^^^^^^^^^^^^^^^^^^^")
      this.emit(SUCCESS,data);
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
