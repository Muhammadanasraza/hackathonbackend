import express from "express";
import connectDB from "./Database/db.js";
import dotenv from "dotenv";
import user from "./router/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import beneficiary from "./routers/beneficiaries.route.js";

// Load environment variables
dotenv.config({});

// Connect to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 9000;

// Default middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// API Routes
app.use('/api/beneficiaries', beneficiary);
app.use("/api/v1/user", user);


// Start the server
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
