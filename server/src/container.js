const { createContainer, asClass, asFunction, asValue } = require("awilix");
const { scopePerRequest } = require("awilix-express");

const config = require("../config");

const Application = require("./app/Application");

const { Login, Signup, Logout, UserInfo } = require("./app/auth");

const {
  GetProductDetails,
  GetProductAttributes,
  GetAllProducts,
  GetAllProductsByText,
  GetAllProductsByCategory,
  GetAllProductsByCommunity,
  GetAllProductsByCategoryAndCommunity,
} = require("./app/product");

const { GetAllDepartments } = require("./app/department");

const { GetAllCategories, GetAllCategoriesByDepartment, GetAllCategoriesByCommunity } = require("./app/category");

const { GetAllCommunities, GetAllCommunitiesByText,GetAllAgentName} = require("./app/community");

const { GetAllBanners,PostBanner } = require("./app/banner");

const { GetAllCallInfo } =require("./app/callinfo");

const {
  GetShippingRegions,
  GetShippingRates,
  UpdateShippings,
  GetShippings
} = require("./app/shipping");

const {
  AddToCart,
  GetCart,
  UpdateCartItem,
  RemoveCartItem,
  PlaceOrder,
  RetrieveOrder,
  UpdateOrder,
  GetOrder
} = require("./app/store");

const { Banner } = require("./app/banner");//Banner


const AuthSerializer = require("./interfaces/http/auth/AuthSerializer");
const ProductSerializer = require("./interfaces/http/product/ProductSerializer");
const ProductAttributeSerializer = require("./interfaces/http/product/ProductAttributeSerializer");
const DepartmentSerializer = require("./interfaces/http/department/DepartmentSerializer");
const CategorySerializer = require("./interfaces/http/category/CategorySerializer");
const ShippingSerializer = require("./interfaces/http/shipping/ShippingSerializer");
const ShippingRateSerializer = require("./interfaces/http/shipping/ShippingRateSerializer");
const ShippingRegionSerializer = require("./interfaces/http/shipping/ShippingRegionSerializer");
const CartSerializer = require("./interfaces/http/store/CartSerializer");
const OrderSerializer = require("./interfaces/http/store/OrderSerializer");
const CommunitySerializer = require("./interfaces/http/community/CommunitySerializer");

const BannerSerializer = require("./interfaces/http/banner/BannerSerializer");//Banner
const CallinfoSerializer = require("./interfaces/http/callInfo/CallinfoSerializer");//Serializer

const Server = require("./interfaces/http/Server");
const router = require("./interfaces/http/router");
const loggerMiddleware = require("./interfaces/http/logging/loggerMiddleware");
const errorHandler = require("./interfaces/http/errors/errorHandler");
const devErrorHandler = require("./interfaces/http/errors/devErrorHandler");
const swaggerMiddleware = require("./interfaces/http/swagger/swaggerMiddleware");

const logger = require("./infra/logging/logger");
const EmailHandler = require("./infra/mail/EmailHandler");

const SequelizeCustomersRepository = require("./infra/customer/SequelizeCustomersRepository");
const SequelizeProductsRepository = require("./infra/product/SequelizeProductsRepository");
const SequelizeDepartmentsRepository = require("./infra/department/SequelizeDepartmentsRepository");
const SequelizeCategoriesRepository = require("./infra/category/SequelizeCategoriesRepository");
const SequelizeShippingRegionsRepository = require("./infra/shipping/SequelizeShippingRegionsRepository");
const SequelizeShippingRatesRepository = require("./infra/shippingRate/SequelizeShippingRatesRepository");
const SequelizeShippingsRepository = require("./infra/shipping/SequelizeShippingsRepository");
const SequelizeCartsRepository = require("./infra/store/SequelizeCartsRepository");
const SequelizeOrdersRepository = require("./infra/store/SequelizeOrdersRepository");
const SequelizeCommunitiesRepository = require("./infra/community/SequelizeCommunitiesRepository");

const SequelizeBannerRepository = require("./infra/banner/SequelizeBannerRepository");//Banner
const SequelizeCallinfoRepository = require("./infra/callInfo/SequelizeCallInfoRepository");//Banner

const {
  database,
  Customer: CustomerModel,
  Product: ProductModel,
  Department: DepartmentModel,
  Category: CategoryModel,
  ShippingRegion: ShippingRegionModel,
  ShippingRate: ShippingRateModel,
  ShoppingCart: ShoppingCartModel,
  orders,
  attribute,
  AttributeValue: AttributeValueModel,
  ProductAttribute: ProductAttributeModel,
  Community: CommunityModel,
  Banner:BannerModel, //Banner
  Callinfo:CallinfoModel
} = require("./infra/database/models");

const container = createContainer();

// System
container
  .register({
    app: asClass(Application).singleton(),
    server: asClass(Server).singleton()
  })
  .register({
    router: asFunction(router).singleton(),
    logger: asFunction(logger).singleton()
  })
  .register({
    config: asValue(config)
  });

// Middlewares
container
  .register({
    loggerMiddleware: asFunction(loggerMiddleware).singleton()
  })
  .register({
    containerMiddleware: asValue(scopePerRequest(container)),
    errorHandler: asValue(config.production ? errorHandler : devErrorHandler),
    swaggerMiddleware: asValue([swaggerMiddleware])
  });

// Repositories
container.register({
  customersRepository: asClass(SequelizeCustomersRepository).singleton(),
  productsRepository: asClass(SequelizeProductsRepository).singleton(),
  departmentsRepository: asClass(SequelizeDepartmentsRepository).singleton(),
  categoriesRepository: asClass(SequelizeCategoriesRepository).singleton(),
  shippingRegionsRepository: asClass(SequelizeShippingRegionsRepository).singleton(),
  shippingRatesRepository: asClass(SequelizeShippingRatesRepository).singleton(),
  shippingsRepository: asClass(SequelizeShippingsRepository).singleton(),
  cartsRepository: asClass(SequelizeCartsRepository).singleton(),
  ordersRepository: asClass(SequelizeOrdersRepository).singleton(),
  communitiesRepository: asClass(SequelizeCommunitiesRepository).singleton(),
  bannerRepository: asClass(SequelizeBannerRepository).singleton(),//Banner
  callInfoRepository:asClass(SequelizeCallinfoRepository).singleton() 
});


// Database
container.register({
  database: asValue(database),
  CustomerModel: asValue(CustomerModel),
  ProductModel: asValue(ProductModel),
  DepartmentModel: asValue(DepartmentModel),
  CategoryModel: asValue(CategoryModel),
  ShippingRegionModel: asValue(ShippingRegionModel),
  ShippingRateModel: asValue(ShippingRateModel),
  ShoppingCartModel: asValue(ShoppingCartModel),
  OrdersModel: asValue(orders),
  AttributeModel: asValue(attribute),
  AttributeValueModel: asValue(AttributeValueModel),
  ProductAttributeModel: asValue(ProductAttributeModel),
  CommunityModel: asValue(CommunityModel),
  BannerModel: asValue(BannerModel), //Banner
  CallinfoModel: asValue(CallinfoModel) //Callinfo
});

// Operations
container.register({
  login: asClass(Login),
  logout: asClass(Logout),
  signup: asClass(Signup),
  userInfo: asClass(UserInfo),
  // Products
  getProductDetails: asClass(GetProductDetails),
  getProductAttributes: asClass(GetProductAttributes),
  getAllProducts: asClass(GetAllProducts),
  getAllProductsByText: asClass(GetAllProductsByText),
  getAllProductsByCategory: asClass(GetAllProductsByCategory),
  getAllProductsByCommunity: asClass(GetAllProductsByCommunity),
  getAllProductsByCategoryAndCommunity: asClass(GetAllProductsByCategoryAndCommunity),
  // Departments
  getAllDepartments: asClass(GetAllDepartments),
  // Categories
  getAllCategories: asClass(GetAllCategories),
  getAllCategoriesByDepartment: asClass(GetAllCategoriesByDepartment),
  getAllCategoriesByCommunity: asClass(GetAllCategoriesByCommunity),
  // Shipping
  getShippingRegions: asClass(GetShippingRegions),
  getShippingRates: asClass(GetShippingRates),
  updateShippings: asClass(UpdateShippings),
  getShippings: asClass(GetShippings),
  //Store
  addToCart: asClass(AddToCart),
  getCart: asClass(GetCart),
  updateCartItem: asClass(UpdateCartItem),
  removeCartItem: asClass(RemoveCartItem),
  placeOrder: asClass(PlaceOrder),
  retrieveOrder: asClass(RetrieveOrder),
  updateOrder: asClass(UpdateOrder),
  getOrder: asClass(GetOrder),
  getAllCommunities: asClass(GetAllCommunities),
  getAllCommunitiesByText: asClass(GetAllCommunitiesByText),
  getAllAgentName: asClass(GetAllAgentName),
  getAllBanners:asClass(GetAllBanners),
  postBanner:asClass(PostBanner),
  getAllCallinfo:asClass(GetAllCallInfo)

});

// Serializers
container.register({
  authSerializer: asValue(AuthSerializer),
  productSerializer: asValue(ProductSerializer),
  productAttributeSerializer: asValue(ProductAttributeSerializer),
  departmentSerializer: asValue(DepartmentSerializer),
  categorySerializer: asValue(CategorySerializer),
  shippingSerializer: asValue(ShippingSerializer),
  shippingRateSerializer: asValue(ShippingRateSerializer),
  shippingRegionSerializer: asValue(ShippingRegionSerializer),
  cartSerializer: asValue(CartSerializer),
  orderSerializer: asValue(OrderSerializer),
  communitySerializer: asValue(CommunitySerializer),
  bannerSerializer: asValue(BannerSerializer),//Banner
  callinfoSerializer:asValue(CallinfoSerializer)//Callinfo
});

container.register({
  EmailHandler: asClass(EmailHandler).singleton()
});

module.exports = container;
