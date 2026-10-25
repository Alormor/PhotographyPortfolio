import "dotenv/config";
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";
import { photosRouter } from "./routes/photos.js";
import { workshopsRouter } from "./routes/workshops.js";

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// 1. CORS Setup (allow cookies & credentials for auth sessions)
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

// 2. Better Auth Handler (MUST come before express.json() parser!)
app.all("/api/auth/*splat", toNodeHandler(auth));

// 3. JSON body parser for normal routes
app.use(express.json());

// 4. API Routes
app.use("/api/photos", photosRouter);
app.use("/api/workshops", workshopsRouter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Photography Portfolio API is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
