'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('product_community', {
      product_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true
      },
      community_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true
      }
    });
  },
  down: function(queryInterface) {
    return queryInterface.dropTable('product_community');
  }
};
