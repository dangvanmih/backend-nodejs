const Product = require("../../models/products.model")

const filterStatusHelper = require("../../helpers/filterStatus");

const seacrhHelper = require("../../helpers/search")
//[GET] /admin/products
module.exports.products = async (req, res) => {
  // console.log(req.query.status);

  //bộ lọc
  const filterStatus = filterStatusHelper(req.query);
  
   let find = {
    deleted: false
  };
  
  if (req.query.status) // check nếu người dùng lọc thì mới thêm key status vào object find
  {
    find.status = req.query.status; // thêm key status  và gán câu truy vấn
  };
  // hết bộ lọc

  // tìm kiếm
  const objectSearch = seacrhHelper(req.query);

  if(objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  
  // hết tìm kiếm


  const products = await Product.find(find); //Product lấy  từ bên model
  // console.log(products);

  res.render("admin/pages/products/index", {
    pageTitle: "Trang sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword
  });
}