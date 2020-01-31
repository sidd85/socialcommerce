
const Operation = require('src/app/Operation');

class GetPreferences extends Operation {
  constructor({ preferencesRepository }) {
    super();
    this.preferencesRepository = preferencesRepository;
  }

  async execute(user) {
    const { SUCCESS, UNAUTHORIZED, ERROR } = this.outputs;
    try {
      this.isAuthorized(user);
      const preferences = await this.preferencesRepository.get(user);
      this.emit(SUCCESS, preferences);
    } catch(error) {
      if (error.message === "UnauthorizedError") {
        this.emit(UNAUTHORIZED, "User not authorized for this action");
      } else {
        this.emit(ERROR, error);
      }
    }
  }
}

GetPreferences.setOutputs(['SUCCESS', 'UNAUTHORIZED', 'ERROR']);

module.exports = GetPreferences;
