const Product = require("../../models/products.model");
const productHelper = require("../../helpers/product");
//[GET] /
module.exports.index = async (req, res) => {
  //lấy ra sản phẩm nổi bật
  let find = {
    deleted: false,
    featured: "1",
    status: "active"
  }

  const productFeatured = await Product.find(find)
  const newProducts = productHelper.priceNewProducts(productFeatured)

  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    productFeatured: newProducts
  })
}