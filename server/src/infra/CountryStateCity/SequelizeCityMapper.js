// const OrederDetail = require("src/domain/orderDetail/OrderDetail");

// const SequelizeOrderDetailMapper = {
//   toEntity(dataValues) {
//     const { item_id,order_id,product_id,product_name,quantity,unit_cost } = dataValues;
//     return new OrederDetail({ item_id,order_id,product_id,product_name,quantity,unit_cost});
//   },

//   toDatabase(survivor) {
//     const { item_id,order_id,product_id,product_name,quantity,unit_cost } = survivor;

//     return { item_id,order_id,product_id,product_name,quantity,unit_cost};
//   }
// };

// module.exports = SequelizeOrderDetailMapper;
// ------
const Orders = require("src/domain/orderDetail/OrderDetail");

const SequelizeOrderDetailMapper = {
  toEntity({ dataValues }) {
    const {
        id,
        name,
        state_id
    } = dataValues;
    return new Orders({
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

module.exports =SequelizeOrderDetailMapper;
