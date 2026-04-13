// khi tách validates ra 1 folder riêng để thuận tiện cho việc tái xử dụng và bảo trì
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


module.exports.forgotPassword = (req, res, next) => {

  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập Email!");
    res.redirect(req.get('Referrer') || '/'); 
    return;
  }
  next();
};
