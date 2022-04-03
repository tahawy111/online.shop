const productsModel = require("../models/products.model");
exports.getHome = (req, res, next) => {
  // get products
  productsModel.getAllProducts();
  let category = req.query.category;
  let productsPromise;
  if (category && category !== "all")
    productsPromise = productsModel.getProductsByCategory(category);
  else productsPromise = productsModel.getAllProducts();

  productsPromise.then((products) => {
    res.render("index", {
      products: products,
    });
  });
  // render index.ejs
};
