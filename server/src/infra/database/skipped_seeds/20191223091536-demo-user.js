'use strict';
const bcrypt = require("bcrypt-nodejs");
module.exports = {
  up: (queryInterface, Sequelize) => {
    const testConsumer = [];

    //for(let i = 0; i < 20; i++) {
      testConsumer.push({
        name: 'Siddhartha Chandra',
        email: 'sid@socco.com',
        password: bcrypt.hashSync(
          'R00tr00t',
          bcrypt.genSaltSync(10),
          null
        )
      });
    //}

    return queryInterface.bulkInsert('customer', testConsumer, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('customer', null, {});
  }
};
