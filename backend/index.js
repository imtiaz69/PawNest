import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import petRoutes from "./routes/petRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;


const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Atlas connected");
  } catch (err) {
    console.error("Connection failed:", err.message);
    
  }
};

connectDB();

app.use("/api/user", userRoutes);
app.use("/api/pet", petRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
