const Community = require("src/domain/community/Community");

const SequelizeCommunityMapper = {
  toEntity({ dataValues }) {
    const { community_id, community_name, community_address, agent_id, agent_designation } = dataValues;
    return new Community({ community_id, community_name, community_address, agent_id, agent_designation });
  },

  toDatabase(survivor) {
    const { community_name, community_address, agent_id, agent_designation } = survivor;

    return { community_name, community_address, agent_id, agent_designation };
  }
};

module.exports = SequelizeCommunityMapper;