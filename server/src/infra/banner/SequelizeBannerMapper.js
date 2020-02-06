const banner = require("src/domain/banner/Banner");

const SequelizeBannerMapper = {
  toEntity({ dataValues }) {
    const {banner_id,banner_type,banner_path,banner_product_id} = dataValues;
    return new Banner({banner_id,banner_type,banner_path,banner_product_id});
  },
  
  toDatabase(survivor) {
    const {banner_id,banner_type,banner_path,banner_product_id } = survivor;

    return {banner_id,banner_type,banner_path,banner_product_id};
  }
};

module.exports = SequelizeBannerMapper;
