// const OrderDetailMapper = require("./SequelizeOrderlistMapper");

class SequelizeCityRepository {
  constructor({ OrdersModel }) {
    this.OrdersModel = this.OrdersModel;
  }  
  async getAllCity( orderData) {
    const order = await this.CityModel.options.classMethods.getAllCity(orderData);  
    return order;
  }
}

module.exports = SequelizeCityRepository;
 