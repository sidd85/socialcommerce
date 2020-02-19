 const Operation = require('src/app/Operation');
class Orderlist extends Operation {
  constructor({  ordersRepository }) {
    super();
    this. ordersRepository =  ordersRepository;
  }

  async execute(orderData) {
    const { SUCCESS, ERROR, UNAUTHORIZED } = this.outputs;

    try {
      // this.isAuthorized(user);
      const order = await this.ordersRepository.getAllOrderlist(orderData);
      this.emit(SUCCESS, order);
    } catch(error) {
      if(error.message === 'UnauthorizedError') {
        this.emit(UNAUTHORIZED, "User not authorized for this action");
      }
      this.emit(ERROR, error);
    }
  }
}
Orderlist.setOutputs(['SUCCESS', 'ERROR', 'UNAUTHORIZED']);

module.exports = Orderlist;
