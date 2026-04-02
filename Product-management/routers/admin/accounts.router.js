const express = require("express");
const multer = require("multer");
const upload = multer();
const validates = require("../../validates/admin/accounts.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const router = express.Router() //tạo các router con
const controller = require("../../controller/admin/accounts-controller")
router.get('/', controller.index);
router.get('/create', controller.create);
router.post('/create', upload.single("avatar"),
  validates.createPost,
  uploadCloud.upload,
  controller.createPost);
module.exports = router;