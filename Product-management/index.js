const express = require("express");
//cấu hình .env
require("dotenv").config();

const database = require("./config/database")

// import router bên client
const routerClient = require("./routers/client/index.router");
// import router bên admin
const routerAdmin = require("./routers/admin/index.router");

database.connect();
const app = express();
const port = process.env.PORT;

//cấu hình pug
app.set("views","./views");
app.set("view engine", "pug");

// cấu hình file tĩnh
app.use(express.static('public'));

//Router
routerClient(app);
routerAdmin(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    
})