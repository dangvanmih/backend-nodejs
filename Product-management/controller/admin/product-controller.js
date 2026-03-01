const Product = require("../../models/products.model")
const filterStatusHelper = require("../../helpers/filterStatus");
const seacrhHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination")

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

  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  // hết tìm kiếm

  // phân trang

  const countProducts = await Product.countDocuments(find); // countDocuments là hàm đếm của mongoose
  // console.log(countProducts);

  let objectPagination = paginationHelper(
    {
      limitItems: 4,
      currentPage: 1
    },
    req.query,
    countProducts
    
  );

  //hết phân trang


  const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip); //Product lấy  từ bên model
  // console.log(products);

  res.render("admin/pages/products/index", {
    pageTitle: "Trang sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination
  });
}


// [GET] '/admin/product/change-status/:status/:id'
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({_id: id},{status: status}); // hàm update của mongoose và các tham số bên trong là các key trong database được gán lại giá trị mới
  

  // hàm redirect của express điều hướng sang trang khác và điều kiện bên trong là(nếu có trang trước thì quay về trang trước còn không thì về trang /admin/products)
  res.redirect(req.get("Referer") || "/admin/products"); 
  
} 