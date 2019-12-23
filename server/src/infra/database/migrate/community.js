'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('community', {
      community_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      community_name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      community_address: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      agent_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      agent_designation: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface) {
    return queryInterface.dropTable('community');
  }
};
