const mongoose = require("mongoose");
const Product = require("./models/Product");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("MongoDB connected...");

    // Seed the database with cosmetics and skincare products
    const products = [
      {
        name: "Revitalizing Face Serum",
        description:
          "A serum that hydrates and replenishes your skin, leaving it radiant.",
        price: 49.99,
        quantity: 100,
        category: "Skincare",
        image: "https://via.placeholder.com/150/face-serum.jpg",
      },
      {
        name: "Hydrating Night Cream",
        description:
          "Rich night cream that restores your skin’s glow while you sleep.",
        price: 39.99,
        quantity: 120,
        category: "Skincare",
        image: "https://via.placeholder.com/150/night-cream.jpg",
      },
      {
        name: "Vitamin C Brightening Serum",
        description: "Brighten your skin with this powerful Vitamin C formula.",
        price: 59.99,
        quantity: 75,
        category: "Skincare",
        image: "https://via.placeholder.com/150/vitamin-c-serum.jpg",
      },
      {
        name: "Moisturizing Body Lotion",
        description:
          "Deeply nourishing body lotion to keep your skin soft all day long.",
        price: 25.99,
        quantity: 150,
        category: "Body Care",
        image: "https://via.placeholder.com/150/body-lotion.jpg",
      },
      {
        name: "Exfoliating Face Scrub",
        description:
          "Gentle exfoliating scrub that removes dead skin cells and unclogs pores.",
        price: 29.99,
        quantity: 110,
        category: "Skincare",
        image: "https://via.placeholder.com/150/face-scrub.jpg",
      },
      {
        name: "Nourishing Lip Balm",
        description: "Organic lip balm to keep your lips soft and hydrated.",
        price: 8.99,
        quantity: 200,
        category: "Lip Care",
        image: "https://via.placeholder.com/150/lip-balm.jpg",
      },
      {
        name: "Clarifying Face Mask",
        description:
          "Detoxify your skin with this clarifying mask, made with natural clay.",
        price: 34.99,
        quantity: 90,
        category: "Skincare",
        image: "https://via.placeholder.com/150/face-mask.jpg",
      },
      {
        name: "Sunscreen SPF 50",
        description:
          "High-protection sunscreen for all-day outdoor activities.",
        price: 19.99,
        quantity: 130,
        category: "Skincare",
        image: "https://via.placeholder.com/150/sunscreen.jpg",
      },
      {
        name: "Anti-Aging Eye Cream",
        description:
          "Reduce fine lines and dark circles with this anti-aging eye cream.",
        price: 44.99,
        quantity: 60,
        category: "Skincare",
        image: "https://via.placeholder.com/150/eye-cream.jpg",
      },
      {
        name: "Rejuvenating Hair Oil",
        description:
          "Nourish and revitalize your hair with this lightweight hair oil.",
        price: 24.99,
        quantity: 140,
        category: "Hair Care",
        image: "https://via.placeholder.com/150/hair-oil.jpg",
      },
      {
        name: "Rose Water Toner",
        description:
          "A gentle toner that balances your skin’s pH and refreshes your face.",
        price: 14.99,
        quantity: 180,
        category: "Skincare",
        image: "https://via.placeholder.com/150/rose-toner.jpg",
      },
      {
        name: "Whipped Body Butter",
        description:
          "Indulge your skin with this ultra-hydrating whipped body butter.",
        price: 32.99,
        quantity: 80,
        category: "Body Care",
        image: "https://via.placeholder.com/150/body-butter.jpg",
      },
      {
        name: "Brightening Face Oil",
        description:
          "Lightweight face oil that evens skin tone and adds a radiant glow.",
        price: 49.99,
        quantity: 85,
        category: "Skincare",
        image: "https://via.placeholder.com/150/face-oil.jpg",
      },
      {
        name: "Coconut Milk Shampoo",
        description:
          "A nourishing shampoo that strengthens and moisturizes your hair.",
        price: 22.99,
        quantity: 110,
        category: "Hair Care",
        image: "https://via.placeholder.com/150/shampoo.jpg",
      },
      {
        name: "Detoxifying Charcoal Mask",
        description: "Purify your skin with this deep cleansing charcoal mask.",
        price: 39.99,
        quantity: 95,
        category: "Skincare",
        image: "https://via.placeholder.com/150/charcoal-mask.jpg",
      },
      {
        name: "Lavender Bath Salts",
        description:
          "Relax and unwind with these soothing lavender bath salts.",
        price: 15.99,
        quantity: 170,
        category: "Body Care",
        image: "https://via.placeholder.com/150/bath-salts.jpg",
      },
      {
        name: "Hand Cream with Shea Butter",
        description:
          "Moisturizing hand cream infused with organic shea butter.",
        price: 12.99,
        quantity: 140,
        category: "Body Care",
        image: "https://via.placeholder.com/150/hand-cream.jpg",
      },
      {
        name: "Aloe Vera Gel",
        description:
          "Pure aloe vera gel for soothing and healing irritated skin.",
        price: 11.99,
        quantity: 190,
        category: "Skincare",
        image: "https://via.placeholder.com/150/aloe-vera.jpg",
      },
      {
        name: "Coconut Body Scrub",
        description:
          "Exfoliate your skin with this nourishing coconut body scrub.",
        price: 27.99,
        quantity: 130,
        category: "Body Care",
        image: "https://via.placeholder.com/150/body-scrub.jpg",
      },
      {
        name: "Hyaluronic Acid Serum",
        description:
          "Intensely hydrating serum that helps plump and smooth skin.",
        price: 49.99,
        quantity: 75,
        category: "Skincare",
        image: "https://via.placeholder.com/150/hyaluronic-serum.jpg",
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
