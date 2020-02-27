  const Product_ReviewSerializer = {
    serialize({review_id,customer_id,product_id,review,rating,created_on}) {
       
      return {
        "review_id":review_id,
        "customer_id":customer_id,
        "product_id":product_id,
        "review":review,
        "rating":rating,
        "created_on":created_on     
      };
    }
  };
  
  module.exports = Product_ReviewSerializer;