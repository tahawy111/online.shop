const authModel = require("../models/auth.model");

exports.getSignup = (req, res, next) => {
  res.render("signup");
};

exports.postSignup = (req, res, next) => {
  authModel
    .createNewUser(req.body.username, req.body.email, req.body.password)
    .then(() => {
      res.redirect("/login").catch(() => {
        res.redirect("/signup");
      });
    });
};

exports.getLogin = (req, res, next) => {
  res.render("login");
};
