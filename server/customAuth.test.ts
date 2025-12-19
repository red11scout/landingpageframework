import { describe, expect, it, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = {
  id: number;
  email: string;
  name: string | null;
};

type CookieCall = {
  name: string;
  value: string;
  options: Record<string, unknown>;
};

function createMockContext(): {
  ctx: TrpcContext;
  cookies: CookieCall[];
  clearedCookies: string[];
} {
  const cookies: CookieCall[] = [];
  const clearedCookies: string[] = [];

  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
      cookies: {},
    } as TrpcContext["req"],
    res: {
      cookie: (name: string, value: string, options: Record<string, unknown>) => {
        cookies.push({ name, value, options });
      },
      clearCookie: (name: string) => {
        clearedCookies.push(name);
      },
    } as TrpcContext["res"],
  };

  return { ctx, cookies, clearedCookies };
}

describe("customAuth.login", () => {
  it("should successfully authenticate with correct credentials", async () => {
    const { ctx, cookies } = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.customAuth.login({
      email: "drewgodwin@outlook.com",
      pin: "441515",
    });

    expect(result.success).toBe(true);
    expect(result.user.email).toBe("drewgodwin@outlook.com");
    expect(cookies).toHaveLength(1);
    expect(cookies[0]?.name).toBe("custom_auth_session");
  });

  it("should reject invalid PIN", async () => {
    const { ctx } = createMockContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.customAuth.login({
        email: "drewgodwin@outlook.com",
        pin: "000000",
      })
    ).rejects.toThrow("Invalid email or PIN");
  });

  it("should reject invalid email", async () => {
    const { ctx } = createMockContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.customAuth.login({
        email: "wrong@email.com",
        pin: "441515",
      })
    ).rejects.toThrow("Invalid email or PIN");
  });
});

describe("customAuth.logout", () => {
  it("should clear the session cookie", async () => {
    const { ctx, clearedCookies } = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.customAuth.logout();

    expect(result.success).toBe(true);
    expect(clearedCookies).toContain("custom_auth_session");
  });
});

describe("customAuth.me", () => {
  it("should return null when not authenticated", async () => {
    const { ctx } = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.customAuth.me();

    expect(result).toBeNull();
  });

  it("should return user data when authenticated", async () => {
    const { ctx } = createMockContext();

    // Simulate authenticated session
    const sessionData = JSON.stringify({ userId: 1, email: "drewgodwin@outlook.com" });
    ctx.req.headers.cookie = `custom_auth_session=${encodeURIComponent(sessionData)}`;
    ctx.req.cookies = { custom_auth_session: sessionData };

    const caller = appRouter.createCaller(ctx);
    const result = await caller.customAuth.me();

    expect(result).not.toBeNull();
    expect(result?.email).toBe("drewgodwin@outlook.com");
  });
});

describe("customAuth.requestReset", () => {
  it("should generate reset token for valid email", async () => {
    const { ctx } = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.customAuth.requestReset({
      email: "drewgodwin@outlook.com",
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain("Reset link");
  });

  it("should not reveal if email does not exist", async () => {
    const { ctx } = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.customAuth.requestReset({
      email: "nonexistent@email.com",
    });

    // Should still return success to not reveal user existence
    expect(result.success).toBe(true);
  });
});
