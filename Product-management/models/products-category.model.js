const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");


mongoose.plugin(slug)


const productCategorySchema = new mongoose.Schema(
  {
    title: String,
    parent_id:{
      type: String,
      default: ""
    },
    description: String,
    thumbnail:String,
    status: String,
    position: Number,
    slug: {
      type: String,
      slug: "title",
      unique: true
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
const ProductsCategory = mongoose.model("ProductsCategory", productCategorySchema, "products-category"); 
// tham số thứ nhất là tên của model
// tham số thứ 2 là cấu trúc document bên trên nó sẽ quyết định file, kiểu dữ liệu
// tham số thứ 3 Đây là tên collection thật trong MongoDB
module.exports = ProductsCategory;