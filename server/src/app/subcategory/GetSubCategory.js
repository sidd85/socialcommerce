const Operation = require('src/app/Operation');
class GetSubCategory extends Operation {
  constructor({ subCategoriesRepository }) {
    super();
    this.subCategoriesRepository =  subCategoriesRepository;
  }
  async execute(Data) {
    const { SUCCESS, ERROR, UNAUTHORIZED } = this.outputs;

    try {
      // this.isAuthorized(user);
      const data = await this.subCategoriesRepository.getSubCategory(Data);
      this.emit(SUCCESS, data );
    } catch(error) {
      if(error.message === 'UnauthorizedError') {
        this.emit(UNAUTHORIZED, "User not authorized for this action");
      }
      this.emit(ERROR, error);
    }
  }
}
GetSubCategory.setOutputs(['SUCCESS', 'ERROR', 'UNAUTHORIZED']);

module.exports = GetSubCategory;
