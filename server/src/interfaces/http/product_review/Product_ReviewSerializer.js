const SubCategorySerializer = {
    serialize({ review_id,customer_id,product_id,review,rating,created_on}) {
      let categoryId = category_id;
      return {
        review_id,customer_id,product_id,review,rating,created_on              
      };
    }
  };
  module.exports = SubCategorySerializer;