const AuthSerializer = {
  serialize({ customer_id, name, email, mob_phone }) {
    let customerId = customer_id;
    return {
      customerId,
      name,
      email,
      mob_phone
    };
  }
};

module.exports = AuthSerializer;
