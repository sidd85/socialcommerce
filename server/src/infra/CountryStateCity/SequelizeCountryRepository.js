const CallinfoMapper = require("./SequelizeCountryMapper");
const Customer = require('src/domain/CountryStateCity/Country');

class SequelizeCountryRepository {
  constructor({ CountryModel }) {
    this.CountryModel = CountryModel;
  }
  
  async getAllCountry(...args) {
    const callInfo = await this.CountryModel.options.classMethods.getAllCountry(
      args[0].page,
      args[0].limit,
      args[0].offset
    );
    let rows = JSON.parse(JSON.stringify(callInfo));
    callInfo.rows = rows;
    callInfo.count = rows.length;
    return callInfo;
  }  
}

module.exports = SequelizeCountryRepository;