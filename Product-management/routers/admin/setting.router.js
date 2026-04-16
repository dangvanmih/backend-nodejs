const express = require("express");
const router = express.Router() //tạo các router con
const controller = require("../../controller/admin/setting-controller")
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

  router.get('/general', controller.general);
  router.patch('/general',
    upload.single("logo"),
    uploadCloud.upload,
    controller.generalPatch
  );
module.exports = router;