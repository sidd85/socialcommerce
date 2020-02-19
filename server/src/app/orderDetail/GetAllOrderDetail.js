const Operation = require('src/app/Operation');
class OrderDetail extends Operation {
  constructor({ OrderDetailRepository }) {
    super();
    this.OrderDetailRepository = OrderDetailRepository;
  }

  async execute(orderData) {
    const { SUCCESS, ERROR, UNAUTHORIZED } = this.outputs;

    try {
      // this.isAuthorized(user);
      const order = await this.OrderDetailRepository.getAllOrderDetail(orderData);
      this.emit(SUCCESS, order);
    } catch(error) {
      if(error.message === 'UnauthorizedError') {
        this.emit(UNAUTHORIZED, "User not authorized for this action");
      }
      this.emit(ERROR, error);
    }
  }
}
OrderDetail.setOutputs(['SUCCESS', 'ERROR', 'UNAUTHORIZED']);

module.exports = OrderDetail;
