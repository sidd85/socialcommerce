/* jshint indent: 2 */

// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as
//the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  const Customer = sequelize.define(
    "customer",
    {
      customer_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      credit_card: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      address_1: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      address_2: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      region: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      postal_code: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      country: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      shipping_region_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: "1"
      },
      day_phone: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      eve_phone: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      mob_phone: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      }
    },
    {
      instanceMethods: {
        validPassword: function(password) {
          return bcrypt.compareSync(password, this.password);
        }
      },
      classMethods: {
        addCustomer: function(dbUser) {
          const newUserId = sequelize.query(
            "CALL customer_add_v2 (:inName, :inEmail, :inPhone, :inPassword);",
            {
              replacements: {
                inName: dbUser.name,
                inEmail: dbUser.email,
                inPhone: dbUser.mob_phone,
                inPassword: bcrypt.hashSync(
                  dbUser.password,
                  bcrypt.genSaltSync(10),
                  null
                )
              },
              type: sequelize.QueryTypes.RAW
            }
          );
          return newUserId;
        },
        updateShipping: function(dbUser, shippingData) {
          const updated = sequelize.query(
            "CALL customer_update_address (:inCustomerId, :inAddress1, :inAddress2, :inCity, :inRegion, :inPostalCode, :inCountry,:inShippingRegionId);",
            {
              replacements: {
                inCustomerId: dbUser.customer_id,
                inAddress1: shippingData["address1"],
                inAddress2: shippingData["address2"],
                inCity: shippingData["city"],
                inRegion: shippingData["region"],
                inPostalCode: shippingData["postCode"],
                inCountry: shippingData["country"],
                inShippingRegionId: shippingData["shippingRegionId"]
              },
              type: sequelize.QueryTypes.RAW
            }
          );
          return updated;
        },
        getShipping: function(dbUser) {
          const shippingAddress = sequelize.query(
            "CALL customer_get_customer (:inCustomerId);",
            {
              replacements: {
                inCustomerId: dbUser.customer_id
              },
              type: sequelize.QueryTypes.RAW
            }
          );

         

          console.log(shippingAddress)

          return shippingAddress;
        },

        editUser: function(dbUser) {
          console.log(dbUser)

          const editUser = sequelize.query(
            "UPDATE customer SET name=:name,address_1=:address1,address_2 =:address2,city =:city,state =:state,postal_code =:pincode,country =:country,gender =:gender,dob=:dob  WHERE email = :email;",            
            {
              // name=:nam,address_1=:add,credit_card=:cr
              replacements: {
                email: dbUser.email ,                        
                name:dbUser.name,
                address1:dbUser.address1,
                address2 :dbUser.address2, 
                city :dbUser.city, 
                state :dbUser.state, 
                pincode :dbUser.pincode,
                country :dbUser.country, 
                gender :dbUser.gender,
                dob:dbUser.dob,
              },
              type: sequelize.QueryTypes.RAW
            }
          );
          console.log(editUser,"!!!!!!!!!!!!!!!!!!!!!")
          return editUser;
        },

      },
      tableName: "customer",
      timestamps: false
    }
  );

  // Hooks are automatic methods that run during various phases of the Customer Model lifecycle
  // In this case, before a Customer is created, we will automatically hash their password
  Customer.beforeCreate((user, options) => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });

  return Customer;
};
