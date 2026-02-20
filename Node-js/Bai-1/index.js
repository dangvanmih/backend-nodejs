// lệnh chạy server: npx nodemon index.js
const express = require('express')
const app = express();
const port = 3000;

app.use(express.static('public'));
app.set("views","./views");
app.set("view engine", "pug");

app.get('/',(req, res) => {
    res.render("index.pug", {
        title: "Trang chủ",
        message: "Xin chào các bạn"
    })
})

app.get('/product',(req, res) => {
    res.send('<h1>Product</h1>')
})

app.get('/about',(req, res) => {
    res.render("contact.pug", {
        title: " Trang liên hệ",
        message: "Xin chào các bạn"
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    
})

