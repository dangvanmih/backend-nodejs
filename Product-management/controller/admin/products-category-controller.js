const productsCategory = require("../../models/products-category.model");
const systemConfig = require("../../config/system");
//[GET] /admin/products-category
module.exports.index = async (req, res) => {
  try {
    let find = {
      deleted: false,
    };

    const records = await productsCategory.find(find);

    res.render("admin/pages/productCategory/index", {
      pageTitle: "Trang danh mục sản phẩm",
      records: records
    });
  }
  catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`)
  }
};

//[GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/productCategory/create", {
    pageTitle: "Tạo danh mục sản phẩm",
  });
};

//[POST] /admin/products-category/createPost
module.exports.createPost = async (req, res) => {
  if (req.body.position === "") {
    const count = await productsCategory.countDocuments();
    req.body.position = count + 1;
  }
  else {
    req.body.position = parseInt(req.body.position);
  }
  const record = new productsCategory(req.body); //tạo mới 1 sản phẩm nhưng chưa lưu vào database
  await record.save()

  req.flash("success", "Thêm Danh mục thành công!");
  res.redirect(`${systemConfig.prefixAdmin}/products-category`);
};
