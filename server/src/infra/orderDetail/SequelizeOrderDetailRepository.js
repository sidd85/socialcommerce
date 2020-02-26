const OrderDetailMapper = require("./SequelizeOrderDetailMapper");

class SequelizeOrderDetailRepository {
  constructor({ OrderDetailModel }) {
    this.OrderDetailModel = OrderDetailModel;
  }  
  async getAllOrderDetail( orderData) {

    const order = await this.OrderDetailModel.options.classMethods.getAllOrderDetail(orderData);  
    return order;
  }
}

module.exports = SequelizeOrderDetailRepository;
