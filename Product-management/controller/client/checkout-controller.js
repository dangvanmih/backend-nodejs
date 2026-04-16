const Cart = require("../../models/cart.model");
const Product = require("../../models/products.model");
const productHelper = require("../../helpers/product");
const flash = require("express-flash");
const Order = require("../../models/order.model");

//[GET]/checkout/
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;

  const cart = await Cart.findOne({
    _id: cartId
  });

  if (cart.products.length > 0) {
    for (const item of cart.products) {
      const productId = item.product_id;

      const productInfo = await Product.findOne({
        _id: productId
      })
      productInfo.priceNew = productHelper.priceNewProduct(productInfo);

      item.productInfo = productInfo;

      item.totalPrice = item.quantity * productInfo.priceNew;
    }
  }

  cart.totalPriceProducts = cart.products.reduce((sum, item) => sum + item.totalPrice, 0)

  res.render("client/pages/checkout/index", {
    pageTitle: "Đặt hàng",
    cartDetail: cart
  })
};

// [POST] /checkout/buy-now/:productId
module.exports.buyNow = async (req, res) => {
  const productId = req.params.productId;
  const quantity = parseInt(req.body.quantity) || 1;

  const productInfo = await Product.findOne({ _id: productId, deleted: false });
  productInfo.priceNew = productHelper.priceNewProduct(productInfo);

  const fakeCart = {
    products: [{
      product_id: productId,
      quantity: quantity,
      productInfo: productInfo,
      totalPrice: quantity * productInfo.priceNew
    }],
    totalPriceProducts: quantity * productInfo.priceNew,
    isBuyNow: true // Đánh dấu để trang Checkout biết đây là mua ngay
  };

  res.render("client/pages/checkout/index", {
    pageTitle: "Thanh toán ngay",
    cartDetail: fakeCart
  });
};

// [POST] /checkout/order
module.exports.order = async (req, res) => {
  const cartId = req.cookies.cartId;
  const { fullName, phone, address, note, buyNowProductId, buyNowQuantity } = req.body;

  let products = [];

  // TRƯỜNG HỢP 1: MUA NGAY (Chỉ có 1 sản phẩm)
  if (buyNowProductId) {

    const productInfo = await Product.findOne({ _id: buyNowProductId });

    if (productInfo) {

      const quantity = parseInt(buyNowQuantity);

      // KIỂM TRA KHO
      if (productInfo.stock < quantity) {
        req.flash("error", `Sản phẩm ${productInfo.title} chỉ còn ${productInfo.stock} sản phẩm!`);
        return res.redirect("back");
      }

      products.push({
        product_id: buyNowProductId,
        quantity: parseInt(buyNowQuantity),
        price: productInfo.price,
        discountPercentage: productInfo.discountPercentage
      });

      // TRỪ KHO
      await Product.updateOne({ _id: buyNowProductId }, { $inc: { stock: -quantity } });
    }
  }
  // TRƯỜNG HỢP 2: MUA TỪ GIỎ HÀNG (Lấy toàn bộ sản phẩm trong Cart)
  else {
    const cart = await Cart.findOne({ _id: cartId });
    if (cart && cart.products.length > 0) {
      for (const product of cart.products) {
        const productInfo = await Product.findOne({ _id: product.product_id });

        // KIỂM TRA KHO TỪNG MÓN
        if (productInfo.stock < product.quantity) {
          req.flash("error", `Sản phẩm ${productInfo.title} không đủ số lượng trong kho!`);
          return res.redirect("back");
        }

        products.push({
          product_id: product.product_id,
          quantity: product.quantity,
          price: productInfo.price,
          discountPercentage: productInfo.discountPercentage
        });

        // TRỪ KHO TỪNG MÓN
        await Product.updateOne({ _id: product.product_id }, { $inc: { stock: -product.quantity } });
      }
    }
  }

  // Nếu không có sản phẩm nào thì không cho đặt hàng
  if (products.length === 0) {
    req.flash("error", "vui lòng thêm sản phẩm trước khi đặt hàng!")
    return res.redirect("/products");
  }

  // Tạo object đơn hàng
  const objectOrder = {
    cart_id: cartId,
    userInfo: { fullName, phone, address, note },
    products: products
  };

  const order = new Order(objectOrder);
  await order.save();

  // CHỈ XÓA GIỎ HÀNG NẾU LÀ MUA TỪ GIỎ HÀNG (Trường hợp 2)
  if (!buyNowProductId) {
    await Cart.updateOne({ _id: cartId }, { products: [] });
  }
  res.redirect(`/checkout/success/${order.id}`);
};



//[GET]/checkout/success/:id
module.exports.success = async (req, res) => {
  const orderId = req.params.orderId

  const order = await Order.findOne({
    _id: orderId,
  });

  for (const product of order.products) {
    const productInfo = await Product.findOne({
      _id: product.product_id
    }).select(" title thumbnail");
    product.productInfo = productInfo

    product.priceNew = productHelper.priceNewProduct(product);

    product.totalPrice = product.priceNew * product.quantity;
  }
  order.totalPrice = order.products.reduce((sum, item) => sum + item.totalPrice, 0)

  res.render("client/pages/checkout/success", {
    pageTitle: "Đặt hàng thành công!",
    order: order
  })
}