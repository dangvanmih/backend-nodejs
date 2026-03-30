const Product = require("../../models/products.model")
const filterStatusHelper = require("../../helpers/filterStatus");
const seacrhHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");
const flash = require("express-flash");
//[GET] /admin/products
module.exports.products = async (req, res) => {
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



  // sort 
  let sort = {}
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue; //key của object được lấy từ một string (biến) nên phải dùng ngoặc vuông
  }
  else {
    sort.position = "desc"
  }
  // end-sort 

  const products = await Product.find(find)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip) //Product lấy  từ bên model
    .sort(sort);  //desc: giảm dần; asc: tăng dần
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


// [CREATE] '/admin/pages/products/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/products/create", {
    pageTitle: "Thêm mới sản phẩm",
  });
};

// [POST] '/admin/pages/products/create
module.exports.createPost = async (req, res) => {
  // console.log(req.file);

  req.body.price = parseFloat(req.body.price);
  req.body.discountPercentage = parseFloat(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);

  if (req.body.position === "") {
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
  }
  else {
    req.body.position = parseInt(req.body.position);
  }


  const product = new Product(req.body); //tạo mới 1 sản phẩm nhưng chưa lưu vào database
  await product.save()


  req.flash("success", "Thêm sản phẩm thành công!");
  res.redirect(`${systemConfig.prefixAdmin}/products`);
};

// [GET] '/admin/pages/products/edit
module.exports.edit = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id
    };

    const product = await Product.findOne(find); // sửa 1 sản phẩm thì dùng findOne để trả ra 1 object còn hàm find thì trả ra 1 mảng chứa các object

    //console.log(product); 


    res.render("admin/pages/products/edit", {
      pageTitle: "Sửa sản phẩm",
      product: product
    });
  }
  catch (error) {
    flash("success", "Lỗi không tìm thấy bản ghi!");
    res.redirect(`${systemConfig.prefixAdmin}/products`)
  }
};

// [PATCH] '/admin/pages/products/editPatch
module.exports.editPatch = async (req, res) => {
  // console.log(req.body);
  const id = req.params.id;
  req.body.price = parseFloat(req.body.price);
  req.body.discountPercentage = parseFloat(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  try {
    await Product.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhật sản phẩm thành công!");

  } catch (error) {
    req.flash("error", "Cập nhật sản phẩm không thành công!");
    res.redirect(`${systemConfig.prefixAdmin}/products`)
  }

  res.redirect(req.get('Referrer') || '/');
}

// [CREATE] '/admin/pages/products/detail
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id
    };

    const product = await Product.findOne(find); // sửa 1 sản phẩm thì dùng findOne để trả ra 1 object còn hàm find thì trả ra 1 mảng chứa các object

    res.render("admin/pages/products/detail", {
      pageTitle: product.title,
      product: product
    });
  }
  catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`)
  }
};