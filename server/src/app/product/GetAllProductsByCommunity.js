const Operation = require("src/app/Operation");

class GetAllProductsByCommunity extends Operation {
  constructor({ productsRepository }) {
    super();
    this.productsRepository = productsRepository;
  }

  async execute(community = 1, page = 1, limit = 10) {
    const { SUCCESS, ERROR } = this.outputs;
    try {
      const products = await this.productsRepository.getAllByCommunity({
        page: page,
        limit: limit,
        offset: (page - 1) * limit,
        community: community
      });
      this.emit(SUCCESS, products);
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllProductsByCommunity.setOutputs(["SUCCESS", "ERROR"]);

module.exports = GetAllProductsByCommunity;
