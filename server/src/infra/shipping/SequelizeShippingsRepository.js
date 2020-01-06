const ShippingMapper = require("./SequelizeShippingMapper");

class SequelizeShippingsRepository {
  constructor({ CustomerModel }) {
    this.CustomerModel = CustomerModel;
  }

  async update(user, shippingData) {
    const shippings = await this.CustomerModel.options.classMethods.updateShipping(user, shippingData);
    shippingData.customerId = user.customer_id
    return shippingData;
  }

  async getShipping(user) {
    const shippings = await this.CustomerModel.options.classMethods.getShipping(user);
    return shippings;
  }
}

module.exports = SequelizeShippingsRepository;
