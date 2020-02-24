const State = require("src/domain/CountryStateCity/State");

const SequelizeStateMapper = {
  toEntity({ dataValues }) {
    const {
        id,
        name,
        state_id
    } = dataValues;
    return new State({
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

module.exports =SequelizeStateMapper;
