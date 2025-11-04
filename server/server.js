import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
