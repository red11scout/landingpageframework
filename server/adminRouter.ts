import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import * as db from "./db";
import { authorizedEmails } from "../drizzle/schema";
import { eq } from "drizzle-orm";

// Check if user is admin (drewgodwin@outlook.com)
function isAdmin(email: string | null | undefined): boolean {
  return email === "drewgodwin@outlook.com";
}

export const adminRouter = router({
  // List all authorized emails
  listAuthorizedEmails: protectedProcedure.query(async ({ ctx }) => {
    if (!isAdmin(ctx.user.email)) {
      throw new Error("Admin access required");
    }
    
    const emails = await (await db.getDb())!.select().from(authorizedEmails);
    return emails;
  }),

  // Add a new authorized email
  addAuthorizedEmail: protectedProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      if (!isAdmin(ctx.user.email)) {
        throw new Error("Admin access required");
      }

      const existing = await (await db.getDb())!
        .select()
        .from(authorizedEmails)
        .where(eq(authorizedEmails.email, input.email.toLowerCase()));

      if (existing.length > 0) {
        throw new Error("Email already authorized");
      }

      await (await db.getDb())!.insert(authorizedEmails).values({
        email: input.email.toLowerCase(),
        addedBy: ctx.user.email,
      });

      return { success: true, email: input.email.toLowerCase() };
    }),

  // Remove an authorized email
  removeAuthorizedEmail: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (!isAdmin(ctx.user.email)) {
        throw new Error("Admin access required");
      }

      // Prevent removing own email
      const email = await (await db.getDb())!
        .select()
        .from(authorizedEmails)
        .where(eq(authorizedEmails.id, input.id));

      if (email.length > 0 && email[0].email === ctx.user.email) {
        throw new Error("Cannot remove your own email");
      }

      await (await db.getDb())!.delete(authorizedEmails).where(eq(authorizedEmails.id, input.id));

      return { success: true };
    }),
});
