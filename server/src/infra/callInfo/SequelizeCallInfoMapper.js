const callInfo = require("src/domain/callInfo/Callinfo");

const SequelizeCallinfoMapper = {
  toEntity({ dataValues }) {
    const {caller_id,name,address,mobile} = dataValues;
    return new Callinfo({caller_id,name,address,mobile});
  },
  
  toDatabase(survivor) {
    const {caller_id,name,address,mobile} = survivor;

    return {caller_id,name,address,mobile};
  }
};

module.exports = SequelizeCallinfoMapper;