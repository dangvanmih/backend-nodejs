const express = require("express");
//import thư viện multer để upload ảnh
const multer = require("multer");
const router = express.Router() //tạo các router con
const storageMulter = require("../../helpers/storageMulter")
const upload = multer({storage: storageMulter()});
const controller = require("../../controller/admin/product-controller")
const validates = require("../../validates/admin/product.validate")
router.get('/', controller.products);

router.patch('/change-status/:status/:id', controller.changeStatus);

router.patch("/change-multi-status", controller.changeMulti);

router.delete('/delete/:id', controller.deleteItem);

router.get('/create', controller.create);

router.post('/create', upload.single("thumbnail"), 
validates.createPost, // đây sẽ là middleware khi mà phần bên trên gửi yêu cầu, thì hàm này sẽ check nếu có thì mới cho đi tiếp xuống bên dưới
controller.createPost);

router.get('/edit/:id', controller.edit);

router.patch('/edit/:id',
  upload.single("thumbnail"), 
  validates.createPost,
  controller.editPatch
);

router.get('/detail/:id', controller.detail);
module.exports = router;