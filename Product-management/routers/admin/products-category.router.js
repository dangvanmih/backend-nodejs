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

router.post('/create',
  upload.single("thumbnail"),
  validates.createPost,
  uploadCloud.upload,
  controller.createPost);

router.patch('/change-status/:status/:id', controller.changeStatus);

router.patch('/change-multi-status', controller.changeMulti);

module.exports = router;