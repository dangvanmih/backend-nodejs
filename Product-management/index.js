const express = require("express");
//import thư viện method-override để ghi đè phương thức
const methodOverride = require("method-override");

//import thư viện body-parser để lấy data convert 
const bodyParser = require("body-parser");

//import thư viện express-flash để sử dụng thông báo
const flash = require('express-flash');

//import thư viện cookie-parser
const cookieParser = require("cookie-parser");

//import thư viện express-session
const session = require("express-session");

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

// parse application/x-www-form-urlencoded dùng để lấy ra data req.body
app.use(bodyParser.urlencoded({ extended: false }));

//method-override để ghi đè phương thức
app.use(methodOverride("_method"));

//cấu hình pug
// app.set("views", "./views");
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

//APP Local variables
app.locals.prefixAdmin = systemConfg.prefixAdmin; // khai báo biến như này thì biến đó sẽ "chỉ" sử dụng được trong tất cả các file pug


// express-flash
app.use(cookieParser('JLAHSDLAISDGLI'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

// cấu hình file tĩnh: dùng online thì phải thêm __dirname
app.use(express.static(`${__dirname}public`));

//Router
routerClient(app);
routerAdmin(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);

})

