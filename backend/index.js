const express = require('express');
const app = express();
const dotenv = require('dotenv');
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");
dotenv.config();
// mongodb
const mongoose = require('mongoose');
mongoose.connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (!err) {
        console.log("MongoDB Connection Succeeded.");
      } else {
        console.log("Error in DB connection: " + err);
      }
    }
  );
app.use(cors());
// can take any json object
app.use(express.json())
app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

// listen number
app.listen(process.env.PORT || 5000, ()=>{
    console.log("backend server is running")
})