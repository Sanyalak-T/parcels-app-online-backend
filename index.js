import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import limiter from "./middleware/rateLimiter.js";
import errorHandler from "./middleware/errorHandler.js";
import userRoutes from "./api/v1/allRoutes.js";
import organizationRoutes from "./api/v1/allRoutes.js";
import parcelRoutes from "./api/v1/allRoutes.js";
import departmentRoutes from "./api/v1/allRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet()); // Middleware for security headers
const corsOptions = {
  origin: "http://localhost:5173",
  // something with jwt ?
  credentials: true, //this cookie
};

app.use(cors(corsOptions));
app.use(limiter); // Middleware for rate limiting
app.use(express.json());

app.use("/", userRoutes());
app.use("/", organizationRoutes());
app.use("/", parcelRoutes());
app.use("/", departmentRoutes());
app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Mongo Database😊");
  } catch (error) {
    console.log(
      `MongoDB connection error ${error}`
    );
    process.exit(1);
  }
})();

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT}`
  );
});

// Handle unhandled promise rejections globally
process.on("unhandledRejection", (err) => {
  console.error(
    "💥 Unhandled Rejection:",
    err.message
  );
  process.exit(1);
});
