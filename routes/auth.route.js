const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const check = require("express-validator").check;
const bodyParser = require("body-parser");

router.get("/signup", authController.getSignup);

router.post(
  "/signup",
  bodyParser.urlencoded({ extended: true }),
  check("username").not().isEmpty().withMessage("Username is required"),
  check("email").not().isEmpty().withMessage("Invalid format").isEmail(),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
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
  check("email").not().isEmpty().withMessage("Invalid format").isEmail(),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  authController.postLogin
);

router.all("/logout", authController.logout);

module.exports = router;
