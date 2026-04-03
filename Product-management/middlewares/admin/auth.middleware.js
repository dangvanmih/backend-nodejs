const systemConfig = require("../../config/system");
const accounts = require("../../models/accounts.model");
module.exports.requireAuth = async (req, res, next) => {
  console.log(req.cookies.token);
  const token = req.cookies.token
  if (!token) {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  }
  else {
    const user = await accounts.findOne({
      token: token
    });
    if (!user) {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    }
    else {
      next();
    }
  }
}