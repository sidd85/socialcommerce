const banner = require("src/domain/banner/Banner");

const SequelizeBannerMapper = {
  toEntity({ dataValues }) {
    const {banner_id,banner_type,banner_path,banner_product_id,banner_path1,banner_path2} = dataValues;
    return new Banner({banner_id,banner_type,banner_path,banner_product_id,banner_path1,banner_path2});
  },
  
  toDatabase(survivor) {
    const {banner_id,banner_type,banner_path,banner_product_id,banner_path1,banner_path2} = survivor;

    return {banner_id,banner_type,banner_path,banner_product_id,banner_path1,banner_path2};
  }
};

module.exports = SequelizeBannerMapper;
 