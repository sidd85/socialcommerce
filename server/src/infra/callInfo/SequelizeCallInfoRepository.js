const CallinfoMapper = require("./SequelizeCallInfoMapper");
const Customer = require('src/domain/callInfo/Callinfo');

class SequelizeCallinfoRepository {
  constructor({ CallinfoModel }) {
    this.CallinfoModel = CallinfoModel;
  }
  
  async getAll(...args) {
    const callInfo = await this.CallinfoModel.options.classMethods.getAll(
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

module.exports = SequelizeCallinfoRepository;