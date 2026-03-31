const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    permission: {
      type: Array,
      default: []
    },
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
const Roles = mongoose.model("Roles", rolesSchema, "roles");
// tham số thứ nhất là tên của model
// tham số thứ 2 là cấu trúc document bên trên nó sẽ quyết định file, kiểu dữ liệu
// tham số thứ 3 Đây là tên collection thật trong MongoDB
module.exports = Roles;