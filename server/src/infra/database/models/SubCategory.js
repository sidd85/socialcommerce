/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const SubCategory = sequelize.define(
      "sub_category",
      {
        sub_category_id: {
          type: DataTypes.INTEGER(10),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        category_id: {
          type: DataTypes.INTEGER(10),
          allowNull: false
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false
        },
        description: {
          type: DataTypes.STRING(255),
          allowNull: true
        }
      },
      {
        classMethods: {
            getSubCategory: function(orderData) {    
                const getOrder = sequelize.query(
                "SELECT  * FROM  sub_category  WHERE  category_id=:id", { 
              replacements: {
                          id: orderData.categoryId             
              },
                    type: sequelize.QueryTypes.SELECT} 
                );       
                return getOrder;
              }
        },
        tableName: "sub_category",
        timestamps: false
      },
    );
  
    return SubCategory;
  };
  


// "SELECT  * FROM  sub_category", { 
//   // replacements: {
//   //   id: orderData.categoryId             
//   // },