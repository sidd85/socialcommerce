const Operation = require("src/app/Operation");

class GetAllProductsByCategoryAndCommunity extends Operation {
  constructor({ productsRepository }) {
    super();
    this.productsRepository = productsRepository;
  }

  async execute(category = 1, community = 1, page = 1, limit = 10) {
    const { SUCCESS, ERROR } = this.outputs;
    try {
      const products = await this.productsRepository.getAllByCategoryAndCommunity({
        page: page,
        limit: limit,
        offset: (page - 1) * limit,
        community: community,
        category: category
      });
      this.emit(SUCCESS, products);
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllProductsByCategoryAndCommunity.setOutputs(["SUCCESS", "ERROR"]);

module.exports = GetAllProductsByCategoryAndCommunity;
