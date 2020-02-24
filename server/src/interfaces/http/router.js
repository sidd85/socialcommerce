const { Router } = require("express");
const statusMonitor = require("express-status-monitor");
const cors = require("cors");
const bodyParser = require("body-parser");
const compression = require("compression");
const methodOverride = require("method-override");
const controller = require("./utils/createControllerRoutes");
const passport = require("../../../config/passport");
var express = require('express');
var app = express();

const ngrok = require('ngrok');
(async function() {
  const url = await ngrok.connect();
})();
module.exports = ({
  config,
  containerMiddleware,
  loggerMiddleware,
  errorHandler,
  swaggerMiddleware
}) => {
  const router = Router();

  /* istanbul ignore if */
  if (config.env === "development") {
    router.use(statusMonitor());
  }

  /* istanbul ignore if */
  if (config.env !== "test") {
    router.use(loggerMiddleware);
  }

  const apiRouter = Router();

  apiRouter
    .use(methodOverride("X-HTTP-Method-Override"))
    .use(cors({
      origin: ["http://localhost:3000", "http://localhost:19006", "https://soccofresh.com", "https://www.soccofresh.com", "https://server.soccofresh.com"],
      credentials: true
    }))
    .use(bodyParser.json())
    .use(compression())
    .use(containerMiddleware)
    .use("/docs", swaggerMiddleware);
   
    app.use(express.static('./public'));
  /*
   * Add your API routes here
   *
   * You can use the `controllers` helper like this:
   * apiRouter.use('/users', controller(controllerPath))
   *
   * The `controllerPath` is relative to the `interfaces/http` folder
   */

  apiRouter.use("/product", controller("product/ProductsController"));

  apiRouter.use("/department", controller("department/DepartmentsController"));

  apiRouter.use("/category", controller("category/CategoriesController"));

  apiRouter.use("/community", controller("community/CommunityController"));

  apiRouter.use("/shipping", controller("shipping/ShippingsController"));

  apiRouter.use("/store", controller("store/StoresController"));

  apiRouter.use("/preferences", controller("preferences/PreferencesController"));

  apiRouter.use(
    "/login",
    passport.authenticate("local"),
    controller("auth/AuthController")
  );

  apiRouter.use("/signout", controller("auth/SignoutController"));
  apiRouter.use("/signup", controller("auth/SignupController"));
  apiRouter.use("/getUserInfo", controller("auth/UserInfoController"));
  apiRouter.use("/editUser", controller("auth/EditController"));

  apiRouter.use("/banner", controller("banner/BannerController"));
  apiRouter.use("/callInfo", controller("callInfo/CallinfoController")); 
  apiRouter.use("/orderDetail",controller("orderDetail/OrderDetailController"));
  apiRouter.use("/orderlist",controller("orderDetail/OrderlistController"));
  apiRouter.use("/country",controller("country/CountryController"));
  apiRouter.use("/state",controller("state/StateController"));
  // apiRouter.use("/city",controller("city/CityController"));
  
  
  
  router.use("/api", apiRouter);

  router.use(errorHandler);

  return router;
};
