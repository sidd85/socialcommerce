/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const orderDetail= sequelize.define('order_detail', {
    item_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    product_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    unit_cost: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    classMethods: { 
      getAllOrderDetail: function( orderData) { 
        const getOrder = sequelize.query(
          "SELECT  order_detail.* FROM `order_detail` WHERE  order_id=:id", { 
            replacements: {
              id: orderData.order_id              
            },
            type: sequelize.QueryTypes.SELECT} 
        );       
        return getOrder;
      }     
    },
    tableName: 'order_detail',
    timestamps: false    
  });
  return  orderDetail;
};


