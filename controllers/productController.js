const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Product = require("../models/Product");

dotenv.config();
const app = express();

// Function to get all products in the database
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const product = await Product.findById(_id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to create a new product
const createProduct = async (req, res) => {
  const { name, price, description, category, image } = req.body; // Added image field

  try {
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      image,
    }); // Including image in the product
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to update an existing product
const updateProduct = async (req, res) => {
  const { id: _id } = req.params;
  const { name, price, description, category, image } = req.body; // Added image field

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "Invalid id" });

  const updatedProduct = await Product.findByIdAndUpdate(
    _id,
    { name, price, description, category, image }, // Including image in the update
    { new: true }
  );

  if (!updatedProduct)
    return res.status(404).json({ message: "Product not found" });

  res.json(updatedProduct);
};

// Function to delete an existing product
const deleteProduct = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "Invalid id" });

  const deletedProduct = await Product.findByIdAndDelete(_id);

  if (!deletedProduct)
    return res.status(404).json({ message: "Product not found" });

  res.json({ message: "Product deleted successfully" });
};

// Exporting the functions
module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
