import { publicProcedure, router } from "./trpc";
import * as db from "../db";

export const authRouter = router({
  me: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.user) return null;
    return ctx.user;
  }),
  
  logout: publicProcedure.mutation(async ({ ctx }) => {
    // Clear session cookie
    ctx.res.clearCookie("manus_session");
    return { success: true };
  }),
});
