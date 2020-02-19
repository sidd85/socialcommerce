const Orders = require("src/domain/store/Orders");
const SequelizeOrderlistMapper = {
  toEntity({ dataValues }) {
    const {
        order_id,
        total_amount,
        created_on,
        shipped_on,
        comments,
        customer_id,
        auth_code,
        reference,
        shipping_id,
        tax_id
    } = dataValues;
    return new Orders({
        order_id,
        total_amount,
        created_on,
        shipped_on,
        comments,
        customer_id,
        auth_code,
        reference,
        shipping_id,
        tax_id
    });
  },

  toDatabase(survivor) {
    const { 
        order_id,
        total_amount,
        created_on,
        shipped_on,
        comments,
        customer_id,
        auth_code,
        reference,
        shipping_id,
        tax_id
     } = survivor;

    return { 
        order_id,
        total_amount,
        created_on,
        shipped_on,
        comments,
        customer_id,
        auth_code,
        reference,
        shipping_id,
        tax_id
     };
  }
};

module.exports =SequelizeOrderlistMapper;
