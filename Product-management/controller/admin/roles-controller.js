//[GET] /admin/roles
const systemConfig = require("../../config/system");
const roles = require("../../models/roles.model");
const flash = require("express-flash");
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await roles.find(find)
  res.render("admin/pages/roles/index", {
    pageTitle: "Nhóm quyền ",
    records: records
  })
}

//[GET] /admin/roles/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/roles/create", {
    pageTitle: "Tạo nhóm quyền",
  })
}
//[POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
  try {
    const records = new roles(req.body);
    await records.save()
    req.flash("success", "Tạo mới thành công!");
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  } catch (error) {
    req.flash("error", "Tạo mới không thành công!");
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
}

//[GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id
    let find = {
      deleted: false,
      _id: id
    };
    const records = await roles.findOne(find);

    res.render("admin/pages/roles/edit", {
      pageTitle: "Sửa nhóm quyền",
      records: records
    })
  } catch (error) {
    req.flash("error", "Lỗi, không có bản ghi!");
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }

};

//[PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id
  try {
    await roles.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhật thành công!");

  } catch (error) {
    req.flash("error", "Cập nhật không thành công!");
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
  }

  res.redirect(req.get('Referrer') || '/');

};