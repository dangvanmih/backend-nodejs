const express = require("express");
//import thư viện multer để upload ảnh
const multer = require("multer");
const router = express.Router() //tạo các router con
const storageMulter = require("../../helpers/storageMulter")
const upload = multer({storage: storageMulter()});
const controller = require("../../controller/admin/product-controller")

router.get('/', controller.products);

router.patch('/change-status/:status/:id', controller.changeStatus);

router.patch("/change-multi-status", controller.changeMulti);

router.delete('/delete/:id', controller.deleteItem);

router.get('/create', controller.create);

router.post('/create', upload.single("thumbnail"), controller.createPost);

module.exports = router;