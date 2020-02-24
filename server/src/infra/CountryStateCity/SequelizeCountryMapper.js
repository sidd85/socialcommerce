const country = require("src/domain/callInfo/Callinfo");

const SequelizeCountryMapper = {
  toEntity({ dataValues }) {
    const {id,sortname,name,phonecode} = dataValues;
    return new country({id,sortname,name,phonecode});
  },
  
  toDatabase(survivor) {
    const {id,sortname,name,phonecode} = survivor;

    return {id,sortname,name,phonecode};
  }
};
 
module.exports = SequelizeCountryMapper;
