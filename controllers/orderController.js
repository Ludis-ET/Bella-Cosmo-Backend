const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const Product = require("../models/Product");

// @desc    Place a new order
// @route   POST /api/orders
// @access  Private (User)
const placeOrder = asyncHandler(async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  // Check if order items are provided
  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  // Validate each order item: Check if the product exists and calculate total price if needed
  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (!product) {
      res.status(404);
      throw new Error(`Product not found: ${item.product}`);
    }
    // Optionally validate stock or price here if needed
  }

  // Create a new order
  const order = new Order({
    user: req.user._id, // Set the user from the logged-in user
    orderItems,
    totalPrice,
  });

  // Save the order to the database
  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

// @desc    Get orders placed by a specific user
// @route   GET /api/orders/:userId
// @access  Private (Admin)

const getUserOrders = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Fetch orders placed by the user with the given userId
  const orders = await Order.find({ user: userId })
    .populate("user", "name phoneNumber") // Ensure to include user's name and phoneNumber
    .populate("orderItems.product", "name") // Populate the product name for each order item
    .exec();

  // If no orders found
  if (!orders || orders.length === 0) {
    res.status(404);
    throw new Error("No orders found for this user");
  }

  // Format the response
  const formattedOrders = orders.map((order) => ({
    user: {
      name: order.user.name,
      phoneNumber: order.user.phoneNumber,
    },
    orderItems: order.orderItems.map((item) => ({
      productName: item.product.name,
      quantity: item.quantity,
      //price: item.price,
    })),
    totalPrice: order.totalPrice,
  }));

  res.json(formattedOrders);
});

module.exports = {
  placeOrder,
  getUserOrders,
};
