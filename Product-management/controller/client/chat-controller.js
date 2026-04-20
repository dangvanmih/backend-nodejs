const Chat = require("../../models/chats.model");
const User = require("../../models/users.model");

module.exports.index = async (req, res) => {
  const chats = await Chat.find({ deleted: false });
  
  for (const chat of chats) {
    const infoUser = await User.findOne({ _id: chat.user_id }).select("fullName");
    chat.infoUser = infoUser;
  }
  
  res.render("client/pages/chat/index", {
    pageTitle: "Chat",
    chats: chats
  });
}