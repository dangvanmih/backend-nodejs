const productRouters = require("./product.router");
const homeRouters = require("./home.router");
const categoryMiddleware = require("../../middlewares/client/category.middleware")
const searchRouters = require("./search.router")
const cartMiddleware = require("../../middlewares/client/cart.middleware")
const cartRouters = require("./cart.router")
const checkoutRouter = require("./checkout.router")
const userRouter = require("./user.router")
const userMiddleware = require("../../middlewares/client/user.middleware")
module.exports = (app) => {
  app.use(categoryMiddleware.category)
  app.use(cartMiddleware.cartId)
  app.use(userMiddleware.infoUser)
  app.use("/", homeRouters)
  app.use("/products", productRouters) // ở đây Nó gắn tiền tố /products cho toàn bộ route bên trong productRouters.
  app.use("/search", searchRouters)
  app.use("/cart", cartRouters)
  app.use("/checkout", checkoutRouter)
  app.use("/user", userRouter)
}

// giải thích phần app.get và app.use:
// app.get: chỉ chạy với 1 router cụ thể như /product
// app.use: chạy với mọi method như get post delete put 