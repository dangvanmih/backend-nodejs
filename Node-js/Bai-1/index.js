// lệnh chạy server: npx nodemon index.js


// import mongoose để kết nối database
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/products-test-backend');

// khởi tạo mô hình với các trường giống trong database
const Product = mongoose.model('Product',{
    title: String,
    price: Number,
    thumbnail: String
});
// Import thư viện Express vào project NodeJS.
const express = require('express');
// Biến app dùng để cấu hình route, middleware, listen...
const app = express();
// Khai báo cổng server
const port = 3000;
// Cho phép trình duyệt truy cập trực tiếp file trong folder public
app.use(express.static('public'));
// Khai báo thư mục chứa file giao diện
app.set("views","./views");
// Khai báo template engine, Server sẽ dùng Pug để render HTML
app.set("view engine", "pug");

app.get('/',(req, res) => {
    res.render("index.pug", {
        titlePage: "Trang chủ",
        message: "Xin chào các bạn"
    })
})

app.get('/product', async (req, res) => {
    const products = await Product.find({}); // hàm find truy vấn tất cả các bản ghi trong database product và nếu ko truyền gì vào thì mặc định nó sẽ lấy tất cả. 
    console.log(products);
    res.render('products.pug', {
        titlePage: "Danh sách sản phẩm",
        products: products
    })
})

app.get('/about',(req, res) => {
    res.render("contact.pug", {
        titlePage: " Trang liên hệ",
        message: "Xin chào các bạn"
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    
})