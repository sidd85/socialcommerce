
const Operation = require('src/app/Operation');

class GetAllCategories extends Operation {
  constructor({ categoriesRepository }) {
    super();
    this.categoriesRepository = categoriesRepository;
  }

  async execute(page = 1, limit = 10) {
    const { SUCCESS, ERROR } = this.outputs;
    try {
      const categories = await this.categoriesRepository.getAll({
        attributes: ['category_id', 'name', 'description', 'department_id'],
        limit: limit,
        offset: (page-1)*limit
      });
      this.emit(SUCCESS, categories);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllCategories.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllCategories;
