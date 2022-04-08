const express = require("express");
const path = require("path");
const app = express();
const DB_URL = "mongodb://localhost:27017/online-shop";
const session = require("express-session");
const SessionStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");

const homeRouter = require("./routes/home.route");
const productRouter = require("./routes/product.route");
const authRouter = require("./routes/auth.route");

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "images")));
app.use(flash());

const STORE = new SessionStore({ uri: DB_URL, collection: "sessions" });

app.use(
  session({
    secret: "this is my secret secret th hash express sessions...............",
    saveUninitialized: false,
    store: STORE,
    resave: true,
  })
);
app.set("view engine", "ejs");
app.set("views", "views");

app.use("/", homeRouter);
app.use("/", authRouter);
app.use("/product", productRouter);
// app.get("/", (req, res, next) => {
//   res.render("index");
// });

app.listen(3000, (err) => console.log("Server Lesten On Port 3000"));
