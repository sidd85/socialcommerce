
/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const states= sequelize.define('states', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    country_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
  }, {
    classMethods: { 
      getAllState: function( orderData) { 
        const getOrder = sequelize.query(
          "SELECT * FROM states", { 
            // replacements: {
            //   id: orderData.order_id              
            // },
            type: sequelize.QueryTypes.SELECT} 
        );       
        return getOrder;
      }     
    },
    tableName: 'states',
    timestamps: false    
  });
  return  states;
};














// ------------------------------------------
// /* jshint indent: 2 */
// module.exports = function(sequelize, DataTypes) {
//     const states= sequelize.define(
//         'states', {
//       id: {
//         type: DataTypes.INTEGER(11),
//         allowNull: false,
//         primaryKey: true, 
//         autoIncrement: true
//       },
//       name: {
//         type: DataTypes.STRING(100),
//         allowNull: false
//       },
//       country_id: {
//         type: DataTypes.INTEGER(11),
//         allowNull: false
//       }
//     }, {
//       classMethods: { 
//         getAllState: function( orderData) { 
//             console.log(orderData,"##############")
//           const state = sequelize.query(
//             "SELECT * FROM states", { 
//             //   replacements: {
//             //     id: orderData.order_id              
//             //   },
//               type: sequelize.QueryTypes.SELECT} 
//           );       
//           return state;
//         }       
//       },
//       tableName: 'states',
//       timestamps: false    
//     });
//     return states;
//   };

// module.exports = function(sequelize, DataTypes) {
//     const State= sequelize.define(
//         'State', {
//       id: {
//         type: DataTypes.INTEGER(11),
//         allowNull: false,
//         primaryKey: true, 
//         autoIncrement: true
//       },
//       name: {
//         type: DataTypes.INTEGER(11),
//         allowNull: false
//       },
//       country_id: {
//         type: DataTypes.INTEGER(11),
//         allowNull: false
//       }
//     }, {
//       classMethods: { 
//         getAllState: function( orderData) { 
//             console.log(orderData,"##############")
//           const state = sequelize.query(
//             "SELECT * FROM states", { 
//             //   replacements: {
//             //     id: orderData.order_id              
//             //   },
//               type: sequelize.QueryTypes.SELECT} 
//           );       
//           return state;
//         }       
//       },
//       tableName: 'State',
//       timestamps: false    
//     });
//     return State;
//   };

  
  

