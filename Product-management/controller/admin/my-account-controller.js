const md5 = require("md5");
const accounts = require("../../models/accounts.model");
//[GET] /admin/my-account
module.exports.index = async (req, res) => {
  res.render("admin/pages/my-account/index", {
    pageTitle: "Thông tin cá nhân",
  })
}
// [GET] /admin/my-account/edit
module.exports.edit = async (req, res) => {
  res.render("admin/pages/my-account/edit", {
    pageTitle: "Chỉnh sửa thông tin cá nhân",
  })
}

// [GET] /admin/my-account/editPatch
module.exports.editPatch = async (req, res) => {
const id = res.locals.user.id
  const emailExist = await accounts.findOne({
    email: req.body.email,
    _id: {$ne: id}, // tìm bản ghi có ID khác ID đang sửa
    deleted: false,
  })
  try {
    if (emailExist) {
      req.flash("error", "Email đã tồn tại!");
      res.redirect(req.get('Referrer') || '/');
    }
    else {
      if (req.body.password) {
        req.body.password = md5(req.body.password);
      }
      else {
        delete req.body.password
      }
    }
    await accounts.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhật thành công!");

  } catch (error) {
    req.flash("error", "Cập nhật không thành công!");
    res.redirect(req.get('Referrer') || '/');
  }

  res.redirect(req.get('Referrer') || '/');
}