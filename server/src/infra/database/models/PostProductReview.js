      /* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Review = sequelize.define(
      "review",
      {
        review_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          customer_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
          },
          product_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
          },
          review: {
            type: DataTypes.TEXT,
            allowNull: false
          },
          rating: {
            type: DataTypes.INTEGER(6),
            allowNull: false
          },
          created_on: {
            type: DataTypes.DATE,
            allowNull: false
          }

      },
      {
        classMethods: {
            postProductReview: function(orderData) {    
                console.log(orderData)
                const Reviews = sequelize.query(
                "INSERT INTO review (customer_id,product_id,review,rating)VALUES (:iscustomer_id,:isproduct_id,:isreview,:israting);", { 
              replacements: {
                iscustomer_id: orderData.customer_id,
                isproduct_id: orderData.product_id,
                isreview: orderData.review,
                israting: orderData.rating
              },
                    type: sequelize.QueryTypes.INSERT} 
                );     
                console.log(Reviews);  
                return Reviews;
              },
              // getAllProductReview: function(
              //   page,
              //   limit,
              //   offset
              // ) {
              //   const callInfo = sequelize.query(
              //     "SELECT * FROM review", { type: sequelize.QueryTypes.SELECT}
              //   );          
              //   return callInfo;
              // },
              getAllProductReview: function(orderData) {    
                console.log(orderData)
                const Reviews = sequelize.query(
                "SELECT * FROM review WHERE product_id=:isproduct_id;", { 
              replacements: {
                isproduct_id: orderData.product_id,              
              },
                    type: sequelize.QueryTypes.SELECT} 
                );     
                console.log(Reviews);  
                return Reviews;
              }
              
        },
        tableName: "review",
        timestamps: false
      },
    );
  
    return Review;
  };
