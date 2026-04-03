module.exports.loginPost = (req, res, next) => {
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
