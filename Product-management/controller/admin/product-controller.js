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


  const products = await Product.find(find)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip) //Product lấy  từ bên model
    .sort({position: "desc"});  //desc: giảm dần; asc: tăng dần
  // console.log(products);

  res.render("admin/pages/products/index", {
    pageTitle: "Trang sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination
  });
}


// [PATCH] '/admin/products/change-status/:status/:id'
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status }); // hàm update của mongoose và các tham số bên trong là các key trong database được gán lại giá trị mới

  req.flash("success", "Cập nhật trạng thái thành công!");
  // hàm redirect của express điều hướng sang trang khác và điều kiện bên trong là(nếu có trang trước thì quay về trang trước còn không thì về trang /admin/products)
  res.redirect(req.get("Referer") || "/admin/products");

}

// [PATCH] '/admin/products/change-multi-status
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", "); //convert lại sang dạng mảng

  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
      break;
    case "delete-all":
      await Product.updateMany({ _id: { $in: ids } }, { deleted: true, deletedAt: new Date() });
      req.flash("success", `Xóa thành công ${ids.length} sản phẩm!`);
      break
    case "change-position":
      for (const item of ids) {   // không dùng forEach vì forEach không chờ await
        let [id, position] = item.split("-");
        position = parseInt(position);
        // console.log(id);
        // console.log(position);
        await Product.updateOne({ _id: id }, { position: position });
        
      }
      req.flash("success", `Thay đổi vị trí thành công ${ids.length} sản phẩm!`);
      break
    default:
      break;
  }

  res.redirect(req.get("Referer") || "/admin/products");
};


// [DELTE] '/admin/products/delete/:id'
module.exports.deleteItem = async (req, res) => {

  const id = req.params.id;
  // await Product.deleteOne({ _id: id }); // xóa vĩnh viễn
  await Product.updateOne({ _id: id }, { deleted: true, deletedAt: new Date() });
  req.flash("success", "Xóa sản phẩm thành công!");
  // xóa mềm khi xóa thì đổi trạng thái cho sản phẩm đó thành true thì lúc find sản phầm thì truyền vào deleted:false
  res.redirect(req.get("Referer") || "/admin/products");
}

