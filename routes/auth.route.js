const router = require("express").Router();
const authController = require("../controllers/auth.controller");
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
  authController.postLogin
);
module.exports = router;
