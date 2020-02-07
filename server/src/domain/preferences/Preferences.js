const { attributes } = require('structure');

const Preferences = attributes({
  customer_id: Number,
  community_id: Number,
  community_name: String,
  language_code: String
})(class Preferences {
});

module.exports = Preferences;