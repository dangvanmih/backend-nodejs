// khi tách validates ra 1 folder riêng để thuận tiện cho việc tái xử dụng và bảo trì
module.exports.createPost = (req, res, next) => {
  if (!req.body.title) {
    req.flash("error", "Vui lòng nhập tiêu đề!");
    res.redirect(req.get('Referrer') || '/'); // Referrer: quay lại trang vừa submit form hoặc quay về trang /
    return;
  }
  next();
}
