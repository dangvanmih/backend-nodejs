const systemConfig = require("../../config/system");
const accounts = require("../../models/accounts.model");
const roles = require("../../models/roles.model");
const md5 = require("md5");
const flash = require("express-flash");
//[GET] /admin/accounts
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  }
  const records = await accounts.find(find).select("-password -token");
  for (const record of records) {
    const role = await roles.findOne({
      _id: record.role_id,
      deleted: false
    })
    record.role = role
  }
  res.render("admin/pages/accounts/index", {
    pageTitle: "Danh sách tài khoản",
    records: records
  })
}
//[CREATE] /admin/accounts/create
module.exports.create = async (req, res) => {
  const role = await roles.find({
    deleted: false,
  });
  res.render("admin/pages/accounts/create", {
    pageTitle: "Tạo tài khoản",
    roles: role
  })
}

//[POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
  try {
    const emailExist = await accounts.findOne({
      email: req.body.email,
      deleted: false,
    })
    if (emailExist) {
      req.flash("error", "Email đã tồn tại!");
      res.redirect(req.get('Referrer') || '/');
    }

    else {
      req.body.password = md5(req.body.password)

      const records = new accounts(req.body);
      await records.save();
      req.flash("success", "Tạo mới thành công!");
      res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }

  } catch (error) {
    req.flash("error", "Tạo mới không thành công!");
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }

}

//[GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
  let find = {
    deleted: false,
    _id: req.params.id
  };
  try {
    const data = await accounts.findOne(find)
    const role = await roles.find({
      deleted: false
    });
    console.log(data);

    res.render("admin/pages/accounts/edit", {
      pageTitle: "Chỉnh sửa tài khoản",
      data: data,
      roles: role
    })
  } catch (error) {
    req.flash("error", "Lỗi! không tìm thấy bản ghi");
    res.redirect(req.get('Referrer') || '/');
  }
}

//[PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id
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
    res.redirect(`${systemConfig.prefixAdmin}/accounts`)
  }

  res.redirect(req.get('Referrer') || '/');
};
