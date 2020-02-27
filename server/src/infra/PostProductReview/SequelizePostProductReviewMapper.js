const country = require("src/domain/callInfo/Callinfo");

const SequelizePostProductReviewMapper = {
  toEntity({ dataValues }) {
    const {review_id,customer_id,product_id,review,rating,created_on} = dataValues;
    return new country({review_id,customer_id,product_id,review,rating,created_on});
  },
  
  toDatabase(survivor) {
    const {review_id,customer_id,product_id,review,rating,created_on} = survivor;

    return {review_id,customer_id,product_id,review,rating,created_on};
  }
};
 
module.exports = SequelizePostProductReviewMapper;
