const City = require("src/domain/CountryStateCity/City");

const SequelizeCityMapper = {
  toEntity({ dataValues }) {
    const {
        id,
        name,
        state_id
    } = dataValues;
    return new City({
        id,
        name,
        state_id
    });
  },

  toDatabase(survivor) {
    const { 
       id,
       name,
       state_id
       } = survivor;

    return { 
        id,
        name,
        state_id
    };
  }
};

module.exports =SequelizeCityMapper;
