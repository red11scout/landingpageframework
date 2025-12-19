import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import {
  authenticateUser,
  createResetToken,
  verifyResetToken,
  markTokenAsUsed,
  resetUserPin,
  getUserById,
} from "./customAuth";
import { getSessionCookieOptions } from "./_core/cookies";

const CUSTOM_AUTH_COOKIE = "custom_auth_session";

export const authRouter = router({
  /**
   * Login with email and PIN
   */
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        pin: z.string().length(6),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await authenticateUser(input.email, input.pin);

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or PIN",
        });
      }

      // Set session cookie using Express res.cookie
      const sessionData = JSON.stringify({ userId: user.id, email: user.email });
      const cookieOptions = getSessionCookieOptions(ctx.req);
      
      ctx.res.cookie(CUSTOM_AUTH_COOKIE, sessionData, {
        ...cookieOptions,
        maxAge: 60 * 60 * 24 * 30 * 1000, // 30 days in milliseconds
      });

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      };
    }),

  /**
   * Logout - clear session cookie
   */
  logout: publicProcedure.mutation(({ ctx }) => {
    const cookieOptions = getSessionCookieOptions(ctx.req);
    ctx.res.clearCookie(CUSTOM_AUTH_COOKIE, cookieOptions);
    return { success: true };
  }),

  /**
   * Get current authenticated user
   */
  me: publicProcedure.query(async ({ ctx }) => {
    const sessionCookie = ctx.req.cookies?.[CUSTOM_AUTH_COOKIE];
    
    if (!sessionCookie) {
      return null;
    }

    try {
      const sessionData = JSON.parse(sessionCookie);
      const user = await getUserById(sessionData.userId);

      if (!user || user.isActive !== 1) {
        return null;
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    } catch (error) {
      return null;
    }
  }),

  /**
   * Request password reset - generates token
   */
  requestReset: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const token = await createResetToken(input.email);

        // In production, send this via email
        // For now, we'll log it to console
        const resetLink = `${process.env.VITE_APP_URL || "http://localhost:3000"}/reset-password?token=${token}`;
        console.log(`\n🔐 Password Reset Link for ${input.email}:`);
        console.log(resetLink);
        console.log(`\nToken: ${token}\n`);

        return {
          success: true,
          message: "Reset link has been sent to your email (check server console for now)",
        };
      } catch (error) {
        // Don't reveal if user exists or not
        return {
          success: true,
          message: "If the email exists, a reset link has been sent",
        };
      }
    }),

  /**
   * Verify reset token
   */
  verifyToken: publicProcedure
    .input(
      z.object({
        token: z.string(),
      })
    )
    .query(async ({ input }) => {
      const result = await verifyResetToken(input.token);

      if (!result) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid or expired reset token",
        });
      }

      return {
        email: result.email,
      };
    }),

  /**
   * Reset PIN with token
   */
  resetPin: publicProcedure
    .input(
      z.object({
        token: z.string(),
        newPin: z.string().length(6),
      })
    )
    .mutation(async ({ input }) => {
      const result = await verifyResetToken(input.token);

      if (!result) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid or expired reset token",
        });
      }

      await resetUserPin(result.email, input.newPin);
      await markTokenAsUsed(input.token);

      return {
        success: true,
        message: "PIN has been reset successfully",
      };
    }),
});
