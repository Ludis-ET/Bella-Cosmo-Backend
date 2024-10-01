const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const Product = require("../models/Product");

const placeOrder = asyncHandler(async (req, res) => {
  const { customerName, phoneNumber, orderItems, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (!product) {
      res.status(404);
      throw new Error(`Product not found: ${item.product}`);
    }
  }

  const order = new Order({
    customerName,
    phoneNumber,
    orderItems,
    totalPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});


const getUserOrders = asyncHandler(async (req, res) => {
  const { customerName } = req.params;

  const orders = await Order.find({ customerName })
    .populate("orderItems.product", "name")
    .exec();

  if (!orders || orders.length === 0) {
    res.status(404);
    throw new Error("No orders found for this customer");
  }

  const formattedOrders = orders.map((order) => ({
    customerName: order.customerName,
    phoneNumber: order.phoneNumber,
    orderItems: order.orderItems.map((item) => ({
      productName: item.product.name,
      quantity: item.quantity,
    })),
    totalPrice: order.totalPrice,
  }));

  res.json(formattedOrders);
});

module.exports = {
  placeOrder,
  getUserOrders,
};
