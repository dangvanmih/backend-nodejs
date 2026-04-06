const Product = require("../../models/products.model");
//[GET] /
module.exports.index = async (req, res) => {
  //lấy ra sản phẩm nổi bật
  let find = {
    deleted: false,
    featured: "1",
    status: "active"
  }
  const productFeatured = await Product.find(find)

  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    productFeatured: productFeatured
  })
}