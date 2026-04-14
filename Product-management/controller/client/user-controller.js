const User = require("../../models/users.model")
const Cart = require("../../models/cart.model")
const flash = require("express-flash");
const md5 = require("md5");
const ForgotPassword = require("../../models/forgot-password.model");
const generateHelper = require("../../helpers/generate");
const sendMailHelper = require("../../helpers/sendMail")
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

//[GET]/user/login
module.exports.login = async (req, res) => {

  res.render("client/pages/user/login", {
    pageTitle: "Đăng nhập"
  })
};

//[POST]/user/login
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({
    email: email,
    deleted: false
  });

  if (!user) {
    req.flash("error", "Email không tồn tại!");
    return res.redirect("back");
  };

  if (md5(password) != user.password) {
    req.flash("error", "Mật khẩu không chính xác!");
    return res.redirect("back");
  };

  if (user.status == "inactive") {
    req.flash("error", "Tài khoản đã bị khóa!");
    return res.redirect("back");
  };

  // --- LOGIC XỬ LÝ GIỎ HÀNG ---
  const cartIdCookie = req.cookies.cartId; // Giỏ hàng tạm từ trình duyệt

  // 1. Tìm giỏ hàng "chính chủ" của User trong DB (nếu có)
  const existCartUser = await Cart.findOne({
    user_id: user.id
  });

  if (existCartUser) {
    // TRƯỜNG HỢP A: User này đã từng có giỏ hàng trong DB
    // Ta lấy giỏ hàng tạm (Cookie) gộp vào giỏ hàng chính (DB)
    const currentCart = await Cart.findOne({ _id: cartIdCookie });

    if (currentCart && currentCart.products.length > 0) {
      for (const product of currentCart.products) {
        // Kiểm tra xem sản phẩm trong giỏ tạm đã có trong giỏ chính chưa
        const existProduct = existCartUser.products.find(item => item.product_id == product.product_id);

        if (existProduct) {
          // Nếu có rồi thì cộng dồn số lượng
          existProduct.quantity += product.quantity;
        } else {
          // Nếu chưa có thì thêm mới vào mảng products
          existCartUser.products.push(product);
        }
      }
      // Lưu giỏ hàng chính sau khi gộp
      await existCartUser.save();

      // Xóa giỏ hàng tạm vì đã gộp xong
      await Cart.deleteOne({ _id: cartIdCookie });
    }

    // Luôn cập nhật Cookie về ID giỏ hàng chính chủ
    res.cookie("cartId", existCartUser.id);

  } else {
    // TRƯỜNG HỢP B: User này chưa có giỏ hàng nào trong DB
    // Chỉ cần gán user_id vào giỏ hàng hiện tại
    await Cart.updateOne(
      { _id: cartIdCookie },
      { user_id: user.id }
    );
  }
  // ----------------------------

  res.cookie("tokenUser", user.tokenUser);
  
  res.redirect("/");
};

//[GET]/user/logout
module.exports.logout = async (req, res) => {

  res.clearCookie("tokenUser");

  res.redirect("/")
};

//[GET]/user/password/forgot
module.exports.forgotPassword = async (req, res) => {
  res.render("client/pages/user/forgot-password", {
    pageTitle: "Quên mật khẩu"
  })
};

//[POST]/user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
  const emailUser = req.body.email;
  const email = await User.findOne({
    email: req.body.email,
    deleted: false
  })
  if (!email) {
    req.flash("error", "Email không tồn tại!");
    res.redirect(req.get('Referrer') || '/');
    return;
  }
  const otp = generateHelper.generateNumber(5);
  const objectForgotPassword = {
    email: req.body.email,
    otp: otp,
    expireAt: new Date(Date.now() + 3 * 60 * 1000)
  }


  const forgotPassword = new ForgotPassword(objectForgotPassword);
  await forgotPassword.save()

  //gửi otp về mail:
  const subject = `Mã OTP xác minh lấy lại mật khẩu`;
  const html = `Mã OTP xác minh lấy lại mật khẩu là <b>${otp}</b>, mã sẽ hết hạn sau 3 phút. Lưu ý không chia sẻ mã cho bất kỳ ai. `;
  sendMailHelper.sendMail(emailUser, subject, html)

  res.redirect(`/user/password/otp?email=${emailUser}`)

};

//[GET]/user/password/otp
module.exports.otpPassword = async (req, res) => {
  const email = req.query.email

  res.render("client/pages/user/otp-password", {
    pageTitle: "Nhập mã OTP",
    email: email
  })
};

//[POST]/user/password/otp
module.exports.otpPasswordPost = async (req, res) => {

  const email = req.body.email
  const otp = req.body.otp

  const forgotPassword = await ForgotPassword.findOne({
    email: email,
    otp: otp,
  })


  if (!forgotPassword) {
    req.flash("error", "Mã OTP không hợp lệ!")
    res.redirect(req.get('Referrer') || '/');
    return;
  }
  const user = await User.findOne({
    email: email
  })
  res.cookie("tokenUser", user.tokenUser);

  res.redirect(`/user/password/reset`)

};


//[GET]/user/password/reset
module.exports.resetPassword = async (req, res) => {

  res.render("client/pages/user/reset-password", {
    pageTitle: "Đổi mật khẩu",
  })
};

//[POST]/user/password/reset
module.exports.resetPasswordPost = async (req, res) => {

  const password = req.body.password;
  const tokenUser = req.cookies.tokenUser;

  await User.updateOne({
    toke: tokenUser,
    password: md5(password)
  })


  req.flash("success", "Đổi mật khẩu thành công");

  res.redirect("/")
};

//[GET]/user/infoUser
module.exports.infoUser = async (req, res) => {

  res.render("client/pages/user/infoUser", {
    pageTitle: "Thông tin tài khoản"
  })
}
