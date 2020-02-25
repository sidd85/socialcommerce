const CategorySerializer = {
  serialize({ category_id, name, description,sub_category_id}) {
    let categoryId = category_id;
    return {
      categoryId,
      name,
      description,
      sub_category_id      
    };
  }
};

module.exports = CategorySerializer;
