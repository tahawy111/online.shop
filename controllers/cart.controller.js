const cartModel = require("../models/cart.model");
const { validationResult } = require("express-validator");
exports.postCart = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    cartModel
      .addNewItem({
        name: req.body.name,
        price: req.body.price,
        amount: req.body.amount,
        productId: req.body.productId,
        userId: req.session.userId,
        timestamp: Date.now(),
      })
      .then(() => {
        res.redirect("/cart");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.flash("validationErrors", validationResult(req).array());
    res.redirect(req.body.redirectTo);
  }
};
