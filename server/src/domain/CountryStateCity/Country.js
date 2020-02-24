const { attributes } = require('structure');
var validator = require("email-validator");

const Country = attributes({ 
    id: {
    type: String,
    required: true
  },
  sortname: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phonecode: {
    type: String,
    required: true
  },
})
module.exports = Country;



