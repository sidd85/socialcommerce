const OrderDetailSerializer = {
    serialize({ item_id,order_id,product_id,product_name,quantity,unit_cost }) {
      return {    
        item_id:item_id,
        order_id:order_id,
        product_id:product_id,
        product_name:product_name,
        quantity:quantity,
        unit_cost:unit_cost
      };
    }
  };

  
  
  module.exports = OrderDetailSerializer;

  