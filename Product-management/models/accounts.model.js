const mongoose = require("mongoose");
const generate = require("../helpers/generate")
const accountsSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    passWord: String,
    token: {
      type: String,
      default: generate.generateToken(20)
    },
    phone: String,
    avatar: String,
    role_id: String,
    status:String,
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date
  },
  {
    timestamps: true
  }
);
const Accounts = mongoose.model("Accounts", accountsSchema, "accounts");
// tham số thứ nhất là tên của model
// tham số thứ 2 là cấu trúc document bên trên nó sẽ quyết định file, kiểu dữ liệu
// tham số thứ 3 Đây là tên collection thật trong MongoDB
module.exports = Accounts;