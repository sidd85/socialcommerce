/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Preferences = sequelize.define(
    "community",
    {
      customer_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true
      },
      community_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      language_code: {
        type: DataTypes.TEXT,
        allowNull: true,
      }
    },
    {
      classMethods: {
        get: function (dbUser) {
          const preferences = sequelize.query(
            "SELECT p.*, c.community_name FROM preferences p INNER JOIN community c on c.community_id = p.community_id where p.customer_id = :inCustomerId;",
            {
              replacements: {
                inCustomerId: dbUser.customer_id
              },
              type: sequelize.QueryTypes.SELECT
            }
          );
          return preferences;
        },
        upsert: function (dbUser,
                          {community_id,
                          language_code}) {
          const preferences = sequelize.query(
            "CALL upsert_customer_preferences(:inCustomerId, :inCommunityId, :inLanguageCode);",
            {
              replacements: {
                inCustomerId: dbUser.customer_id,
                inCommunityId: community_id,
                inLanguageCode: language_code || null
              },
              type: sequelize.QueryTypes.RAW
            }
          );
          return preferences;
        }
      },
      tableName: "preferences",
      timestamps: false
    }
  );

  return Preferences;
};
