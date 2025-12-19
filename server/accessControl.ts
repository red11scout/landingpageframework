import { authorizedEmails } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import * as db from "./db";

export async function isAuthorizedEmail(email: string | null | undefined): Promise<boolean> {
  if (!email) return false;
  
  const database = await db.getDb();
  if (!database) {
    console.warn("[AccessControl] Database not available, denying access");
    return false;
  }

  const result = await database
    .select()
    .from(authorizedEmails)
    .where(eq(authorizedEmails.email, email.toLowerCase()))
    .limit(1);

  return result.length > 0;
}

export async function checkAccess(email: string | null | undefined): Promise<void> {
  const authorized = await isAuthorizedEmail(email);
  if (!authorized) {
    throw new Error("Access denied. Your email is not authorized to access this application.");
  }
}
