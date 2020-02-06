
const Operation = require('src/app/Operation');

class GetAllAgentName extends Operation {
    constructor({ communitiesRepository }) {
        super();
        this.communitiesRepository = communitiesRepository;
      }
    
      async execute(page = 1, limit = 10) {
        const { SUCCESS, ERROR } = this.outputs;
        try {
          const categories = await this.communitiesRepository.getAgentName({
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

GetAllAgentName.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllAgentName;
