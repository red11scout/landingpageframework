import { int, json, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type EvaluationAnswer = {
  stepId: string;
  question: string;
  value: string | number | boolean | string[];
  updatedAt: string;
};

export type GuidanceEntry = {
  stepId: string;
  recommendation: string;
  benchmark: string;
  decisionGuidance: string;
  nextQuestion: string;
  createdAt: string;
};

export type CalculationSnapshot = {
  monthlyHoursRecovered: number;
  annualCapacityValue: number;
  automationReadiness: number;
  dataComplexityIndex: number;
  riskControlScore: number;
  formulaTrace: Record<string, string>;
};

export type ProblemStatement = {
  title: string;
  problem: string;
  currentState: string;
  desiredOutcome: string;
  leadingIndicators: string[];
  laggingIndicators: string[];
  kpiTargets: Array<{ name: string; baseline: string; target: string }>;
  aiCapabilityMapping: Array<{ capability: string; businessImpact: string }>;
  epochConsiderations: string[];
  decision: "AI" | "Machine Learning" | "Rules Engine" | "Process Redesign";
  narrative: string;
};

export type ArchitectureConfig = {
  patternId: string;
  patternName: string;
  components: Array<{
    id: string;
    label: string;
    layer: "experience" | "orchestration" | "intelligence" | "data" | "security" | "hardware";
    description: string;
    residency: string;
  }>;
  flows: Array<{ from: string; to: string; label: string }>;
  rationale: string;
};

export const useCaseSessions = mysqlTable("useCaseSessions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId")
    .notNull()
    .references(() => users.id),
  title: varchar("title", { length: 180 }).notNull(),
  status: mysqlEnum("status", ["draft", "ready", "archived"]).default("draft").notNull(),
  currentStep: varchar("currentStep", { length: 80 }).default("friction").notNull(),
  answers: json("answers").$type<EvaluationAnswer[]>().notNull(),
  guidanceHistory: json("guidanceHistory").$type<GuidanceEntry[]>().notNull(),
  problemStatement: json("problemStatement").$type<ProblemStatement | null>(),
  architectureConfig: json("architectureConfig").$type<ArchitectureConfig | null>(),
  calculationSnapshot: json("calculationSnapshot").$type<CalculationSnapshot | null>(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type UseCaseSession = typeof useCaseSessions.$inferSelect;
export type InsertUseCaseSession = typeof useCaseSessions.$inferInsert;
