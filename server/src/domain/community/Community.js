const { attributes } = require('structure');

const Community = attributes({
  community_id: Number,
  community_name: String,
  community_address: String,
  agent_id: Number,
  agent_designation: String
})(class Community {
});

module.exports = Community;