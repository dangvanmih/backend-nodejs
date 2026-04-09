const productRouters = require("./product.router");
const homeRouters = require("./home.router");
const categoryMiddleware = require("../../middlewares/client/category.middleware")
const searchRouters = require("./search.router")
module.exports = (app) => {
  app.use(categoryMiddleware.category)
  app.use("/",homeRouters)
  app.use("/products",productRouters) // ở đây Nó gắn tiền tố /products cho toàn bộ route bên trong productRouters.
  app.use("/search",searchRouters)
}

// giải thích phần app.get và app.use:
// app.get: chỉ chạy với 1 router cụ thể như /product
// app.use: chạy với mọi method như get post delete put 