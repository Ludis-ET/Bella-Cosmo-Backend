const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
    });
    console.log("MongoDB connected");
    //list collections in the database
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections in the database:");
    collections.forEach((collection) => console.log(collection.name));
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
