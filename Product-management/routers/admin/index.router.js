const dashboardRouter = require("./dashboard.router");
const productsRouter = require("./products.router");
const productsCategoryRouter = require("./products-category.router");
const systemConfig = require("../../config/system");
module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  
  app.use(`${PATH_ADMIN}/dashboard`,dashboardRouter);
  app.use(`${PATH_ADMIN}/products`, productsRouter)
  app.use(`${PATH_ADMIN}/products-category`,productsCategoryRouter);
}