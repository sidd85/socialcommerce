const StateSerializer = {
    serialize({ id,name,country_id}) {
      return {    
        "id":id,
        "name":name,
        "country_id":country_id
      };
    }
  };
  module.exports = StateSerializer;