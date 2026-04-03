const accounts = require("../../models/accounts.model");
const systemConfig = require("../../config/system");
const md5 = require("md5");
const flash = require("express-flash");
//[GET] /admin/auth/login
module.exports.login = async (req, res) => {
  if (req.cookies.token) {
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
  }
  else {
    res.render("admin/pages/auth/login", {
      pageTitle: "Đăng nhập",
    })
  }
}
//[POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password

  const user = await accounts.findOne({
    email: email,
    deleted: false
  })

  if (!user) {
    req.flash("error", "Tài khoản hoặc mật khẩu không chính xác!")
    res.redirect(req.get('Referrer') || '/');
    return
  }

  if (md5(password) != user.password) {
    req.flash("error", "Mật khẩu không chính xác!")
    res.redirect(req.get('Referrer') || '/');
    return
  }

  if (user.status == "inactive") {
    req.flash("error", "Tài khoản đã bị khóa!")
    res.redirect(req.get('Referrer') || '/');
    return
  }

  res.cookie("token", user.token);
  res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
}
//[GET] /admin/auth/logout
module.exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
}