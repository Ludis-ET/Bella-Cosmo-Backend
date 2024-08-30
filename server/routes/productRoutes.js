const express = require("express");
const {
  getProducts,
  getProductById,
} = require("../controllers/productController");
const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
//add products to the database Route by sending a POST request
router.post("/add-products", addProduct);


module.exports = router;
