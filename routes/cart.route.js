const router = require("express").Router();
const bodyParser = require("body-parser");
const cartController = require("../controllers/cart.controller");
const authGuard = require("./guards/auth.guard");
const { check } = require("express-validator");
router.get("/", authGuard.isAuth, cartController.getCart);

router.post(
  "/",
  authGuard.isAuth,
  bodyParser.urlencoded({ extended: true }),
  check("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isInt({ min: 1 })
    .withMessage("Amount must be greater than 0"),
  cartController.postCart
);

module.exports = router;
