module.exports = function(sequelize, DataTypes) {
    const City = sequelize.define(
      "City",
      {
        id: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        state_id: {
            type: DataTypes.TEXT,
            allowNull: false
          },
      },
      {
        classMethods: {       
          getAllCity: function(searchText) {
              console.log(searchText)
            const count = sequelize.query(            
              "SELECT  * FROM cities", { type: sequelize.QueryTypes.SELECT}           
            );         
            return count;
          }
        },
        tableName: "City",
        timestamps: false
      }
    );
    return City;
  };
  


  
  
  