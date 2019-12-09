'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('customer_group', {
      product_group_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      customer_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      parent_customer_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('incomplete', 'complete', 'expired'),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface) {
    return queryInterface.dropTable('customer_group');
  }
};
