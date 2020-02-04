const CallInfoSerializer = {
    serialize({ caller_id, name, address, mobile }) {
      return {    
        caller_id : caller_id,
        name : name, 
        address : address,
        mobile : mobile
      };
    }
  };
  
  module.exports = CallInfoSerializer;

  