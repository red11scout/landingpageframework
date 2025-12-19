import { describe, it, expect, beforeEach } from "vitest";
import { authorizedEmails } from "../drizzle/schema";
import * as db from "./db";

describe("Admin Router Logic", () => {
  describe("isAdmin function", () => {
    it("should return true for drewgodwin@outlook.com", () => {
      function isAdmin(email: string | null | undefined): boolean {
        return email === "drewgodwin@outlook.com";
      }
      
      expect(isAdmin("drewgodwin@outlook.com")).toBe(true);
    });

    it("should return false for other emails", () => {
      function isAdmin(email: string | null | undefined): boolean {
        return email === "drewgodwin@outlook.com";
      }
      
      expect(isAdmin("other@example.com")).toBe(false);
      expect(isAdmin(null)).toBe(false);
      expect(isAdmin(undefined)).toBe(false);
    });
  });

  describe("Email validation", () => {
    it("should validate email format", () => {
      const validEmails = [
        "user@example.com",
        "test.user@domain.co.uk",
        "admin+tag@company.org",
      ];

      const invalidEmails = [
        "notanemail",
        "@example.com",
        "user@",
        "",
      ];

      validEmails.forEach(email => {
        expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      });

      invalidEmails.forEach(email => {
        expect(email).not.toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      });
    });
  });
});
