const User = require("../../models/users.model");
const Cart = require("../../models/cart.model");
const flash = require("express-flash");
const md5 = require("md5");
const ForgotPassword = require("../../models/forgot-password.model");
const generateHelper = require("../../helpers/generate");
const sendMailHelper = require("../../helpers/sendMail");
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

// [POST] /user/login
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // 1. Kiểm tra tài khoản tồn tại
  const user = await User.findOne({
    email: email,
    deleted: false
  });

  if (!user) {
    req.flash("error", "Email không tồn tại!");
    return res.redirect("back");
  }

  // 2. Kiểm tra mật khẩu
  if (md5(password) !== user.password) {
    req.flash("error", "Mật khẩu không chính xác!");
    return res.redirect("back");
  }

  // 3. Kiểm tra trạng thái hoạt động
  if (user.status === "inactive") {
    req.flash("error", "Tài khoản đã bị khóa!");
    return res.redirect("back");
  }

  // --- LOGIC XỬ LÝ GIỎ HÀNG (QUAN TRỌNG) ---
  const cartIdCookie = req.cookies.cartId;

  // Tìm giỏ hàng chính chủ của User đang đăng nhập (nếu có trong DB)
  const existCartUser = await Cart.findOne({
    user_id: user.id
  });

  if (existCartUser) {
    // TRƯỜNG HỢP A: User đã từng có giỏ hàng trong Database
    const currentCart = await Cart.findOne({ _id: cartIdCookie });

    if (currentCart && currentCart.products.length > 0) {
      /** * CHỈ GỘP nếu giỏ hàng tạm này đang "vô chủ". 
       * Tránh việc ông B login vào đúng trình duyệt ông A vừa logout (mà chưa xóa cookie) 
       * rồi lấy đồ của ông A gộp vào giỏ ông B.
       */
      if (!currentCart.user_id) {
        for (const product of currentCart.products) {
          const existProduct = existCartUser.products.find(
            (item) => item.product_id == product.product_id
          );

          if (existProduct) {
            existProduct.quantity += product.quantity;
          } else {
            existCartUser.products.push(product);
          }
        }
        await existCartUser.save();
        
        // Gộp xong thì xóa giỏ hàng tạm "vô chủ" đi
        await Cart.deleteOne({ _id: cartIdCookie });
      }
    }
    
    // Luôn cập nhật Cookie trình duyệt về ID giỏ hàng chính chủ
    res.cookie("cartId", existCartUser.id);

  } else {
    // TRƯỜNG HỢP B: User này chưa từng có giỏ hàng gắn với ID trong DB
    const currentCart = await Cart.findOne({ _id: cartIdCookie });

    if (currentCart && !currentCart.user_id) {
      // Nếu giỏ hàng hiện tại chưa có chủ -> Gắn tên User này vào làm chủ luôn
      await Cart.updateOne(
        { _id: cartIdCookie },
        { user_id: user.id }
      );
    } else {
      /**
       * Nếu giỏ hiện tại ĐÃ CÓ CHỦ (của người đăng nhập trước đó)
       * hoặc không tồn tại -> Phải tạo mới hoàn toàn để đảm bảo tính riêng tư.
       */
      const newCart = new Cart({
        user_id: user.id,
        products: []
      });
      await newCart.save();
      res.cookie("cartId", newCart.id);
    }
  }
  // ----------------------------------------

  // Lưu token vào cookie để duy trì đăng nhập
  res.cookie("tokenUser", user.tokenUser);

  req.flash("success", `Chào mừng ${user.fullName} quay trở lại!`);
  res.redirect("/");
};

//[GET]/user/logout
module.exports.logout = async (req, res) => {

  res.clearCookie("tokenUser");
  res.clearCookie("cartId");
  res.redirect("/");
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


