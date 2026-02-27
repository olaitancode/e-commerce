const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // to parse JSON request bodies

mongoose.connect("mongodb://localhost:27017/dreamware", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const Order = require("./models/Order");

// Checkout route
app.post("/api/checkout", async (req, res) => {
  try {
    const { items, shipping, total } = req.body;

    const newOrder = new Order({
      items,
      shipping,
      total,
      status: "pending",
      createdAt: new Date()
    });

    await newOrder.save();

    res.json({ success: true, message: "Order saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

require("dotenv").config(); // Always put this at the top

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);






// // Load env
// require("dotenv").config();

// const express = require("express");
// const path = require("path");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const Stripe = require("stripe");

// // Init
// const app = express();
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.static(path.join(__dirname, "public"))); // Serve HTML/CSS/JS

// // MongoDB Connect
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log("✅ MongoDB connected"))
//   .catch(err => console.error("❌ Mongo error:", err));

// // API Route: Create Stripe checkout session
// app.post("/api/create-checkout-session", async (req, res) => {
//   const { cartItems } = req.body;

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: cartItems.map(item => ({
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: item.name,
//           },
//           unit_amount: item.price * 100, // Stripe uses cents
//         },
//         quantity: item.quantity,
//       })),
//       success_url: "http://localhost:5000/success.html",
//       cancel_url: "http://localhost:5000/cancel.html",
//     });

//     res.json({ url: session.url });
//   } catch (err) {
//     console.error("Stripe error:", err);
//     res.status(500).json({ error: "Stripe checkout session failed" });
//   }
// });

// // Server start
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

