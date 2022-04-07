const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const check = require("express-validator").check;
const bodyParser = require("body-parser");

router.get("/signup", authController.getSignup);

router.post(
  "/signup",
  bodyParser.urlencoded({ extended: true }),
  authController.postSignup
);

router.get("/login", authController.getLogin);

router.post(
  "/signin",
  bodyParser.urlencoded({ extended: true }),
  check("username").require,
  authController.postLogin
);

router.all("/logout", authController.logout);

module.exports = router;
