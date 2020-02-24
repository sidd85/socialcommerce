const CounrtySerializer = {
    serialize({ id,sortname,name,phonecode }) {
      return {    
        "id":id,
        "sortname":"sortname",
        "name":name,
        "phonecode":phonecode
      };
    }
  };
  
  module.exports = CounrtySerializer;

