const Operation = require('src/app/Operation');
class SubCategoryDetail extends Operation {
  constructor({ categoriesRepository }) {
    super();
    this.categoriesRepository =  categoriesRepository;
  }

  async execute(orderData) {
    const { SUCCESS, ERROR, UNAUTHORIZED } = this.outputs;

    try {
      // this.isAuthorized(user);
      const order = await this.categoriesRepository.getSubCategory(orderData);
      this.emit(SUCCESS, order);
    } catch(error) {
      if(error.message === 'UnauthorizedError') {
        this.emit(UNAUTHORIZED, "User not authorized for this action");
      }
      this.emit(ERROR, error);
    }
  }
}
SubCategoryDetail.setOutputs(['SUCCESS', 'ERROR', 'UNAUTHORIZED']);

module.exports = SubCategoryDetail;
