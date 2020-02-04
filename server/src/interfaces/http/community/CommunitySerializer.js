const CommunitySerializer = {
  serialize({ community_id, community_name, community_address, agent_id, agent_designation }) {
    return {
      communityId: community_id,
      communityName: community_name,
      communityAddress: community_address,
      agentId: agent_id,
      agentDesignation: agent_designation
    };
  }
};

module.exports = CommunitySerializer;
