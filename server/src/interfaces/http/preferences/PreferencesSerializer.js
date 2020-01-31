const PreferencesSerializer = {
  serialize({ customer_id, community_id, language_code, community_name }) {
    return {
      customerId: customer_id,
      communityId: community_id,
      languageCode: language_code,
      communityName: community_name
    };
  }
};

module.exports = PreferencesSerializer;
