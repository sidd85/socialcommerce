const { attributes } = require('structure');

const ShoppingCart = attributes({
  item_id: {
    type: Number
  },
  cart_id: {
    type: String
  },
  product_id: {
    type: Number
  },
  quantity: {
    type: Number
  },
  buy_now: {
    type: Number
  },
  added_on: {
    type: String
  },
  customer_id: {
    type: Number
  },
  active: {
    type: Boolean
  }
})(class ShoppingCart {
});

module.exports = ShoppingCart;
