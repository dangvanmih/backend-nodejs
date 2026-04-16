const mongoose = require("mongoose");
const generate = require("../helpers/generate")
const settingGeneralSchema = new mongoose.Schema(
  {
    websiteName: String,
    logo: String,
    phone: String,
    email: String,
    address: String,
    copyright: String
  },
  {
    timestamps: true
  }
);
const settingGeneral = mongoose.model("settingGeneral", settingGeneralSchema, "setting-general");
// tham số thứ nhất là tên của model
// tham số thứ 2 là cấu trúc document bên trên nó sẽ quyết định file, kiểu dữ liệu
// tham số thứ 3 Đây là tên collection thật trong MongoDB
module.exports = settingGeneral;