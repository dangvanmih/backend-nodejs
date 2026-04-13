const User = require("../../models/users.model")
const flash = require("express-flash");
const md5 = require("md5");
//[GET]/user/register
module.exports.register = async (req, res) => {

  res.render("client/pages/user/register", {
    pageTitle: "Đăng ký tài khoản"
  })
}

//[POST]/user/register
module.exports.registerPost = async (req, res) => {

  const exitEmail = await User.findOne({
    email: req.body.email,
    deleted: false,
  })

  if (exitEmail) {
    req.flash("error", "Email đã tồn tại!")
    res.redirect(req.get('Referrer') || '/');
    return
  }

  req.body.password = md5(req.body.password);
  const user = new User(req.body);
  await user.save();

  res.cookie("tokenUser", user.tokenUser); // khi đăng ký thành công, chuyển sang trang chủ mà ko cần phải đăng nhập lại nữa

  res.redirect("/")
}