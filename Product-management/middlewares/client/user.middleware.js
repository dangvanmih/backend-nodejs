const User = require("../../models/users.model")
const Chat =  require("../../models/chats.model")
module.exports.infoUser = async (req, res, next) => {

  if (req.cookies.tokenUser) {
    const user = await User.findOne({
      tokenUser: req.cookies.tokenUser,
      deleted: false
    }).select("-password")

    if (user) {
      res.locals.user = user;

    }
  }
  next()
}


module.exports.layoutChats = async (req, res, next) => {
  if (res.locals.user) {
    const chats = await Chat.find({ deleted: false }).populate("user_id", "fullName");
    res.locals.layoutChats = chats;
  };
  next();
}