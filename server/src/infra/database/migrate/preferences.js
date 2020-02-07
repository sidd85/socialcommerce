'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('preferences', {
      customer_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      community_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
      },
      language_code: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: function(queryInterface) {
    return queryInterface.dropTable('preferences');
  }
};
