const productsCategory = require("../../models/products-category.model");
const systemConfig = require("../../config/system");
const filterStatusHelper = require("../../helpers/filterStatus");
const seacrhHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination")

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
    const objectSearch = seacrhHelper(req.query);

    if (objectSearch.regex) {
      find.title = objectSearch.regex;
    }
    //End-tìm kiếm
    // sort 
    let sort = {}
    if (req.query.sortKey && req.query.sortValue) {
      sort[req.query.sortKey] = req.query.sortValue; //key của object được lấy từ một string (biến) nên phải dùng ngoặc vuông
    }
    else {
      sort.position = "desc"
    }
    // end-sort

    //Phân trang
    const countProducts = await productsCategory.countDocuments(find); // countDocuments là hàm đếm của mongoose

    let objectPagination = paginationHelper(
      {
        limitItems: 4,
        currentPage: 1
      },
      req.query,
      countProducts

    );
    //hết phân trang
    const records = await productsCategory.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip).sort(sort)

    res.render("admin/pages/productCategory/index", {
      pageTitle: "Trang danh mục sản phẩm",
      records: records,
      fillterStatus: fillterStatus,
      keyword: objectSearch.keyword,
      pagination: objectPagination,
    });
  }
  catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
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

//[PATCH] /admin/products-category/change-multi-status
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", "); //convert lại sang dạng mảng

  switch (type) {
    case "active":
      await productsCategory.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
      break;
    case "inactive":
      await productsCategory.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
      break;
    case "delete-all":
      await productsCategory.updateMany({ _id: { $in: ids } }, { deleted: true, deletedAt: new Date() });
      req.flash("success", `Xóa thành công ${ids.length} sản phẩm!`);
      break
    case "change-position":
      for (const item of ids) {   // không dùng forEach vì forEach không chờ await
        let [id, position] = item.split("-");
        position = parseInt(position);
        // console.log(id);
        // console.log(position);
        await productsCategory.updateOne({ _id: id }, { position: position });

      }
      req.flash("success", `Thay đổi vị trí thành công ${ids.length} sản phẩm!`);
      break
    default:
      break;
  }

  res.redirect(req.get("Referer") || "/admin/products-category")
};

//[DELETE] /admin/products-category/delete
module.exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    // await Product.deleteOne({ _id: id }); // xóa vĩnh viễn
    await productsCategory.updateOne({ _id: id }, { deleted: true, deletedAt: new Date() });
    req.flash("success", "Xóa danh mục thành công!");
    res.redirect(req.get("Referer") || "/admin/products-category");
  } catch (error) {
      req.flash("error", "Xóa danh mục không thành công!");
      res.redirect(req.get("Referer") || "/admin/products-category")
  }
};

//[GET] /admin/products-category/edit
module.exports.editCategory = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id
    };

    const records = await productsCategory.findOne(find); // sửa 1 sản phẩm thì dùng findOne để trả ra 1 object còn hàm find thì trả ra 1 mảng chứa các object

    res.render("admin/pages/productCategory/edit", {
      pageTitle: "Sửa sản phẩm",
      productsCategory: records
    });
  }
  catch (error) {
    flash
    res.redirect(`${systemConfig.prefixAdmin}/products`)
  }
};

//[PATCH] /admin/products-category/edit
module.exports.editPost = async (req, res) => {
  const id = req.params.id;
  req.body.position = parseInt(req.body.position);
 
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }
  try {
    await productsCategory.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhật sản phẩm thành công!");

  } catch (error) {
    req.flash("error", "Cập nhật sản phẩm không thành công!");
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
  }

  res.redirect(req.get('Referrer') || '/');
};