const Chat = require("../../models/chats.model");
const uploadToCloudinary = require("../../helpers/uploadToCloudinary");

module.exports = (io) => {
  io.on('connection', (socket) => {
    // Lấy thông tin từ auth đã gửi từ client
    const userId = socket.handshake.auth.userId;
    const fullName = socket.handshake.auth.fullName;

    socket.on("CLIENT_SEND_MESSAGE", async (data) => {
      // Bây giờ userId và fullName đã có giá trị từ Client gửi sang
      let images = [];
      for (const imageBuffer of data.images) {
        const link = await uploadToCloudinary.uploadToCloudinary(imageBuffer);
        images.push(link);
      }

      const chat = new Chat({
        user_id: userId, // Dùng biến cục bộ này
        content: data.content,
        images: images
      });
      await chat.save();

      io.emit("SERVER_RETURN_MESSAGE", {
        userId: userId,
        fullName: fullName,
        content: data.content,
        images: images,
        createdAt: new Date()
      });
    });

    socket.on("CLIENT_SEND_TYPING", (type) => {
      socket.broadcast.emit("SERVER_RETURN_TYPING", {
        userId: userId,
        fullName: fullName,
        type: type,
      });
    });
  });
};