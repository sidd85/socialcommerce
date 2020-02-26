
//  const StateMapper = require("./SequelizeStateMapper");
// const State = require('src/domain/CountryStateCity/State');

 const StateMapper = require("./SequelizeStateMapper");
const State = require('src/domain/CountryStateCity/State');

class SequelizeStateRepository {
  constructor({ StateModel }) {
    this.StateModel = this.StateModel;
  }  
  async getAllState( orderData) {

    // console.log(orderData,this.StateModel,"########")

    console.log(orderData)

    const state = await this.StateModel.options.classMethods.getAllState(orderData);  
    return state;
  } 
}
module.exports = SequelizeStateRepository;
