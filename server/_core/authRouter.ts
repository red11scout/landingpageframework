import { publicProcedure, router } from "./trpc";
import * as db from "../db";
import { checkAccess } from "../accessControl";

export const authRouter = router({
  me: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.user) return null;
    // Check if user's email is authorized
    checkAccess(ctx.user.email);
    return ctx.user;
  }),
  
  logout: publicProcedure.mutation(async ({ ctx }) => {
    // Clear session cookie
    ctx.res.clearCookie("manus_session");
    return { success: true };
  }),
});
