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

  // phân trang
  let objectPagination = {
    limitItems: 4,
    currentPage: 1
  };

  if(req.query.page) {
    objectPagination.currentPage = parseInt(req.query.page);
  }

  objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems; // công thức tính skip : trang hiện tại - 1 * số lượng giới hạn sản phẩm
  
  const countProducts = await Product.countDocuments(find); // countDocuments là hàm đếm của mongoose
  // console.log(countProducts);
  

  const totalPage = Math.ceil(countProducts/objectPagination.limitItems); // hàm ceil dùng để luôn làm tròn lên
  // console.log(totalPage);
  
  objectPagination.totalPage = totalPage;
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