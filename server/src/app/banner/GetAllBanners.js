
const Operation = require('src/app/Operation');

class GetAllBanners extends Operation {
  constructor({ bannerRepository }) {
    super();
    this.bannerRepository = bannerRepository;
  }

  async execute(page = 1, limit = 10) {
    const { SUCCESS, ERROR } = this.outputs;
    try {
      const banners = await this.bannerRepository.getAll({
        attributes: ['banner_id', 'banner_type', 'banner_path', 'banner_product_id'],
        limit: limit,
        offset: (page-1)*limit
      });
      this.emit(SUCCESS, banners);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllBanners.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllBanners;
