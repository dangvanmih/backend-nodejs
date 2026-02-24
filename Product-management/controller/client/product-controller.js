const Product = require("../../models/products.model");

module.exports.index = async (req, res) => {
    const products = await Product.find({
      status: "active"
    });
    
    const newProducts = products.map(item => {
      item.priceNew = (item.price*(100 - item.discountPercentage)/100).toFixed(); // thêm thuộc tính giá mới trực tiếp vào object gốc
      return item;
    });

    // console.log(newProducts);
    
    res.render("client/pages/products/index", {
      pageTitle: "Danh sách sản phẩm",
      products:  newProducts // sau đó gán lại mảng mới thay vì mảng cũ ban đầu là products
    });
  }