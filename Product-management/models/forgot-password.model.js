const mongoose = require("mongoose");
const forgotPaswordSchema = new mongoose.Schema(
  {
    email: String,
    otp: String,
    expireAt: {
      type: Date,
      expires: 0 
    }
  },
  {
    timestamps: true
  }
);
const forgotPassword = mongoose.model("forgotPassword", forgotPaswordSchema, "forgot-password");
// tham số thứ nhất là tên của model
// tham số thứ 2 là cấu trúc document bên trên nó sẽ quyết định file, kiểu dữ liệu
// tham số thứ 3 Đây là tên collection thật trong MongoDB
module.exports = forgotPassword;