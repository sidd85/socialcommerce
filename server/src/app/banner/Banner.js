const Operation = require('src/app/Operation');
const Banners = require('src/domain/banner/banner');
const util = require('util')

class Banner extends Operation {
  constructor({ bannerRepository }) {
    super();
    this.bannerRepository = bannerRepository;
  }

  async execute(BannerData) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    const bannerData = new Banners(BannerData);

    try {
        // bannerData        
      const newBanner = await this.bannerRepository.add(bannerData);
      this.emit(SUCCESS, newBanner);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      this.emit(ERROR, error);
    }
  }
}

Banner.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports = Banner;