'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const testCommunity = [];

    //for(let i = 0; i < 20; i++) {
    testCommunity.push({
      community_id: 2,
      community_name: 'Purva Sky Woods',
      community_address: 'lorem ipsum',
      agent_id: 44,
      agent_designation: 'Vice president'
    });
    //}

    return queryInterface.bulkInsert('community', testCommunity, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('community', null, {});
  }
};
