
const Operation = require('src/app/Operation');

class GetAllCallInfo extends Operation {
  constructor({ callInfoRepository }) {
    super();
    this.callInfoRepository = callInfoRepository;
  }

  async execute(page = 1, limit = 10) {
    const { SUCCESS, ERROR } = this.outputs;
    try {
      const callinfo = await this.callInfoRepository.getAll({
        attributes: ['caller_id', 'name', 'address', 'mobile'],
        limit: limit,
        offset: (page-1)*limit
      });
      this.emit(SUCCESS, callinfo);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllCallInfo.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllCallInfo;
