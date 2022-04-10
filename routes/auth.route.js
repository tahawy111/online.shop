const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const check = require("express-validator").check;
const bodyParser = require("body-parser");
const authGuard = require("./guards/auth.guard");
router.get("/signup", authGuard.notAuth, authController.getSignup);

router.post(
  "/signup",
  authGuard.notAuth,
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

router.get("/login", authGuard.notAuth, authController.getLogin);

router.post(
  "/signin",
  authGuard.notAuth,
  bodyParser.urlencoded({ extended: true }),
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid format"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  authController.postLogin
);

router.all("/logout", authGuard.isAuth, authController.logout);

module.exports = router;
