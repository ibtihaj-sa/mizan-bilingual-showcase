import { describe, expect, it } from "vitest";
import { isEmail, isStrongPassword, TRIAL_DAYS } from "@/lib/validation";
describe("account validation", () => {
  it("rejects malformed email", () => { expect(isEmail("a@b")).toBe(false); expect(isEmail("a@b.sa")).toBe(true); });
  it("requires 8+ chars with letter and digit", () => { expect(isStrongPassword("abc12")).toBe(false); expect(isStrongPassword("abcdefgh")).toBe(false); expect(isStrongPassword("abcdefg1")).toBe(true); });
  it("trial is 14 days", () => expect(TRIAL_DAYS).toBe(14));
});
