const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const bodyParser = require("body-parser");

router.get("/signup", authController.getSignup);

router.post(
  "/signup",
  bodyParser.urlencoded({ extends: true }),
  authController.postSignup
);

router.get("/login", authController.getLogin);

module.exports = router;
