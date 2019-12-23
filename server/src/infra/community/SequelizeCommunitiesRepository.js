const CommunityMapper = require("./SequelizeCommunityMapper");

class SequelizeCommunitiesRepository {
  constructor({ CommunityModel }) {
    this.CommunityModel = CommunityModel;
  }

  async getAll(...args) {
    const communities = await this.CommunityModel.options.classMethods.getAll(
      args[0].page,
      args[0].limit,
      args[0].offset
    );
    let rows = JSON.parse(JSON.stringify(communities));
    communities.rows = rows;
    communities.count = rows.length;
    return communities;
  }
}

module.exports = SequelizeCommunitiesRepository;
