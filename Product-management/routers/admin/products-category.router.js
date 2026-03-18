const express = require("express");
//import thư viện multer để upload ảnh
const multer = require("multer");
const router = express.Router() //tạo các router con
const upload = multer();
const controller = require("../../controller/admin/products-category-controller");
const validates = require("../../validates/admin/products-category.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get('/', controller.index);

router.get('/create', controller.create);

console.log("uploadCloud.upload:", typeof uploadCloud.upload);
console.log("controller.createPost:", typeof controller.createPost);

router.post('/create',
  upload.single("thumbnail"),
  validates.createPost,
  uploadCloud.upload,
  controller.createPost);


module.exports = router;