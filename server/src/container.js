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

const { GetAllCommunities, GetAllCommunitiesByText} = require("./app/community");

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
  UpdateOrder,
  GetOrder
} = require("./app/store");

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
  Community: CommunityModel
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
  shippingRegionsRepository: asClass(
    SequelizeShippingRegionsRepository
  ).singleton(),
  shippingRatesRepository: asClass(
    SequelizeShippingRatesRepository
  ).singleton(),
  shippingsRepository: asClass(SequelizeShippingsRepository).singleton(),
  cartsRepository: asClass(SequelizeCartsRepository).singleton(),
  ordersRepository: asClass(SequelizeOrdersRepository).singleton(),
  communitiesRepository: asClass(SequelizeCommunitiesRepository).singleton(),
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
  CommunityModel: asValue(CommunityModel)
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
  updateOrder: asClass(UpdateOrder),
  getOrder: asClass(GetOrder),
  getAllCommunities: asClass(GetAllCommunities),
  getAllCommunitiesByText: asClass(GetAllCommunitiesByText),
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
  communitySerializer: asValue(CommunitySerializer)
});

container.register({
  EmailHandler: asClass(EmailHandler).singleton()
});

module.exports = container;
