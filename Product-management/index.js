const express = require("express");

//import thư viện method-override để ghi đè phương thức
const methodOverride = require("method-override");

//iimport thư viện body-parser để lấy data convert 
const bodyParser = require("body-parser");


//cấu hình .env
require("dotenv").config();

const database = require("./config/database");

const systemConfg = require("./config/system");

// import router bên client
const routerClient = require("./routers/client/index.router");

// import router bên admin
const routerAdmin = require("./routers/admin/index.router");

database.connect();
const app = express();
const port = process.env.PORT;

//method-override để ghi đè phương thức
app.use(methodOverride("_method"));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))


//cấu hình pug
app.set("views","./views");
app.set("view engine", "pug");

//APP Local variables
app.locals.prefixAdmin = systemConfg.prefixAdmin; // khai báo biến như này thì biến đó sẽ sử dụng được trong tất cả các file pug

// cấu hình file tĩnh
app.use(express.static('public'));

//Router
routerClient(app);
routerAdmin(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    
})