const Product = require("../../models/products.model");
const productHelper = require("../../helpers/product")
//[GET]
module.exports.index = async (req, res) => {
  const keyword = req.query.keyword

  let newProducts = []

  if(keyword) {
    const keywordRegex = new RegExp(keyword,"i")

    const products = await Product.find({
      title: keywordRegex,
      deleted: false,
      status: "active"
    });

    newProducts = productHelper.priceNewProducts(products);
  }

  res.render("client/pages/search/index", {
    pageTitle: "Kết quả tìm kiếm",
    keyword: keyword,
    products: newProducts
  })
}