const User = require("../../models/users.model")
module.exports.requireAuth = async (req, res, next) => {
  const tokenUser = req.cookies.tokenUser
  if (!tokenUser) {
    res.redirect(`/user/login`);
  }

  const user = await User.findOne({tokenUser: tokenUser}).select("-password");
  if (!user) {
    res.redirect(`/user/login`);
  }

  next();
}