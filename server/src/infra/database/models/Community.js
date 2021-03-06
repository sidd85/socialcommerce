/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Community = sequelize.define(
    "community",
    {
      community_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      community_name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      community_address: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      agent_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      agent_designation: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      classMethods: {
        getAll: function(
          page,
          limit,
          offset
        ) {
          const communities = sequelize.query(
            "SELECT * FROM `community`", { type: sequelize.QueryTypes.SELECT}
          );
          return communities;
        },
        getAllCommunitiesByText: function(searchText, page, limit, offset) {
          const communities = sequelize.query(
            "SELECT * FROM `community` where LOWER(CONCAT(community_name, '', community_address)) LIKE :inSearchString LIMIT :inOffset,:inLimit;",
            {
              replacements: {
                inSearchString: '%' + searchText + '%',
                inLimit: limit,
                inOffset: offset
              },
              type: sequelize.QueryTypes.SELECT
            }
          );
          return communities;
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
        getAllAgentName: function(searchText) {
          const count = sequelize.query(            
            "SELECT community.*, customer.name FROM community JOIN customer ON community.agent_id=customer.customer_id", { type: sequelize.QueryTypes.SELECT}           
          );         
          return count;
        },
        getOrderDetail: function(searchText) {
          const count = sequelize.query(            
            "SELECT  order_detail.* FROM community JOIN order_detail ON community.community_id=order_detail.community_id", { type: sequelize.QueryTypes.SELECT}           
          );         
          return count;
        },
        communityDetail: function(orderData) { 
            console.log(orderData)
          const getOrder = sequelize.query(
            "SELECT  * FROM  community  WHERE  agent_id=:id", { 
              replacements: {
                id: orderData.value              
              },
              type: sequelize.QueryTypes.SELECT} 
          );       
          return getOrder;
        }
      },
      tableName: "community",
      timestamps: false
    }
  );

  return Community;
};
