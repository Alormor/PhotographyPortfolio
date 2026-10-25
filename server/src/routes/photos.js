import { Router } from "express";
import { db } from "../db/index.js";
import { photos } from "../db/schema.js";

export const photosRouter = Router();

// GET /api/photos - returns all portfolio photos
photosRouter.get("/", async (req, res) => {
  try {
    const allPhotos = await db.select().from(photos);
    res.json(allPhotos);
  } catch (error) {
    console.error("Error fetching photos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
