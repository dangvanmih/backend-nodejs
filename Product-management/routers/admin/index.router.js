const dashboardRouter = require("./dashboard.router");
const authMiddleware = require("../../middlewares/admin/auth.middleware")
const productsRouter = require("./products.router");
const rolesRourter = require("./roles.router")
const productsCategoryRouter = require("./products-category.router");
const systemConfig = require("../../config/system");
const accountsRouter = require("./accounts.router")
const authRouter = require("./auth.router");
const myAccountRouter = require("./myAccount.router")
module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.use(`${PATH_ADMIN}/dashboard`,
    authMiddleware.requireAuth,
    dashboardRouter);

  app.use(`${PATH_ADMIN}/products`,
    authMiddleware.requireAuth,
    productsRouter);

  app.use(`${PATH_ADMIN}/products-category`,
    authMiddleware.requireAuth,
    productsCategoryRouter);

  app.use(`${PATH_ADMIN}/roles`,
    authMiddleware.requireAuth,
    rolesRourter);

  app.use(`${PATH_ADMIN}/accounts`,
    authMiddleware.requireAuth,
    accountsRouter);

  app.use(`${PATH_ADMIN}/auth`, authRouter);

  app.use(`${PATH_ADMIN}/my-account`,
    authMiddleware.requireAuth,
    myAccountRouter);
}