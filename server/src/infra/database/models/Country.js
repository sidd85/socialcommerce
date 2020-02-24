module.exports = function(sequelize, DataTypes) {
    const Country = sequelize.define(
      "Country",
      {
        id: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true       
        },
        sortname: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        phonecode: {
          type: DataTypes.INTEGER(11),
          allowNull: false
        }
      },
      {
        classMethods: {
          getAllCountry: function() {
            const country = sequelize.query(
              "SELECT * FROM countries ", { type: sequelize.QueryTypes.SELECT}
            );    
             
            return country;
          },        
        },
        tableName: "Country",
        timestamps: false
      }
    );
  
    return Country;
  };
