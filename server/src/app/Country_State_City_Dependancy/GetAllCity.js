const Operation = require('src/app/Operation');
class City extends Operation {
  constructor({  cityRepository }) {
    super();
    this. cityRepository =  cityRepository;
  }

  async execute(orderData) {
    const { SUCCESS, ERROR, UNAUTHORIZED } = this.outputs;

    try {
      // this.isAuthorized(user);
      const order = await this.cityRepository.getAllCity(orderData);
      this.emit(SUCCESS, order);
    } catch(error) {
      if(error.message === 'UnauthorizedError') {
        this.emit(UNAUTHORIZED, "User not authorized for this action");
      }
      this.emit(ERROR, error);
    }
  }
}
City.setOutputs(['SUCCESS', 'ERROR', 'UNAUTHORIZED']);

module.exports = City;
