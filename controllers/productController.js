//product controllers

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const Product = require("../models/Product");

dotenv.config();

//function to get the products in my database

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get products by id

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

//function to create a new product

const createProduct = async (req, res) => {
  const { name, price, description, category } = req.body;

  try {
    const newProduct = new Product({ name, price, description, category });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//function to update an existing product

const updateProduct = async (req, res) => {
  const { id: _id } = req.params;
  const { name, price, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "Invalid id" });

  const updatedProduct = await Product.findByIdAndUpdate(
    _id,
    { name, price, description },
    { new: true }
  );

  if (!updatedProduct)
    return res.status(404).json({ message: "Product not found" });

  res.json(updatedProduct);
};

//function to delete an existing product

const deleteProduct = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "Invalid id" });

  const deletedProduct = await Product.findByIdAndDelete(_id);

  if (!deletedProduct)
    return res.status(404).json({ message: "Product not found" });

  res.json({ message: "Product deleted successfully" });
};
//create a search controller for the product using name
//its will return all products that match the search criteria

const searchProducts = async (req, res) => {
  const { query } = req.query; // Get the search query from query parameters

  if (!query) {
    return res
      .status(400)
      .json({ success: false, message: "Search query is required." });
  }

  try {
    // Use a regex for a case-insensitive search
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, // Search by name
        { description: { $regex: query, $options: "i" } }, // Search by description
      ],
    });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products found." });
    }

    res.json({ success: true, data: products });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ success: false, message: error.message });
  }
};
//exporting the functions

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};
