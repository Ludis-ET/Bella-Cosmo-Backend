const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

 /* {
    name: 'Product 2',
    description: 'This is product 2 description.',
    price: 200,
    category: 'Category 2',
    imageUrl: 'https://example.com/product2.jpg',
  } */