
const Operation = require('src/app/Operation');

class GetAllCountry extends Operation {
  constructor({ countryRepository }) {
    super();
    this.countryRepository = countryRepository;
  }

  async execute(page = 1, limit = 10) {
    const { SUCCESS, ERROR } = this.outputs;
    try {

      const callinfo = await this.countryRepository.getAllCountry({
        attributes: ['id','sortname','name','phonecode'],
        limit: limit,
        offset: (page-1)*limit
      });
      this.emit(SUCCESS, callinfo);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllCountry.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllCountry;
