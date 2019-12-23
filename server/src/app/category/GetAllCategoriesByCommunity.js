
const Operation = require('src/app/Operation');

class GetAllCategoriesByCommunity extends Operation {
  constructor({ categoriesRepository }) {
    super();
    this.categoriesRepository = categoriesRepository;
  }

  async execute(community, page = 1, limit = 10) {
    const { SUCCESS, ERROR } = this.outputs;
    try {
      const categories = await this.categoriesRepository.getAllByCommunity({
        attributes: ['category_id', 'name', 'description', 'community_id'],
        limit: limit,
        offset: (page-1)*limit,
        community: community
      });
      this.emit(SUCCESS, categories);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllCategoriesByCommunity.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllCategoriesByCommunity;
