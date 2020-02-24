const CityMapper = require("./SequelizeCityMapper");

class SequelizeCityRepository {
  constructor({ CityModel }) {
    this.CityModel = this.CityModel;
  }  
  async getAllCity( orderData) {
      console.log(orderData,"@@@@@@@@@@@@@@@")
    const order = await this.CityModel.options.classMethods.getAllCity(orderData);  
    return order;
  }
}

module.exports = SequelizeCityRepository;
 