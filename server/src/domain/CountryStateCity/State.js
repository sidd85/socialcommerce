const { attributes } = require('structure');
var validator = require("email-validator");

const State = attributes({
  customer_id: Number,
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  country_id: {
    type: String,
    required: true
  },
  
})
module.exports = State;
