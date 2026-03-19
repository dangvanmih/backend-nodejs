const express = require("express");
//import thư viện multer để upload ảnh
const multer = require("multer");
const router = express.Router() //tạo các router con
const upload = multer();
const controller = require("../../controller/admin/product-controller");
const validates = require("../../validates/admin/product.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
router.get('/', controller.products);

router.patch('/change-status/:status/:id', controller.changeStatus);

router.patch("/change-multi-status", controller.changeMulti);

router.delete('/delete/:id', controller.deleteItem);

router.get('/create', controller.create);

router.post('/create', upload.single("thumbnail"),
  validates.createPost,
  uploadCloud.upload,
  controller.createPost);

router.get('/edit/:id', controller.edit);

router.patch('/edit/:id',
  upload.single("thumbnail"),
  uploadCloud.upload,
  validates.createPost,
  controller.editPatch
);

router.get('/detail/:id', controller.detail);

module.exports = router;