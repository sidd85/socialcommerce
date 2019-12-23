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
        }
      },
      tableName: "community",
      timestamps: false
    }
  );

  return Community;
};
