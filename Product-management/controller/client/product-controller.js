const Product = require("../../models/products.model");
const productCategory = require("../../models/products-category.model");
const productHelper = require("../../helpers/product");
//[GET] /products
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false
  }).sort({ position: "desc" });

  const newProducts = productHelper.priceNewProducts(products)

  // console.log(newProducts);

  res.render("client/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: newProducts // sau đó gán lại mảng mới thay vì mảng cũ ban đầu là products
  });
};

//[GET] /products/:slug
module.exports.detail = async (req, res) => {

  try {
    const find = {
      deleted: false,
      slug: req.params.slug,
      status: "active"
    };

    const product = await Product.findOne(find);

    res.render("client/pages/products/detail", {
      pageTitle: product.title,
      product: product
    });
  }
  catch (error) {
    res.redirect(`/products`)
  }
};

//[GET] /products/:slugCategory
module.exports.category = async (req, res) => {
  try {
    const category = await productCategory.findOne({
      slug: req.params.slugCategory,
      deleted: false
    });
    const products = await Product.find(
      {
        deleted: false,
        status: "active",
        products_category_id: category.id
      }
    ).sort({ position: "desc" });
    const newProducts = productHelper.priceNewProducts(products)
    res.render("client/pages/products/index", {
      pageTitle: "Danh sách sản phẩm",
      products: newProducts
    });
  } catch (error) {
    res.redirect(req.get("Referer") || "/");
  }
};
// 59:08