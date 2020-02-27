      /* jshint indent: 2 */
      module.exports = function(sequelize, DataTypes) {
        const customer_session = sequelize.define(
          "customer_session",
          {
            customer_id: {
                type: DataTypes.INTEGER(20),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
              },
              device_token: {
                type: DataTypes.STRING(255),
                allowNull: false
              },
              device_type: {
                type: DataTypes.STRING(255),
                allowNull: false
              }
          },
          {
            classMethods: {
                  postCustomerSession: function(orderData) {    
                    console.log(orderData)
                    const customer_session = sequelize.query(
                    "INSERT INTO customer_session (customer_id,device_token,device_type)VALUES (:iscustomer_id,:isdevice_token,:isdevice_type);", { 
                  replacements: {
                    iscustomer_id:orderData.customer_id,
                    isdevice_token:orderData.device_token,
                    isdevice_type:orderData.device_type  
                  },
                        type: sequelize.QueryTypes.INSERT} 
                    );     
                    console.log(customer_session,"64564666464666")                     
                    return customer_session;
                  },

            },
            tableName: "customer_session",
            timestamps: false
          },
        );
      
        return customer_session;
      };
    