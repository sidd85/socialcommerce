module.exports = function(sequelize, DataTypes) {
    const State= sequelize.define(
        'State', {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true, 
        autoIncrement: true
      },
      name: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      country_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      }
    }, {
      classMethods: { 
        getAllState: function( orderData) { 
            console.log(orderData,"##############")
          const state = sequelize.query(
            "SELECT * FROM states", { 
            //   replacements: {
            //     id: orderData.order_id              
            //   },
              type: sequelize.QueryTypes.SELECT} 
          );       
          return state;
        }       
      },
      tableName: 'State',
      timestamps: false    
    });
    return State;
  };
  
  

