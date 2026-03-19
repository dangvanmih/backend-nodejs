const productsCategory = require("../../models/products-category.model");
const systemConfig = require("../../config/system");
const filterStatusHelper = require("../../helpers/filterStatus");

//[GET] /admin/products-category
module.exports.index = async (req, res) => {
  try {
    const fillterStatus = filterStatusHelper(req.query);
    let find = {
      deleted: false,
    };

    //bộ lọc
    if (req.query.status) {
      find.status = req.query.status
    }
    //End-bộ lọc

    //tìm kiếm
    const records = await productsCategory.find(find);    
    res.render("admin/pages/productCategory/index", {
      pageTitle: "Trang danh mục sản phẩm",
      records: records,
      fillterStatus:fillterStatus
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

//[PATCH] /admin/products-category/change-status
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await productsCategory.updateOne({ _id: id }, { status: status }); // hàm update của mongoose và các tham số bên trong là các key trong database được gán lại giá trị mới

  req.flash("success", "Cập nhật trạng thái thành công!");
  // hàm redirect của express điều hướng sang trang khác và điều kiện bên trong là(nếu có trang trước thì quay về trang trước còn không thì về trang /admin/products)
  res.redirect(req.get("Referer") || "/admin/products-category");
};
