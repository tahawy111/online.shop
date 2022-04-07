const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const check = require("express-validator").check;
const bodyParser = require("body-parser");

router.get("/signup", authController.getSignup);

router.post(
  "/signup",
  bodyParser.urlencoded({ extended: true }),
  check("username").not().isEmpty(),
  check("email").not().isEmpty().isEmail(),
  check("password").isLength({ min: 6 }),
  check("confirmPassword").custom((value, { req }) => {
    if (value == req.body.password) return true;
    else throw "Passwords dosen't match";
  }),
  authController.postSignup
);

router.get("/login", authController.getLogin);

router.post(
  "/signin",
  bodyParser.urlencoded({ extended: true }),

  authController.postLogin
);

router.all("/logout", authController.logout);

module.exports = router;
