const Operation = require('src/app/Operation');
class State extends Operation {
  constructor({  stateRepository }) {
    super();
    this. stateRepository =  stateRepository;
  }

  async execute(orderData) {
    const { SUCCESS, ERROR, UNAUTHORIZED } = this.outputs;

    try {
      // this.isAuthorized(user);
      const order = await this.stateRepository.getAllState(orderData);
      this.emit(SUCCESS, order);
    } catch(error) {
      if(error.message === 'UnauthorizedError') {
        this.emit(UNAUTHORIZED, "User not authorized for this action");
      }
      this.emit(ERROR, error);
    }
  }
}
State.setOutputs(['SUCCESS', 'ERROR', 'UNAUTHORIZED']);

module.exports = State;
