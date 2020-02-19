const Operation = require('src/app/Operation');
class EditUser extends Operation {
  constructor({  customersRepository }) {
    super();
    this. customersRepository =  customersRepository;
  }

  async execute(orderData) {
    const { SUCCESS, ERROR, UNAUTHORIZED } = this.outputs;

    try {
      // this.isAuthorized(user);
      
      const order = await this.customersRepository.editUser(orderData);
      this.emit(SUCCESS, order);
    } catch(error) {
      if(error.message === 'UnauthorizedError') {
        this.emit(UNAUTHORIZED, "User not authorized for this action");
      }
      this.emit(ERROR, error);
    }
  }
}
EditUser.setOutputs(['SUCCESS', 'ERROR', 'UNAUTHORIZED']);

module.exports = EditUser;
