const OrderDetailMapper = require("./SequelizeOrderlistMapper");

class SequelizeOrderlistRepository {
  constructor({ OrdersModel }) {
    this.OrdersModel = this.OrdersModel;
  }  
  async getAllOrderlist( orderData) {
    const order = await this.OrdersModel.options.classMethods.getAllOrderlist(orderData);  
    return order;
  }
}

module.exports = SequelizeOrderlistRepository;
 