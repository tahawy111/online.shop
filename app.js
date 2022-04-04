const express = require("express");
const path = require("path");
const app = express();

const homeRouter = require("./routes/home.route");
const productRouter = require("./routes/product.route");
const authRouter = require("./routes/auth.route");

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "images")));
app.set("view engine", "ejs");
app.set("views", "views");

app.use("/", homeRouter);
app.use("/product", productRouter);

// app.get("/", (req, res, next) => {
//   res.render("index");
// });

app.listen(3000, (err) => console.log("Server Lesten On Port 3000"));
