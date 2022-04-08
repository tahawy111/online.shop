const validationResult = require("express-validator").validationResult;
const authModel = require("../models/auth.model");
exports.getSignup = (req, res, next) => {
  res.render("signup", {
    authError: req.flash("authError")[0],
    validationErrors: req.flash("validationErrors"),
  });
};

exports.postSignup = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    authModel
      .createNewUser(req.body.username, req.body.email, req.body.password)
      .then(() => {
        return res.redirect("/login");
      })
      .catch((err) => {
        res.redirect("/signup");
      });
  } else {
    req.flash("validationErrors", validationResult(req).array());
    res.redirect("/signup");
  }
};

exports.getLogin = (req, res, next) => {
  console.log();
  res.render("login", {
    authError: req.flash("authError")[0],
  });
};

exports.postLogin = (req, res, next) => {
  authModel
    .login(req.body.email, req.body.password)
    .then((id) => {
      req.session.userId = id;
      res.redirect("/");
    })
    .catch((err) => {
      req.flash("authError", err);
      res.redirect("/login");
    });
};
exports.logout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
