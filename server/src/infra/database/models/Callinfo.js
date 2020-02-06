/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Callinfo = sequelize.define(
    "callInfo",
    {
      caller_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      mobile: {
        type: DataTypes.INTEGER(14),
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
          const callInfo = sequelize.query(
            "SELECT * FROM `call_info`", { type: sequelize.QueryTypes.SELECT}
          );          
          return callInfo;
        },        
      },
      tableName: "callInfo",
      timestamps: false
    }
  );

  return Callinfo;
};
