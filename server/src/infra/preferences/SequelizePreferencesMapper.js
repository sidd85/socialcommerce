const Preferences = require("src/domain/preferences/Preferences");

const SequelizePreferencesMapper = {
  toEntity(dataValues) {
    const { customer_id, community_id, language_code, community_name } = dataValues;
    return new Preferences({ customer_id, community_id, language_code, community_name });
  },

  toDatabase(survivor) {
    const { customer_id, community_id, language_code } = survivor;

    return { customer_id, community_id, language_code };
  }
};

module.exports = SequelizePreferencesMapper;
