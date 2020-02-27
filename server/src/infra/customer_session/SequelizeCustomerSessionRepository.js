
const CategoryMapper = require("./SequelizeCustomerSessionMapper");

class SequelizeCustomerSessionRepository {
  constructor({ CustomerSessionModel}) {
    this.CustomerSessionModel = CustomerSessionModel;
  }
  async postCustomerSession(Data) { 
    const data = await this.CustomerSessionModel.options.classMethods.postCustomerSession(Data);  
      console.log(data,"**********************************")
    return data;
  }
 
}
module.exports =SequelizeCustomerSessionRepository;
