const { attributes } = require('structure');

const OrderDetail = attributes({
    item_id:Number,
    order_id:Number,
    product_id:Number,
    product_name:String,
    quantity:Number,
    unit_cost:Number 
})(class  OrderDetail {
});

module.exports = OrderDetail;
