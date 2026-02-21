const productRouters = require("./product.router")
const homeRouters = require("./home.router")
module.exports = (app) => {
  app.use("/",homeRouters)
  app.use("/products", productRouters) // ở đây Nó gắn tiền tố /products cho toàn bộ route bên trong productRouters.
}

// giải thích phần app.get và app.use:
// app.get: chỉ chạy với 1 router cụ thể như /product
// app.use: chạy với mọi method như get post delete put 