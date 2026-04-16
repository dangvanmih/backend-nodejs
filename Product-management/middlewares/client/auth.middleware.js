const User = require("../../models/users.model")
module.exports.requireAuth = async (req, res, next) => {
  const tokenUser = req.cookies.tokenUser
  if (!tokenUser) {
    return res.redirect(`/user/login`);
  }

  const user = await User.findOne({
    tokenUser: tokenUser,
    deleted: false,
    status: "active"
  }).select("-password");
  
  if (!user) {
    return res.redirect(`/user/login`);
  }

  next();
}