const Operation = require('src/app/Operation');
class CommunityDetail extends Operation {
  constructor({  communitiesRepository }) {
    super();
    this. communitiesRepository =  communitiesRepository;
  }

  async execute(orderData) {
    const { SUCCESS, ERROR, UNAUTHORIZED } = this.outputs;

    try {
      // this.isAuthorized(user);
      const order = await this.communitiesRepository.communityDetail(orderData);
      this.emit(SUCCESS, order);
    } catch(error) {
      if(error.message === 'UnauthorizedError') {
        this.emit(UNAUTHORIZED, "User not authorized for this action");
      }
      this.emit(ERROR, error);
    }
  }
}
CommunityDetail.setOutputs(['SUCCESS', 'ERROR', 'UNAUTHORIZED']);

module.exports = CommunityDetail;
