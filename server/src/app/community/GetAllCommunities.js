
const Operation = require('src/app/Operation');

class GetAllCommunities extends Operation {
  constructor({ communitiesRepository }) {
    super();
    this.communitiesRepository = communitiesRepository;
  }

  async execute(page = 1, limit = 10) {
    const { SUCCESS, ERROR } = this.outputs;
    try {
      const categories = await this.communitiesRepository.getAll({
        attributes: ['community_id', 'community_name', 'community_address', 'agent_id', 'agent_designation'],
        limit: limit,
        offset: (page-1)*limit
      });
      this.emit(SUCCESS, categories);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllCommunities.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllCommunities;
