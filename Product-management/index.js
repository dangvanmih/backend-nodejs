const express = require("express");
const app = express();
const port = 3000;

//cấu hình pug
app.set("views","./views");
app.set("view engine", "pug");


app.get('/',(req, res) => {
    res.render("client/pages/home/index.js")
})

app.get('/product',(req, res) => {
    res.send("Danh sách sản phẩm")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    
})