const ProductsCategory = require("../../models/products-category.model");
const createTreeHelper = require("../../helpers/createTree");
module.exports.category = async (req, res, next) => {
  let find = {
    deleted: false,
  }
  const  productCategorys = await ProductsCategory.find(find);
  const newProductsCategory = createTreeHelper.createTree(productCategorys);

  res.locals.layoutProductsCategory = newProductsCategory;
  
  next()
};