/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const ShoppingCart = sequelize.define(
    "shopping_cart",
    {
      item_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      cart_id: {
        type: DataTypes.CHAR(32),
        allowNull: false
      },
      product_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      buy_now: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: "1"
      },
      added_on: {
        type: DataTypes.DATE,
        allowNull: false
      },
      customer_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      classMethods: {
        addToCart: function(dbUser, cartData) {
          const updated = sequelize.query(
            "CALL shopping_cart_add_product_v2 (:inProductId, :inCustomerId);",
            {
              replacements: {
                inProductId: cartData["productId"],
                inCustomerId: dbUser["customer_id"]
              },
              type: sequelize.QueryTypes.RAW
            }
          );
          return updated;
        },
        getCartItems: function(dbUser, cartData) {
          const items = sequelize.query(
            "CALL shopping_cart_get_products_v2 (:inCustomerId);",
            {
              replacements: {
                inCustomerId: dbUser["customer_id"],
              },
              type: sequelize.QueryTypes.RAW
            }
          );
          return items;
        },
        updateCartItem: function(dbUser, cartData) {
          const updated = sequelize.query(
            "CALL shopping_cart_update_product_quantity_v2 (:inProductId, :inQuantity, :inCustomerId);",
            {
              replacements: {
                inProductId: cartData["productId"],
                inQuantity: cartData["quantity"],
                inCustomerId: dbUser["customer_id"]
              },
              type: sequelize.QueryTypes.RAW
            }
          );
          return updated;
        },
        removeCartItems: function(dbUser, cartData) {
          const items = sequelize.query(
            "CALL shopping_cart_remove_product_v2 (:inProductId, :inCustomerId);",
            {
              replacements: {
                inProductId: cartData["productId"],
                inCustomerId: dbUser["customer_id"],
              },
              type: sequelize.QueryTypes.RAW
            }
          );
          return items;
        },

      },
      tableName: "shopping_cart",
      timestamps: false
    }

  );

  return ShoppingCart;
};
