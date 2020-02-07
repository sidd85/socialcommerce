/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Banner = sequelize.define(
      "banner",
      {
        banner_id: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        banner_type: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        banner_path: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        banner_product_id: {
          type: DataTypes.INTEGER(11),
          allowNull: false
        }
      },
      {
        classMethods: {
          getAll: function(
            page,
            limit,
            offset
          ) {
            const banners = sequelize.query(
              "SELECT * FROM `banners`", { type: sequelize.QueryTypes.SELECT}
            );
            
            return banners;
          },
          getAllCommunitiesByText: function(searchText, page, limit, offset) {
            // const banners = sequelize.query(
            //   "SELECT * FROM `banners` where LOWER(CONCAT(banner_path)) LIKE :inSearchString LIMIT :inOffset,:inLimit;",
            //   {
            //     replacements: {
            //       inSearchString: '%' + searchText + '%',
            //       inLimit: limit,
            //       inOffset: offset
            //     },
            //     type: sequelize.QueryTypes.SELECT
            //   }
            // );
            // return banners;
          },
          getAllCommunitiesCountByText: function(searchText) {
            const count = sequelize.query(
              "SELECT count(*) FROM `community` where LOWER(CONCAT(community_name, '', community_address)) LIKE :inSearchString;",
              {
                replacements: {
                  inSearchString: '%' + searchText + '%'
                },
                type: sequelize.QueryTypes.RAW
              }
            );
            return count;
          },
          PostBanner: function(dbData) {
            const bannerPost = sequelize.query(
              "INSERT INTO banners (banner_type,banner_path,banner_product_id) VALUES(dbData.banner_type,dbData.banner_path,dbData.banner_product_id)",
              {
                // replacements: {
                //   inSearchString: '%' + searchText + '%'
                // },
                // type: sequelize.QueryTypes.RAW
              }
            );
            return bannerPost;
          }
        },
        tableName: "banner",
        timestamps: false
      }
    );
  
    return Banner;
  };