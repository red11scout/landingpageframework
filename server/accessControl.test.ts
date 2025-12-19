import { describe, it, expect } from "vitest";
import { isAuthorizedEmail, checkAccess } from "./accessControl";

describe("Access Control", () => {
  describe("isAuthorizedEmail", () => {
    it("should return true for authorized email", () => {
      expect(isAuthorizedEmail("drewgodwin@outlook.com")).toBe(true);
    });

    it("should be case-insensitive", () => {
      expect(isAuthorizedEmail("DREWGODWIN@OUTLOOK.COM")).toBe(true);
      expect(isAuthorizedEmail("DrewGodwin@Outlook.com")).toBe(true);
    });

    it("should return false for unauthorized email", () => {
      expect(isAuthorizedEmail("unauthorized@example.com")).toBe(false);
    });

    it("should return false for null or undefined", () => {
      expect(isAuthorizedEmail(null)).toBe(false);
      expect(isAuthorizedEmail(undefined)).toBe(false);
    });
  });

  describe("checkAccess", () => {
    it("should not throw for authorized email", () => {
      expect(() => checkAccess("drewgodwin@outlook.com")).not.toThrow();
    });

    it("should throw for unauthorized email", () => {
      expect(() => checkAccess("unauthorized@example.com")).toThrow(
        "Access denied. Your email is not authorized to access this application."
      );
    });

    it("should throw for null or undefined", () => {
      expect(() => checkAccess(null)).toThrow();
      expect(() => checkAccess(undefined)).toThrow();
    });
  });
});
