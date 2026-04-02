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
      _id : record.role_id,
      deleted: false
    })
    record.role = role
  }
  res.render("admin/pages/accounts/index", {
    pageTitle: "Danh sách tài khoản",
    records: records
  })
}
//[Create] /admin/accounts/create
module.exports.create = async (req, res) => {
  const role = await roles.find({
    deleted: false,
  });
  res.render("admin/pages/accounts/create", {
    pageTitle: "Tạo tài khoản",
    roles: role
  })
}

//[Post] /admin/accounts/create
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
