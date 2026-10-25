import { Router } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { workshops } from "../db/schema.js";

export const workshopsRouter = Router();

// GET /api/workshops - returns all workshops
workshopsRouter.get("/", async (req, res) => {
  try {
    const allWorkshops = await db.select().from(workshops);
    res.json(allWorkshops);
  } catch (error) {
    console.error("Error fetching workshops:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/workshops/:id - returns a single workshop by ID
workshopsRouter.get("/:id", async (req, res) => {
  try {
    const [workshop] = await db
      .select()
      .from(workshops)
      .where(eq(workshops.id, Number(req.params.id)))
      .limit(1);

    if (!workshop) {
      return res.status(404).json({ error: "Workshop not found" });
    }
    res.json(workshop);
  } catch (error) {
    console.error("Error fetching workshop:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
