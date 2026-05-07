import { describe, expect, it } from "vitest";
import {
  buildArchitectureConfig,
  buildFinalSynthesis,
  buildProblemStatement,
  calculateUseCaseMetrics,
  EPOCH_DEFINITION,
  fallbackGuidance,
  patternCatalog,
} from "./aiStudioCore";
import type { EvaluationAnswer } from "../drizzle/schema";

const requiredGroups = [
  "Storage",
  "Orchestration",
  "Tools / MCPs / APIs",
  "Security",
  "Identity and Auth",
  "Observability and Explainability",
  "Memory / KV Cache",
  "Human-in-the-Loop via EPOCH",
  "Output Types",
];

function answer(stepId: string, value: string | number): EvaluationAnswer {
  return {
    stepId,
    question: `Question for ${stepId}`,
    value,
    updatedAt: "2026-05-07T00:00:00.000Z",
  };
}

const completeAnswers: EvaluationAnswer[] = [
  answer("friction", "Analysts spend too much time reconciling claims, policies, and customer messages."),
  answer("current_state", "The work moves through CRM, ticketing, SharePoint, and ERP before a senior reviewer approves it."),
  answer("kpis", "cycle time, first-pass quality, cost-to-serve"),
  answer("leadingIndicators", "active users, retrieval precision, human approval throughput"),
  answer("laggingIndicators", "cycle time reduction, quality defect reduction, cost-to-serve improvement"),
  answer("desiredOutcome", "Give operators a governed cockpit that drafts answers and escalates exceptions."),
  answer("data", "CRM records, SharePoint policies, ERP transactions, and historical tickets"),
  answer("monthlyOccurrences", 100),
  answer("minutesPerOccurrence", 30),
  answer("usersImpacted", 10),
  answer("automationPotential", 0.5),
  answer("hourlyCost", 50),
  answer("dataSources", 5),
  answer("riskCriticality", 2),
  answer("governance", "Use EPOCH for risk classification, approval thresholds, exception review, audits, and handoff."),
];

describe("AI Studio pattern catalog", () => {
  it("exposes the top five AI architecture patterns with complete drill-down coverage", () => {
    expect(patternCatalog.map(pattern => pattern.id)).toEqual(["rag", "agentic", "fine_tuning", "multi_modal", "hybrid"]);

    for (const pattern of patternCatalog) {
      expect(pattern.flow.length).toBeGreaterThanOrEqual(6);
      expect(pattern.onPrem.length).toBeGreaterThanOrEqual(6);
      expect(pattern.components.map(component => component.group)).toEqual(requiredGroups);
      expect(pattern.components.find(component => component.group.includes("EPOCH"))?.items.join(" ")).toContain("Handoff");
    }
  });
});

describe("AI Studio deterministic calculations", () => {
  it("returns repeatable values from the HyperFormula calculation service", () => {
    const first = calculateUseCaseMetrics(completeAnswers);
    const second = calculateUseCaseMetrics(completeAnswers);

    expect(first).toEqual(second);
    expect(first.monthlyHoursRecovered).toBe(250);
    expect(first.annualCapacityValue).toBe(150000);
    expect(first.formulaTrace.monthlyHoursRecovered).toContain("monthlyOccurrences");
    expect(first.formulaTrace.annualCapacityValue).toContain("monthlyHoursRecovered");
  });
});

describe("AI Studio synthesis", () => {
  it("builds a structured problem statement with user-provided leading and lagging indicators plus EPOCH controls", () => {
    const calculation = calculateUseCaseMetrics(completeAnswers);
    const statement = buildProblemStatement(completeAnswers, calculation);

    expect(statement.problem).toContain("Analysts");
    expect(statement.leadingIndicators).toEqual(["active users", "retrieval precision", "human approval throughput"]);
    expect(statement.laggingIndicators).toEqual(["cycle time reduction", "quality defect reduction", "cost-to-serve improvement"]);
    expect(statement.aiCapabilityMapping.some(item => item.capability === "Deterministic business calculations")).toBe(true);
    expect(statement.epochConsiderations.join(" ")).toContain("EPOCH");
  });

  it("generates an architecture configuration that mirrors the explorer diagram language and includes private residency", () => {
    const calculation = calculateUseCaseMetrics(completeAnswers);
    const architecture = buildArchitectureConfig(completeAnswers, calculation);

    expect(architecture.components.length).toBeGreaterThanOrEqual(8);
    expect(architecture.flows.length).toBeGreaterThanOrEqual(7);
    expect(architecture.components.map(component => component.id)).toContain("epoch");
    expect(architecture.components.every(component => component.residency.length > 0)).toBe(true);
    expect(architecture.rationale).toContain("EPOCH Human-in-the-Loop");
  });

  it("returns a complete final synthesis with calculation, problem statement, and architecture", () => {
    const synthesis = buildFinalSynthesis(completeAnswers);

    expect(synthesis.calculationSnapshot.annualCapacityValue).toBe(150000);
    expect(synthesis.problemStatement.title).toBe("AI Use Case Strategy Brief");
    expect(synthesis.architectureConfig.patternName.length).toBeGreaterThan(0);
  });
});

describe("AI Studio guidance fallback", () => {
  it("keeps guidance executive-ready when the live LLM is unavailable", () => {
    const calculation = calculateUseCaseMetrics(completeAnswers);
    const guidance = fallbackGuidance("governance", completeAnswers, calculation);

    expect(guidance.stepId).toBe("governance");
    expect(guidance.benchmark).toContain("recoverable hours per month");
    expect(guidance.decisionGuidance).toContain("rules engine");
    expect(EPOCH_DEFINITION).toContain("Evaluate, Plan, Operate, Check, and Handoff");
  });
});
