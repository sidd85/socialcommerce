/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Category = sequelize.define(
    "category",
    {
      category_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      department_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(1000),
        allowNull: true
      }
    },
    {
      classMethods: {
        getAllCategories: function(
          page,
          limit,
          offset
        ) {
          const categories = sequelize.query(
            "SELECT category_id, name, description FROM category LIMIT :inOffset,:inLimit;;",
            {
              replacements: {
                inOffset: offset,
                inLimit: limit
              },
              type: sequelize.QueryTypes.SELECT
            }
          );
          return categories;
        },
        getAllCategoriesByDepartment: function(
          department,
          page,
          limit,
          offset
        ) {
          const categories = sequelize.query(
            "CALL catalog_get_department_categories(:inDepartmentId);",
            {
              replacements: {
                inDepartmentId: department
              },
              type: sequelize.QueryTypes.RAW
            }
          );
          return categories;
        },
        getAllCategoriesByCommunity: function (
          community,
          page,
          limit,
          offset
        ) {
          const categories = sequelize.query(
            `SELECT c.* FROM category c 
          INNER JOIN product_category pcat on pcat.category_id = c.category_id
          INNER JOIN product_community pcom on pcom.product_id = pcat.product_id
          where pcom.community_id = :inCommunityId;`,
            {
              replacements: {
                inCommunityId: community
              },
              type: sequelize.QueryTypes.SELECT
            }
          );
          return categories;
        }
      },
      tableName: "category",
      timestamps: false
    },
  );

  return Category;
};
