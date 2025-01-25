import express from "express";
import connectDB from "./Database/db.js";
import dotenv from "dotenv";
// import connectDB from "./database/db.js";
import beneficiary from "./routers/beneficiaries.route.js";
import Users from "./routers/users.route.js"
// import cors from "cors";
// import cookieParser from "cookie-parser";

// Load environment variables
dotenv.config({});

// Connect to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 9000;

// Default middlewares
app.use(express.json());
// app.use(cookieParser());
// app.use(cors());

// API Routes
// app.use("/api/v1/tasks", tasks);
app.use('/api/beneficiaries', beneficiary);
app.use('/api/users', Users);


// Start the server
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
