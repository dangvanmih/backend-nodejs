const Product = require("../../models/products.model")

//[GET] /admin/products
module.exports.products = async (req, res) => {
  // console.log(req.query.status);
    let fillterStatus = [
      {
        name: "Tất cả",
        status: "",
        class: ""
      },
      {
        name: "Hoạt động",
        status: "active"
      },
      {
        name: "Dừng hoạt động",
        status: "inactive"
      },
    ]
    let find = {
      deleted: false
    };

    if(req.query.status) {
      const index = fillterStatus.findIndex(item => item.status == req.query.status ) // lặp qua từng bản ghi của fillterStatus và lấy ra item.status == req.query.status 
      fillterStatus[index].class = "active"
    }
    else {
      const index = fillterStatus.findIndex(item => item.status == "") // lặp qua từng bản ghi của fillterStatus và lấy ra item.status == rỗng
      fillterStatus[index].class = "active"
    }
    
    if(req.query.status) // check nếu người dùng lọc thì mới thêm key status vào hàm find
    {
      find.status = req.query.status; // thêm key status  và gán câu truy vấn
    };
    const products = await Product.find(find);
    // console.log(products);
    
    res.render("admin/pages/products/index", {
      pageTitle: "Trang sản phẩm",
      products: products,
      fillterStatus: fillterStatus
    });
  }