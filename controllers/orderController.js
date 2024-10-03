const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const Product = require("../models/Product");
const nodemailer = require("nodemailer");

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

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: "New Order Created",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
        <h2 style="color: #8B4513;">New Order Notification</h2>
        <p style="font-size: 16px;">You have received a new order. Below are the details:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <th style="text-align: left; padding: 8px; background-color: #f9f9f9;">Customer Name</th>
            <td style="padding: 8px;">${customerName}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 8px; background-color: #f9f9f9;">Phone Number</th>
            <td style="padding: 8px;">${phoneNumber}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 8px; background-color: #f9f9f9;">Total Price</th>
            <td style="padding: 8px;">${totalPrice}ETB</td>
          </tr>
        </table>

        <p style="margin-top: 40px; font-size: 14px; color: #777;">Thank you for choosing our services!</p>
        <div style="text-align: center; margin-top: 20px;">
          <a href="#" style="background-color: #8B4513; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Order Details</a>
        </div>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

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
