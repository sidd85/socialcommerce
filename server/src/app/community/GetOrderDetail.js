
const Operation = require('src/app/Operation');

class GetOrderDetail extends Operation {
    constructor({ communitiesRepository }) {
        super();
        this.communitiesRepository = communitiesRepository;
      }
    
      async execute(page = 1, limit = 10) {
        const { SUCCESS, ERROR } = this.outputs;
        try {
          const categories = await this.communitiesRepository.getOrderDetail({
            attributes: ['community_name'],
            limit: limit,
            offset: (page-1)*limit
          });
          this.emit(SUCCESS, categories);
        } catch(error) {
          this.emit(ERROR, error);
        }
      }  
}

GetOrderDetail.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetOrderDetail;