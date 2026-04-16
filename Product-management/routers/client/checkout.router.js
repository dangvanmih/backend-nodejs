const express = require("express");
const router = express.Router() //tạo các router con
const controller = require("../../controller/client/checkout-controller")
const middleware = require("../../middlewares/client/auth.middleware")
router.get("/", controller.index);

router.post("/order", controller.order);

router.post("/buy-now/:productId",middleware.requireAuth, controller.buyNow);

router.get("/success/:orderId", controller.success);

module.exports = router;