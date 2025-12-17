import { drizzle } from "drizzle-orm/mysql2";
import { customAuth } from "./drizzle/schema.js";
import { eq } from "drizzle-orm";
import "dotenv/config";

const db = drizzle(process.env.DATABASE_URL);

async function seedAuth() {
  try {
    const email = "drewgodwin@outlook.com";
    const pin = "441515";
    const name = "Drew Godwin";

    // Check if user already exists
    const existing = await db.select().from(customAuth).where(eq(customAuth.email, email)).limit(1);

    if (existing.length > 0) {
      console.log(`✓ User ${email} already exists in database`);
      // Update PIN if different
      await db.update(customAuth)
        .set({ pin, name, isActive: 1, updatedAt: new Date() })
        .where(eq(customAuth.email, email));
      console.log(`✓ Updated PIN for ${email}`);
    } else {
      // Insert new user
      await db.insert(customAuth).values({
        email,
        pin,
        name,
        isActive: 1,
      });
      console.log(`✓ Created new user ${email} with PIN authentication`);
    }

    console.log("\n✅ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedAuth();
