const OrderDetailSerializer = {
    serialize({ item_id,order_id,product_id,product_name,quantity,unit_cost,name,created_on,total_amount}) {
      return {    
        item_id:item_id,        
        product_id:product_id,
        product_name:product_name,
        quantity:quantity,
        unit_cost:unit_cost,        
        name:name,
        order_id:order_id,
        created_on:created_on,
        total_amount:total_amount
      };
    }
  };

  
  
  module.exports = OrderDetailSerializer;

  