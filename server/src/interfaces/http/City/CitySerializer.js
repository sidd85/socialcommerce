const CitySerializer = {
    serialize({ id ,name,state_id}) {
      return {    
        "id":id,
        "name":name,
        "state_id":state_id
      };
    }
  };
  
  module.exports = CitySerializer;

