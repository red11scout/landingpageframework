import { eq, and } from "drizzle-orm";
import { customAuth, resetTokens, InsertCustomAuth, InsertResetToken } from "../drizzle/schema";
import { getDb } from "./db";
import { nanoid } from "nanoid";

/**
 * Authenticate user with email and PIN
 */
export async function authenticateUser(email: string, pin: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db
    .select()
    .from(customAuth)
    .where(and(eq(customAuth.email, email), eq(customAuth.pin, pin), eq(customAuth.isActive, 1)))
    .limit(1);

  if (result.length === 0) {
    return null;
  }

  const user = result[0];

  // Update last signed in timestamp
  await db
    .update(customAuth)
    .set({ lastSignedIn: new Date() })
    .where(eq(customAuth.id, user.id));

  return user;
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) {
    return null;
  }

  const result = await db.select().from(customAuth).where(eq(customAuth.email, email)).limit(1);

  return result.length > 0 ? result[0] : null;
}

/**
 * Get user by ID
 */
export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) {
    return null;
  }

  const result = await db.select().from(customAuth).where(eq(customAuth.id, id)).limit(1);

  return result.length > 0 ? result[0] : null;
}

/**
 * Create a password reset token
 */
export async function createResetToken(email: string): Promise<string> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  // Check if user exists
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }

  // Generate unique token
  const token = nanoid(32);
  
  // Token expires in 1 hour
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  await db.insert(resetTokens).values({
    email,
    token,
    expiresAt,
    used: 0,
  });

  return token;
}

/**
 * Verify and use a reset token
 */
export async function verifyResetToken(token: string): Promise<{ email: string } | null> {
  const db = await getDb();
  if (!db) {
    return null;
  }

  const result = await db
    .select()
    .from(resetTokens)
    .where(and(eq(resetTokens.token, token), eq(resetTokens.used, 0)))
    .limit(1);

  if (result.length === 0) {
    return null;
  }

  const resetToken = result[0];

  // Check if token is expired
  if (new Date() > resetToken.expiresAt) {
    return null;
  }

  return { email: resetToken.email };
}

/**
 * Mark reset token as used
 */
export async function markTokenAsUsed(token: string) {
  const db = await getDb();
  if (!db) {
    return;
  }

  await db.update(resetTokens).set({ used: 1 }).where(eq(resetTokens.token, token));
}

/**
 * Reset user PIN
 */
export async function resetUserPin(email: string, newPin: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.update(customAuth).set({ pin: newPin, updatedAt: new Date() }).where(eq(customAuth.email, email));
}
