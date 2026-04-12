const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // user_id: String,
    cart_id: String,
    userInfo: {
      fullName: String,
      phone: String,
      address: String
    },
    products: [
      {
        product_id: String,
        quantity: Number,
        price:  Number,
        discountPercentage: Number
      }
    ]
  },
  {
    timestamps: true
  }

);
const Order = mongoose.model("Order", orderSchema, "orders");
// tham số thứ nhất là tên của model
// tham số thứ 2 là cấu trúc document bên trên nó sẽ quyết định file, kiểu dữ liệu
// tham số thứ 3 Đây là tên collection thật trong MongoDB
module.exports = Order;