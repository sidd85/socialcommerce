const Operation = require('src/app/Operation');
const Customer = require('src/domain/banner/Banner');
const util = require('util')

class PostBanner extends Operation {
  constructor({ bannerRepository }) {
    super();
    this.bannerRepository = bannerRepository;
  }

  async execute(customerData) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    const customer = new Customer(customerData);

    try {
      const newCustomer = await this.bannerRepository.PostBanner(customer);
      this.emit(SUCCESS, newCustomer);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      this.emit(ERROR, error);
    }
  }
}

PostBanner.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports = PostBanner;