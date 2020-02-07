const Customer = require('src/domain/customer/Customer');

const SequelizeCustomerMapper = {
  toEntity({ dataValues }) {
    const { customer_id, name, email, password, mob_phone } = dataValues;
    return new Customer({ customer_id, name, email, password, mob_phone });
  },

  toDatabase(survivor) {
    const { name, email, password, mob_phone } = survivor;
    return { name, email, password, mob_phone };
  }
};

module.exports = SequelizeCustomerMapper;
