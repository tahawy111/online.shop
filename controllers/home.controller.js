const productsModel = require("../models/products.model");

exports.getHome = (req, res, next) => {
  // get products
  let category = req.query.category;
  let productsPromise;
  let validCategories = ["all", "clothes", "phones", "computers"];
  if (category && category != "all" && validCategories.includes(category))
    productsPromise = productsModel.getProductsByCategory(category);
  else productsPromise = productsModel.getAllProducts();

  productsPromise.then((products) => {
    res.render("index", {
      products: products,
      isUser: req.session.userId,
      validationError: req.flash("validationErrors")[0],
    });
  });

  // render index.ejs
};
