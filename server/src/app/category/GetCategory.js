const Operation = require('src/app/Operation');
class CategoryDetail extends Operation {
  constructor({ categoriesRepository }) {
    super();
    this. categoriesRepository =  categoriesRepository;
  }

  async execute(orderData) {
    const { SUCCESS, ERROR, UNAUTHORIZED } = this.outputs;

    try {
      // this.isAuthorized(user);
      const order = await this.categoriesRepository.getCategory(orderData);
      this.emit(SUCCESS, order);
    } catch(error) {
      if(error.message === 'UnauthorizedError') {
        this.emit(UNAUTHORIZED, "User not authorized for this action");
      }
      this.emit(ERROR, error);
    }
  }
}
CategoryDetail.setOutputs(['SUCCESS', 'ERROR', 'UNAUTHORIZED']);

module.exports = CategoryDetail;
