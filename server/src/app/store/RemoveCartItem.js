const Operation = require('src/app/Operation');

class RemoveCartItem extends Operation {
  constructor({ cartsRepository }) {
    super();
    this.cartsRepository = cartsRepository;
  }

  async execute(user, cartData) {
    const { SUCCESS, ERROR, UNAUTHORIZED } = this.outputs;
    try {
      const cart = await this.cartsRepository.removeCartItem(user, cartData);
      this.emit(SUCCESS, cart);
    } catch(error) {
      if(error.message === 'UnauthorizedError') {
        this.emit(UNAUTHORIZED, "User not authorized for this action");
      }
      this.emit(ERROR, error);
    }
  }
}

RemoveCartItem.setOutputs(['SUCCESS', 'ERROR', 'UNAUTHORIZED']);

module.exports = RemoveCartItem;
