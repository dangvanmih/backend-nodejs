const systemConfig = require("../../config/system");
const accounts = require("../../models/accounts.model");
const roles = require("../../models/roles.model");
module.exports.requireAuth = async (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  }
  else {
    const user = await accounts.findOne({
      token: token
    }).select("-password");
    if (!user) {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    }
    else {
      const role = await roles.findOne({
        _id:user.role_id
      }).select("title permission")
      
      res.locals.user = user
      res.locals.role = role
      next();
    }
  }
}
// 54:04