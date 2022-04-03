const productsModel = require("../models/products.model");
exports.getHome = (req, res, next) => {
  // get products

  let category = req.query.category;
  let productsPromise;
  let validCategories = ["all", "clothes", "phones", "computers"];
  if (category && validCategories.includes(category))
    productsPromise = productsModel.getProductsByCategory(category);
  else productsPromise = productsModel.getAllProducts();

  productsPromise.then((products) => {
    res.render("index", { products: products });
  });

  // render index.ejs
};
