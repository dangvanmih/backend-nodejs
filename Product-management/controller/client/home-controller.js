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
  const newProducts = productFeatured.map(item => {
    item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(2); // thêm thuộc tính giá mới trực tiếp vào object gốc
    return item;
  });
  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    productFeatured: newProducts
  })
}