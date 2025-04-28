import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./app/routes/index";
import connectDB from "./app/configs/dbConfig";

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Use centralized routes
app.use("/api", routes); // All routes are now prefixed with /api

app.get("/", (req, res) => {
  res.send("Welcome to the Business User App!");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
