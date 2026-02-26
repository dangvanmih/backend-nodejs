const Product = require("../../models/products.model")

const filterStatusHelper = require("../../helpers/filterStatus");
//[GET] /admin/products
module.exports.products = async (req, res) => {
  // console.log(req.query.status);

  //bộ lọc
  const filterStatus = filterStatusHelper(req.query);
  
   let find = {
    deleted: false
  };
  
  if (req.query.status) // check nếu người dùng lọc thì mới thêm key status vào hàm find
  {
    find.status = req.query.status; // thêm key status  và gán câu truy vấn
  };
  // hết bộ lọc

  // tìm kiếm
  let keyword = "";
  if (req.query.keyword) // check nếu người dùng tìm kiếm
  {
    keyword = req.query.keyword;
    const regex = new RegExp(keyword, "i"); // dùng regex để tìm kiếm khi không nhập đủ tên sản phẩm và tham số "i" để tìm kiếm ko phân biệt chữ in hoa
    find.title = regex;
  };
  // hết tìm kiếm


  const products = await Product.find(find); //Product lấy  từ bên model
  // console.log(products);

  res.render("admin/pages/products/index", {
    pageTitle: "Trang sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: keyword
  });
}