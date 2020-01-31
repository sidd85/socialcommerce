
const Operation = require('src/app/Operation');

class UpdatePreferences extends Operation {
  constructor({ preferencesRepository }) {
    super();
    this.preferencesRepository = preferencesRepository;
  }

  async execute(user, preferencesData) {
    const { SUCCESS, ERROR, UNAUTHORIZED } = this.outputs;
    try {
      this.isAuthorized(user);
      const preferences = await this.preferencesRepository.update(user, preferencesData);
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

UpdatePreferences.setOutputs(['SUCCESS', 'ERROR', 'UNAUTHORIZED']);

module.exports = UpdatePreferences;
