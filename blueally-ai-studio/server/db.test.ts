import { describe, expect, it } from "vitest";
import { buildGuidanceHistory, createInitialUseCaseSessionValues } from "./db";
import type { GuidanceEntry } from "../drizzle/schema";

const guidanceEntry: GuidanceEntry = {
  stepId: "kpis",
  recommendation: "Use a narrow pilot scorecard with a leading adoption signal and a lagging business impact measure.",
  benchmark: "Comparable enterprise workflow pilots often monitor retrieval precision and cycle-time movement before scaling.",
  decisionGuidance: "Use AI for language synthesis, ML for prediction, and rules for deterministic approval gates.",
  nextQuestion: "Which executive owner can approve the EPOCH handoff thresholds?",
  createdAt: "2026-05-07T00:00:00.000Z",
};

describe("AI Studio persistence helpers", () => {
  it("creates a user-scoped draft session payload with empty persisted artifacts", () => {
    const values = createInitialUseCaseSessionValues(42, "Claims AI Strategy");

    expect(values).toMatchObject({
      userId: 42,
      title: "Claims AI Strategy",
      status: "draft",
      currentStep: "friction",
      answers: [],
      guidanceHistory: [],
      problemStatement: null,
      architectureConfig: null,
      calculationSnapshot: null,
    });
  });

  it("appends new guidance entries without mutating existing guidance history", () => {
    const existing = [{ ...guidanceEntry, stepId: "friction" }];
    const merged = buildGuidanceHistory(existing, guidanceEntry);

    expect(merged).toHaveLength(2);
    expect(merged[0]?.stepId).toBe("friction");
    expect(merged[1]?.stepId).toBe("kpis");
    expect(existing).toHaveLength(1);
  });

  it("preserves an empty guidance history when no new LLM result is available", () => {
    expect(buildGuidanceHistory(undefined)).toEqual([]);
    expect(buildGuidanceHistory(null)).toEqual([]);
  });
});
