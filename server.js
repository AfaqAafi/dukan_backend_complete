import app from "./app.js";
import { connectDb } from "./config/database.js";
import Razorpay from "razorpay";


// connecting to db;
connectDb();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

app.get("/", (req, res, next) => {
  res.send("<h1>Working</h1>");
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server is working on port ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});
