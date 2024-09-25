//feeding sample data for the Products model
const mongoose = require("mongoose");
const Product = require("./models/Product");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("MongoDB connected...");
    //seed the database with sample data
    const products = [
      {
        name: "Product 1",
        description: "This is a sample product",
        price: 9.99,
        quantity: 100, 
        category: "Category 1",
        stock: 10, 
        imageUrl: "https://example.com/product1.jpg", // Added imageUrl field
      },
      {
        name: "Product 2",
        description: "Another sample product",
        price: 19.99,
        quantity: 50, 
        category: "Category 2",
        stock: 20, 
        imageUrl: "https://example.com/product2.jpg", // Added imageUrl field
      },
      {
        name: "Product 3",
        description: "Yet another sample product",
        price: 29.99,
        quantity: 25, 
        category: "Category 3",
        stock: 30, 
        imageUrl: "https://example.com/product3.jpg", // Added imageUrl field
      },
    ];

    Product.insertMany(products)
      .then((result) => {
        console.log("Products seeded:", result.length);
        mongoose.connection.close();
      })
      .catch((err) => {
        console.error("Error seeding products:", err);
        mongoose.connection.close();
      });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
