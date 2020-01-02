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

  async getAllByText(...args) {
    let offset = (args[0].page - 1) * args[0].limit;
    const communities = await this.CommunityModel.options.classMethods.getAllCommunitiesByText(
      args[0].searchText,
      args[0].page,
      args[0].limit,
      offset
    );
    let rows = JSON.parse(JSON.stringify(communities));
    communities.rows = rows;
    const communityCount = await this.CommunityModel.options.classMethods.getAllCommunitiesCountByText(
      args[0].searchText
    );
    communities.count = (JSON.parse(JSON.stringify(communityCount))[0]['count(*)']);
    return communities;
  }
}

module.exports = SequelizeCommunitiesRepository;
