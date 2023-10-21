import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectPassport } from "./utils/Provider.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cors from "cors";
import createMemoryStore from "memorystore";
const MemoryStore = createMemoryStore(session);

// ****************************************************************************

dotenv.config({
  path: "./config/config.env",
});
mongoose.set("strictQuery", false);
const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400000,
    },
    store: new MemoryStore({
      checkPeriod: 86400000,
    }),
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: ["GET", "PUT", "POST", "DELETE"],
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

connectPassport();

//! Importing Routes
import userRoutes from "./routes/user.js";
import orderRoutes from "./routes/order.js";

// Middleware
app.use("/api/v1", userRoutes);
app.use("/api/v1", orderRoutes);

// Error Middleware
app.use(errorMiddleware);
export default app;
