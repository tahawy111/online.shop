const authModel = require("../models/auth.model");
const flash = require("connect-flash");

exports.getSignup = (req, res, next) => {
  res.render("signup");
};

exports.postSignup = (req, res, next) => {
  authModel
    .createNewUser(req.body.username, req.body.email, req.body.password)
    .then(() => {
      return res.redirect("/login");
    })
    .catch((err) => {
      res.redirect("/signup");
    });
};

exports.getLogin = (req, res, next) => {
  console.log(req.flash("authError"));
  res.render("login");
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
