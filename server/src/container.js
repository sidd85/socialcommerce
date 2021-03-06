const { createContainer, asClass, asFunction, asValue } = require("awilix");
const { scopePerRequest } = require("awilix-express");

const config = require("../config");

const Application = require("./app/Application");

const { Login, Signup, Logout, UserInfo, EditUser } = require("./app/auth");

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


const { GetAllCategories, GetAllCategoriesByDepartment, GetAllCategoriesByCommunity,GetCategory} = require("./app/category");

const { GetAllCommunities, GetAllCommunitiesByText,GetAllAgentName,GetOrderDetail,CommunityDetail} = require("./app/community");
const { GetAllBanners,PostBanner } = require("./app/banner");
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
const { GetAllCallInfo } =require("./app/callinfo");//callinfo
const { GetAllOrderDetail,GetAllOrderlist} = require("./app/orderDetail");//orderDetail
const {GetAllCountry,GetAllState,GetAllCity}=require("./app/Country_State_City_Dependancy")//city country state dependancy

const {GetSubCategory}=require('./app/subcategory')
const {PostProductReview,GetAllProductReview}=require('./app/product_review')
const {PostCustomerSession}=require('./app/customer_session')

const {GetPreferences, UpdatePreferences} = require("./app/preferences");

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
const PreferencesSerializer = require("./interfaces/http/preferences/PreferencesSerializer");

const BannerSerializer = require("./interfaces/http/banner/BannerSerializer");//Banner
const CallinfoSerializer = require("./interfaces/http/callInfo/CallinfoSerializer");//callinfo
const OrderDetailSerializer = require("./interfaces/http/orderDetail/OrderDetailSerializer");
const CountrySerializer = require("./interfaces/http/country/CountrySerializer");
const StateSerializer = require("./interfaces/http/state/StateSerializer");
const CitySerializer = require("./interfaces/http/city/CitySerializer");

const SubCategorySerializer = require("./interfaces/http/subcategory/SubCategorySerializer");
const Product_ReviewSerializer=require("./interfaces/http/product_review/Product_ReviewSerializer");
const CustomerSessionSerializer=require("./interfaces/http/customer_session/CustomerSessionSerializer");





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
const SequelizePreferencesRepository = require("./infra/preferences/SequelizePreferencesRepository");

const SequelizeBannerRepository = require("./infra/banner/SequelizeBannerRepository");
const SequelizeCallinfoRepository = require("./infra/callInfo/SequelizeCallInfoRepository");
const SequelizeOrderDetailRepository = require("./infra/orderDetail/SequelizeOrderDetailRepository");
const SequelizeCountryRepository = require("./infra/CountryStateCity/SequelizeCountryRepository");
const SequelizeStateRepository=require("./infra/CountryStateCity/SequelizeStateRepository");
const SequelizeCityRepository=require("./infra/CountryStateCity/SequelizeCityRepository");
const SequelizeSubCategoriesRepository=require("./infra/subcategory/SequelizeSubCategoriesRepository")
const SequelizePostProductReviewRepository=require("./infra/PostProductReview/SequelizePostProductReviewRepository")
const SequelizeCustomerSessionRepository=require("./infra/customer_session/SequelizeCustomerSessionRepository")

const {
  database,
  Customer: CustomerModel,
  Product: ProductModel,
  Department: DepartmentModel,
  Category: CategoryModel,
  ShippingRegion: ShippingRegionModel,
  ShippingRate: ShippingRateModel,
  ShoppingCart: ShoppingCartModel,
  orders:OrdersModel,
  attribute,
  AttributeValue: AttributeValueModel,
  ProductAttribute: ProductAttributeModel,
  Community: CommunityModel,
  Preferences: PreferencesModel,
  Banner:BannerModel, //Banner
  Callinfo:CallinfoModel,//callinfo
  order_detail:OrderDetailModel,
  Country:CountryModel,
  State:StateModel,
  City:CityModel,
  SubCategory:SubCategoryModel,
  PostProductReview:PostProductReviewModel,
  CustomerSession:CustomerSessionModel
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
  preferencesRepository: asClass(SequelizePreferencesRepository).singleton(),
  bannerRepository: asClass(SequelizeBannerRepository).singleton(),//Banner
  callInfoRepository:asClass(SequelizeCallinfoRepository).singleton(),//callinfo
  OrderDetailRepository:asClass(SequelizeOrderDetailRepository).singleton(),//orderdetail
  countryRepository:asClass(SequelizeCountryRepository).singleton(),//Country 
  stateRepository:asClass(SequelizeStateRepository).singleton(),
  cityRepository:asClass(SequelizeCityRepository).singleton(), 
  subCategoriesRepository:asClass(SequelizeSubCategoriesRepository).singleton(),
  stateRepository:asClass(SequelizeStateRepository),
  cityRepository:asClass(SequelizeCityRepository), 
  postProductReviewRepository:asClass(SequelizePostProductReviewRepository),
  customerSessionRepository:asClass(SequelizeCustomerSessionRepository)
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
  OrdersModel: asValue(OrdersModel),
  AttributeModel: asValue(attribute),
  AttributeValueModel: asValue(AttributeValueModel),
  ProductAttributeModel: asValue(ProductAttributeModel),
  CommunityModel: asValue(CommunityModel),
  PreferencesModel: asValue(PreferencesModel),
  BannerModel: asValue(BannerModel), //Banner
  CallinfoModel: asValue(CallinfoModel), //Callinfo
  OrderDetailModel: asValue(OrderDetailModel), //orderDetail
  CountryModel:asValue(CountryModel),
  StateModel:asValue(StateModel),
  CityModel:asValue(CityModel),
  SubCategoryModel:asValue(SubCategoryModel),
  PostProductReviewModel:asValue(PostProductReviewModel),
  CustomerSessionModel:asValue(CustomerSessionModel)
});

// Operations
container.register({
  login: asClass(Login),
  logout: asClass(Logout),
  signup: asClass(Signup),
  userInfo: asClass(UserInfo),
  editUser:asClass(EditUser),
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
  getCategory:asClass(GetCategory),
  getSubCategory:asClass(GetSubCategory),

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
  getOrderDetail:asClass(GetOrderDetail),
  getPreferences: asClass(GetPreferences),
  updatePreferences: asClass(UpdatePreferences),
  getAllBanners:asClass(GetAllBanners),
  getAllCallinfo:asClass(GetAllCallInfo),
  getAllOrderDetail:asClass(GetAllOrderDetail),
  getAllOrderlist:asClass(GetAllOrderlist),
  getAllCountry:asClass(GetAllCountry),
  getAllState:asClass(GetAllState),
  getAllCity:asClass(GetAllCity),
 communityDetail:asClass(CommunityDetail),
 postProductReview:asClass(PostProductReview),
 getAllProductReview:asClass(GetAllProductReview), 
 postCustomerSession:asClass(PostCustomerSession)
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
  preferencesSerializer: asValue(PreferencesSerializer),
  bannerSerializer: asValue(BannerSerializer),//Banner
  callinfoSerializer:asValue(CallinfoSerializer),//Callinfo
  orderDetailSerializer:asValue(OrderDetailSerializer),//OrderDetail
  countrySerializer:asValue(CountrySerializer),
  stateSerializer:asValue(StateSerializer),
  citySerializer:asValue(CitySerializer),
  subCategorySerializer:asValue(SubCategorySerializer),
  product_ReviewSerializer:asValue(Product_ReviewSerializer),
  customerSessionSerializer:asValue(CustomerSessionSerializer)
});

container.register({
  EmailHandler: asClass(EmailHandler).singleton()
});

module.exports = container;
