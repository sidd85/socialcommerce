const PreferncesMapper = require("./SequelizePreferencesMapper");

class SequelizePreferencesRepository {
  constructor({ PreferencesModel }) {
    this.PreferencesModel = PreferencesModel;
  }

  async get(user) {
    const preferences = await this.PreferencesModel.options.classMethods.get(user);
    return preferences.length ? PreferncesMapper.toEntity(preferences[0]) : {};
  }

  async update(...args) {
    const preferences = await this.PreferencesModel.options.classMethods.upsert(
      args[0], args[1]
    );
    return preferences.length ? PreferncesMapper.toEntity(preferences[0]) : {};
  }
}

module.exports = SequelizePreferencesRepository;
