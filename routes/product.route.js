const router = require("express").Router();
const productController = require("../controllers/product.controller");
const authGuard = require("./guards/auth.guard");
router.get("/", productController.getProduct);

router.get("/:id", productController.getProductById);

module.exports = router;
