const { attributes } = require('structure');
var validator = require("email-validator");

const City = attributes({  
    id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  state_id: {
    type: String,
    required: true
  }  
})

module.exports = City;