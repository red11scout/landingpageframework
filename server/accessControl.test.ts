import { describe, it, expect, beforeEach } from "vitest";
import { isAuthorizedEmail, checkAccess } from "./accessControl";
import * as db from "./db";
import { authorizedEmails } from "../drizzle/schema";

describe("Access Control", () => {
  describe("isAuthorizedEmail", () => {
    it("should return true for authorized email in database", async () => {
      // The email drewgodwin@outlook.com should be seeded in the database
      const result = await isAuthorizedEmail("drewgodwin@outlook.com");
      expect(result).toBe(true);
    });

    it("should be case-insensitive", async () => {
      const result = await isAuthorizedEmail("DREWGODWIN@OUTLOOK.COM");
      expect(result).toBe(true);
    });

    it("should return false for unauthorized email", async () => {
      const result = await isAuthorizedEmail("unauthorized@example.com");
      expect(result).toBe(false);
    });

    it("should return false for null or undefined", async () => {
      expect(await isAuthorizedEmail(null)).toBe(false);
      expect(await isAuthorizedEmail(undefined)).toBe(false);
    });
  });

  describe("checkAccess", () => {
    it("should not throw for authorized email", async () => {
      await expect(checkAccess("drewgodwin@outlook.com")).resolves.not.toThrow();
    });

    it("should throw for unauthorized email", async () => {
      await expect(checkAccess("unauthorized@example.com")).rejects.toThrow(
        "Access denied. Your email is not authorized to access this application."
      );
    });

    it("should throw for null or undefined", async () => {
      await expect(checkAccess(null)).rejects.toThrow();
      await expect(checkAccess(undefined)).rejects.toThrow();
    });
  });
});
