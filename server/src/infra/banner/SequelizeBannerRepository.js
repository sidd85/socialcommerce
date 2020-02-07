const BannerMapper = require("./SequelizeBannerMapper");
const Customer = require('src/domain/banner/Banner');

class SequelizeBannerRepository {
  constructor({ BannerModel }) {
    this.BannerModel = BannerModel;
  }
  
  async getAll(...args) {
    const banners = await this.BannerModel.options.classMethods.getAll(
      args[0].page,
      args[0].limit,
      args[0].offset
    );
    let rows = JSON.parse(JSON.stringify(banners));
    banners.rows = rows;
    banners.count = rows.length;
    return banners;
  }

  // async PostBanner(customer) {
  //   const { valid, errors } = customer.validate();

  //   if(!valid) {
  //     const error = new Error('ValidationError');
  //     error.details = errors;
  //     throw error;
  //   }
  //   const newCustomerId = await this.CustomerModel.options.classMethods.addCustomer(CustomerMapper.toDatabase(customer));
  //   let customer_id = ((JSON.parse(JSON.stringify(newCustomerId))[0]['LAST_INSERT_ID()']));
  //   banner_type=customer.banner_type,
  //   banner_path=customer.banner_path,
  //   banner_product_id=customer.banner_product_id
  //   return CustomerMapper.toEntity({'dataValues':{ banner_type,banner_path,banner_product_id }});
  // }
}

module.exports = SequelizeBannerRepository;