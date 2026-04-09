const Cart = require("../../models/cart.model");
const flash = require("express-flash");
//[POST]/cart/add/:productId
module.exports.addPost = async (req, res) => {
  cartId = req.cookies.cartId;
  const productId = req.params.productId
  const quantity = parseInt(req.body.quantity);
  const cart = await Cart.findOne({
    _id: cartId,
  })

  const exitProductInCart = cart.products.find(item => item.product_id == productId);


  if (exitProductInCart) {
    const newQuantity = quantity + exitProductInCart.quantity
    await Cart.updateOne(
      {
        _id: cartId,
        'products.product_id': productId,
      },
      {
        'products.$.quantity': newQuantity
      }
    );
  }
  else {
    const objCart = {
      product_id: productId,
      quantity: quantity
    }
    await Cart.updateOne(
      {
        _id: cartId,
      },
      {
        $push: { products: objCart }
      }
    );
  }
  req.flash("success", "Đã thêm sản phẩm vào giỏ hàng")
  res.redirect(req.get("Referer") || "/");
}