//val register
module.exports.register = (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", "Vui lòng nhập Họ tên!");
    res.redirect(req.get('Referrer') || '/');
    return;
  }
  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập Mật khẩu!");
    res.redirect(req.get('Referrer') || '/');
    return;
  }
  if (req.body.password.length < 5) {
    req.flash("error", "Mật khẩu tối thiểu là 5 ký tự!");
    res.redirect(req.get('Referrer') || '/');
    return;
  }
  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập Email!");
    res.redirect(req.get('Referrer') || '/');
    return;
  }
  next();
};

// val login
module.exports.login = (req, res, next) => {

  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập Mật khẩu!");
    res.redirect(req.get('Referrer') || '/');
    return;
  }

  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập Email!");
    res.redirect(req.get('Referrer') || '/');
    return;
  }
  next();
};

//val forgot
module.exports.forgotPassword = (req, res, next) => {

  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập Email!");
    res.redirect(req.get('Referrer') || '/');
    return;
  }
  next();
};


// val resetPassword
module.exports.resetPassword = (req, res, next) => {

  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập mật khẩu!");
    res.redirect(req.get('Referrer') || '/');
    return;
  }

  if (!req.body.confirmPassword) {
    req.flash("error", "Vui lòng xác nhận lại mật khẩu!");
    res.redirect(req.get('Referrer') || '/');
    return;
  }

  if (req.body.confirmPassword != req.body.password ) {
    req.flash("error", "mật khẩu xác thực không trùng khớp!");
    res.redirect(req.get('Referrer') || '/');
    return;
  }
  
  next();
};
