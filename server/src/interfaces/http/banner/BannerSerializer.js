const BannerSerializer = {
    serialize({ banner_id,banner_type,banner_path,banner_product_id,banner_path1,banner_path2 }) {
      return {    
        bannerId: banner_id,   
        bannerType: banner_type,
        bannerPath: banner_path,
        banner_path1:banner_path1,
        banner_path2:banner_path2,
        bannerProductId: banner_product_id,
        
      };
    }
  };
  
  module.exports = BannerSerializer;

  