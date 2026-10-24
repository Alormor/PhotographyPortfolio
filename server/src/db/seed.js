import "dotenv/config";
import { db } from "./index.js";
import { photos, workshops } from "./schema.js";
import { initialPhotos, initialWorkshops } from "./seedData.js";

async function seed() {
  console.log("Seeding database...");

  // Optional: clear existing to avoid duplicate rows if re-run
  await db.delete(photos);
  await db.delete(workshops);

  // Insert photos
  await db.insert(photos).values(initialPhotos);
  console.log(`Inserted ${initialPhotos.length} photos`);

  // Insert workshops
  await db.insert(workshops).values(initialWorkshops);
  console.log(`Inserted ${initialWorkshops.length} workshops`);

  console.log("Database successfully seeded!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
