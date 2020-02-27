const CustomerSessionSerializer = {
    serialize({customer_id,device_token,device_type}) {      
      return {
        "customer_id":customer_id,
        "device_token":device_token,
        "device_type":device_type     
      };
    }
  };
  
  module.exports = CustomerSessionSerializer;