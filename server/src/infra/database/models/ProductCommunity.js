/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const ProductCommunity = sequelize.define('product_community', {
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    community_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'product_community',
    timestamps: false
  });
  return ProductCommunity;
};
