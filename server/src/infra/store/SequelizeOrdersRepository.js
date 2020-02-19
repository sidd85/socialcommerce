const OrderMapper = require("./SequelizeOrderMapper");

class SequelizeOrdersRepository {
  constructor({ OrdersModel, EmailHandler }) {
    this.OrdersModel = OrdersModel;
    this.EmailHandler = EmailHandler;
  }

  async placeOrder(user, orderData) {
    const order = await this.OrdersModel.options.classMethods.placeOrder(user, orderData);
    orderData.customerId = user.customer_id
    orderData.orderId = order[0].orderId;
    this.EmailHandler.sendEmail(user, orderData.orderId);
    return orderData;
  }

  async retrieveOrder(user, orderData) {
    const orders = await this.OrdersModel.options.classMethods.retrieveOrder(user, orderData);
    return orders;
  }

  async updateOrder(user, orderData) {
    const order = await this.OrdersModel.options.classMethods.updateOrder(user, orderData);
    orderData.customerId = user.customer_id
    return orderData;
  }

  async getOrder(user, orderData) {
    const order = await this.OrdersModel.options.classMethods.getOrder(user, orderData);
    return order;
  }

  async getAllOrderlist( orderData) {
    const order = await this.OrdersModel.options.classMethods.getAllOrderlist(orderData);  
    return order;
  }
}

module.exports = SequelizeOrdersRepository;
