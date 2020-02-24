const CommunityMapper = require("./SequelizeCommunityMapper");

class SequelizeCommunitiesRepository {
  constructor({ CommunityModel }) {
    this.CommunityModel = CommunityModel;
  }

  async getAll(...args) {
    const communities = await this.CommunityModel.options.classMethods.getAll(
      args[0].page,
      args[0].limit,
      args[0].offset
    );
    let rows = JSON.parse(JSON.stringify(communities));
    communities.rows = rows;
    communities.count = rows.length;
    return communities;
  }

  async getAllByText(...args) {
    let offset = (args[0].page - 1) * args[0].limit;
    const communities = await this.CommunityModel.options.classMethods.getAllCommunitiesByText(
      args[0].searchText,
      args[0].page,
      args[0].limit,
      offset
    );
    let rows = JSON.parse(JSON.stringify(communities));
    communities.rows = rows;
    const communityCount = await this.CommunityModel.options.classMethods.getAllCommunitiesCountByText(
      args[0].searchText
    );
    communities.count = (JSON.parse(JSON.stringify(communityCount))[0]['count(*)']);
    return communities;
  }

  async getAgentName(...args) {
    const communities = await this.CommunityModel.options.classMethods.getAllAgentName(
      args[0].page,
      args[0].limit,
      args[0].offset
    );
    let rows = JSON.parse(JSON.stringify(communities));
    communities.rows = rows;
    communities.count = rows.length;
    return communities;
  }

  async getOrderDetail(...args) {
    const communities = await this.CommunityModel.options.classMethods.getOrderDetail(
      args[0].page,
      args[0].limit,
      args[0].offset
    );
    let rows = JSON.parse(JSON.stringify(communities));
    communities.rows = rows;
    communities.count = rows.length;
    return communities;
  }
  async communityDetail( orderData) {
  
    const order = await this.CommunityModel.options.classMethods.communityDetail(orderData);  
      if(order.length==1){
      return {success:true,message:"successfully update data",value:1};
    }else{
      return {success:false,message:"successfully update data",value:0};
    }
    
  }
  
}

module.exports = SequelizeCommunitiesRepository;