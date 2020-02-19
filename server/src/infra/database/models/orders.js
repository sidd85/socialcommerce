/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Orders = sequelize.define(
    "orders",
    {
      order_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      total_amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: "0.00"
      },
      created_on: {
        type: DataTypes.DATE,
        allowNull: false
      },
      shipped_on: {
        type: DataTypes.DATE,
        allowNull: true
      },
      status: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: "0"
      },
      comments: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      customer_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      community_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      auth_code: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      reference: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      shipping_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      tax_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      }
    },
    {
      classMethods: {
        getOrder: function(dbUser, orderData) {
          const categories = sequelize.query(
            "SELECT od.item_id, od.order_id, od.product_id, od.community_id, od.attributes, od.product_name, od.quantity, od.unit_cost, p.image, p.image_2, p.thumbnail, p.description FROM `order_detail` od INNER join product p on p.product_id = od.product_id LEFT JOIN `orders` o on o.order_id = od.order_id WHERE od.order_id = :inOrderId and o.customer_id = :inCustomerId",
            {
              replacements: {
                inOrderId: orderData["orderId"],
                inCustomerId: dbUser.customer_id,
              },
              type: sequelize.QueryTypes.SELECT
            }
          );
          return categories;
        },
        placeOrder: function(dbUser, orderData) {
          const updated = sequelize.query(
            "CALL shopping_cart_create_order_v2 (:inCartId, :inCustomerId, :inShippingId, :inTaxId);",
            {
              replacements: {
                inCartId: orderData["cartId"],
                inCustomerId: dbUser.customer_id,
                inShippingId: orderData["shippingId"] || null,
                inTaxId: orderData["taxId"] || null,
                inCommunityId: orderData["communityId"]
              },
              type: sequelize.QueryTypes.RAW
            }
          );
          return updated;
        },
        retrieveOrder: function (dbUser, orderData) {
          const orders = sequelize.query(
            "SELECT od.*, o.created_on, p.thumbnail, co.community_name, c.customer_id as agent_id, c.name as agent_name, c.mob_phone as agent_phone FROM order_detail od INNER JOIN orders o ON o.order_id = od.order_id LEFT JOIN community co on co.community_id = od.community_id LEFT JOIN customer c on c.customer_id = co.agent_id LEFT JOIN product p on p.product_id = od.product_id where o.customer_id = :inCustomerId ORDER BY o.created_on desc;",
            {
              replacements: {
                inCustomerId: dbUser.customer_id,
              },
              type: sequelize.QueryTypes.SELECT
            }
          );
          return orders;
        },
        updateOrder: function(dbUser, orderData) {
          const updated = sequelize.query(
            "CALL orders_update_order (:inOrderId, :inStatus, :inComments, :inAuthCode, :inReference);",
            {
              replacements: {
                inOrderId: orderData["orderId"],
                inStatus: orderData["status"],
                inComments: orderData["comments"],
                inAuthCode: orderData["authCode"],
                inReference: orderData["reference"]
              },
              type: sequelize.QueryTypes.RAW
            }
          );
          return updated;
        },
        getAllOrderlist: function(orderData) {
          console.log(orderData)
          const getOrder = sequelize.query(
            "SELECT  orders.* FROM customer JOIN orders ON customer.customer_id=orders.customer_id where orders.customer_id = :customer_id ",            
            {
              replacements: {
                customer_id: orderData.customer_id             
              },
              type: sequelize.QueryTypes.SELECT
            }
          );
          return getOrder;
        },
      },
      tableName: "orders",
      timestamps: false
    }
  );

  return Orders;
};
