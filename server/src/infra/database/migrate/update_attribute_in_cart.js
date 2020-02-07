'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.changeColumn(
        'shopping_cart',
        'attributes',
        {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.changeColumn('shopping_cart', 'attributes', {
        type: Sequelize.TEXT,
        allowNull: false,
      },{ transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};