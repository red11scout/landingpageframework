import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { authorizedEmails } from "./drizzle/schema.ts";

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

// Seed initial authorized email
await db.insert(authorizedEmails).values({
  email: "drewgodwin@outlook.com",
  addedBy: "system",
}).onDuplicateKeyUpdate({ set: { email: "drewgodwin@outlook.com" } });

console.log("✓ Seeded authorized email: drewgodwin@outlook.com");

await connection.end();
