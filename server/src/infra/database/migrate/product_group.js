'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    const {DataTypes} = Sequelize;
    return queryInterface.createTable('product_group', {
      product_group_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER(11)
      },
      product_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      ttl: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      members_required_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE
      }
    });
  },
  down: function(queryInterface) {
    return queryInterface.dropTable('product_group');
  }
};
