const Cart = require("../../models/cart.model");
const User = require("../../models/users.model");

module.exports.cartId = async (req, res, next) => {
  // 1. Nếu chưa có cookie cartId -> Tạo mới hoàn toàn
  if (!req.cookies.cartId) {
    const cart = new Cart();
    await cart.save();
    
    const expiresTime = 1000 * 60 * 60 * 24 * 365;
    res.cookie("cartId", cart.id, {
      expires: new Date(Date.now() + expiresTime)
    });
    
    // Gán giá trị mặc định cho lần đầu để giao diện không lỗi
    res.locals.miniCart = { totalQuantity: 0 };
  } 
  else {
    // 2. Nếu đã có cartId, kiểm tra xem có đang Đăng nhập không
    if (req.cookies.tokenUser) {
      const user = await User.findOne({ 
        tokenUser: req.cookies.tokenUser,
        deleted: false 
      });

      if (user) {
        const cartUser = await Cart.findOne({ user_id: user.id });
        // Nếu ID giỏ hàng trong cookie KHÔNG KHỚP với giỏ hàng chính chủ trong DB
        if (cartUser && cartUser.id !== req.cookies.cartId) {
          res.cookie("cartId", cartUser.id);
          // Cập nhật lại biến tạm để tí nữa dùng tìm giỏ hàng đúng
          req.cookies.cartId = cartUser.id; 
        }
      }
    }

    // 3. Lấy dữ liệu giỏ hàng để hiển thị số lượng (Mini Cart)
    const cart = await Cart.findOne({ _id: req.cookies.cartId });

    if (cart) {
      // Tính tổng số lượng sản phẩm trong giỏ
      cart.totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0);
      res.locals.miniCart = cart;
    } else {
      // Trường hợp có cookie nhưng DB bị mất giỏ hàng (do xóa nhầm...)
      res.locals.miniCart = { totalQuantity: 0 };
    }
  }

  next();
};