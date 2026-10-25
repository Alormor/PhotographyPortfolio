import { Router } from "express";
import { eq, sql, asc } from "drizzle-orm";
import { db } from "../db/index.js";
import { workshops, tickets } from "../db/schema.js";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../auth.js";

export const workshopsRouter = Router();

// GET /api/workshops - returns all workshops
workshopsRouter.get("/", async (req, res) => {
  try {
    const allWorkshops = await db.select().from(workshops).orderBy(asc(workshops.id));
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

// POST /api/workshops/:id/book - Real booking & decrement spots
workshopsRouter.post("/:id/book", async (req, res) => {
  try {
    // 1. Check user session
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session?.user) {
      return res.status(401).json({ error: "You must be logged in to book a ticket" });
    }
    const workshopId = Number(req.params.id);
    const quantity = Number(req.body.quantity) || 1;
    // 2. Fetch workshop
    const [workshop] = await db
      .select()
      .from(workshops)
      .where(eq(workshops.id, workshopId))
      .limit(1);
    if (!workshop) {
      return res.status(404).json({ error: "Workshop not found" });
    }
    if (workshop.availableTickets < quantity) {
      return res.status(400).json({ error: "Not enough tickets available" });
    }
    const totalPrice = workshop.price * quantity;
    // 3. Insert into tickets table
    await db.insert(tickets).values({
      userId: session.user.id,
      workshopId: workshop.id,
      quantity,
      totalPrice,
    });
    // 4. Decrement availableTickets in database
    const [updatedWorkshop] = await db
      .update(workshops)
      .set({
        availableTickets: sql`${workshops.availableTickets} - ${quantity}`,
      })
      .where(eq(workshops.id, workshopId))
      .returning();
    res.json({
      success: true,
      message: `Successfully booked ${quantity} ticket(s)`,
      workshop: updatedWorkshop,
    });
  } catch (error) {
    console.error("Error booking workshop:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});