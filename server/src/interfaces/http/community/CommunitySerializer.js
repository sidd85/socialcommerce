const CommunitySerializer = {
  serialize({ community_id, community_name, community_address, agent_id, agent_designation,name,product_name,item_id,order_id,product_id,attributes,quantity,unit_cost,status }) {
    return {
      communityId: community_id,
      communityName: community_name,
      communityAddress: community_address,
      agentId: agent_id,
      agentDesignation: agent_designation,
      customerName :name,
      product_name:product_name,
      item_id:item_id,
      order_id:order_id,
      product_id:product_id,
      attributes:attributes,    
      quantity:quantity, 
      unit_cost:unit_cost,  
      status:status  
    };
  }
};

module.exports = CommunitySerializer;

