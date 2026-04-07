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
  const productFeatured = await Product.find(find).limit(8)
  const products = productHelper.priceNewProducts(productFeatured)
  //hết lấy ra sản phẩm nổi bật

  // lấy ra sản phẩm mới nhất
  const newProducts = await Product.find({
    deleted: false,
    status: "active",
  }).sort({ position: "desc" }).limit(8)
  const latestProducts = productHelper.priceNewProducts(newProducts)
  // hết lấy ra sản phẩm

  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    productFeatured: products,
    newProducts: latestProducts
  })
}