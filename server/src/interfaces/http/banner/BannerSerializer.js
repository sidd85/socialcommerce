const BannerSerializer = {
    serialize({ banner_id,banner_type,banner_path,banner_product_id }) {
      return {    
        bannerId: banner_id,   
        bannerType: banner_type,
        bannerPath: banner_path,
        bannerProductId: banner_product_id,
        banner_path1:banner_path1,
        banner_path2:banner_path2
      };
    }
  };
  
  module.exports = BannerSerializer;

  