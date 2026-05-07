import { and, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  ArchitectureConfig,
  CalculationSnapshot,
  EvaluationAnswer,
  GuidanceEntry,
  InsertUseCaseSession,
  InsertUser,
  ProblemStatement,
  useCaseSessions,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function listUseCaseSessions(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(useCaseSessions)
    .where(eq(useCaseSessions.userId, userId))
    .orderBy(desc(useCaseSessions.updatedAt));
}

export async function getUseCaseSession(userId: number, sessionId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const rows = await db
    .select()
    .from(useCaseSessions)
    .where(and(eq(useCaseSessions.id, sessionId), eq(useCaseSessions.userId, userId)))
    .limit(1);

  return rows[0];
}

export function createInitialUseCaseSessionValues(userId: number, title: string): InsertUseCaseSession {
  return {
    userId,
    title,
    status: "draft",
    currentStep: "friction",
    answers: [],
    guidanceHistory: [],
    problemStatement: null,
    architectureConfig: null,
    calculationSnapshot: null,
  };
}

export function buildGuidanceHistory(existing: GuidanceEntry[] | null | undefined, entry?: GuidanceEntry): GuidanceEntry[] {
  return entry ? [...(existing ?? []), entry] : existing ?? [];
}

export async function createUseCaseSession(userId: number, title: string) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");

  const values = createInitialUseCaseSessionValues(userId, title);

  const result = await db.insert(useCaseSessions).values(values);
  const insertId = Number((result as unknown as Array<{ insertId?: number }>)[0]?.insertId ?? 0);

  if (insertId > 0) {
    return getUseCaseSession(userId, insertId);
  }

  const sessions = await listUseCaseSessions(userId);
  return sessions[0];
}

export async function updateUseCaseSessionAnswers(input: {
  userId: number;
  sessionId: number;
  currentStep: string;
  answers: EvaluationAnswer[];
  calculationSnapshot: CalculationSnapshot;
  guidanceEntry?: GuidanceEntry;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");

  const session = await getUseCaseSession(input.userId, input.sessionId);
  if (!session) throw new Error("Session not found");

  const guidanceHistory = buildGuidanceHistory(session.guidanceHistory, input.guidanceEntry);

  await db
    .update(useCaseSessions)
    .set({
      currentStep: input.currentStep,
      answers: input.answers,
      guidanceHistory,
      calculationSnapshot: input.calculationSnapshot,
      updatedAt: new Date(),
    })
    .where(and(eq(useCaseSessions.id, input.sessionId), eq(useCaseSessions.userId, input.userId)));

  return getUseCaseSession(input.userId, input.sessionId);
}

export async function updateUseCaseSessionSynthesis(input: {
  userId: number;
  sessionId: number;
  problemStatement: ProblemStatement;
  architectureConfig: ArchitectureConfig;
  calculationSnapshot: CalculationSnapshot;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");

  await db
    .update(useCaseSessions)
    .set({
      status: "ready",
      problemStatement: input.problemStatement,
      architectureConfig: input.architectureConfig,
      calculationSnapshot: input.calculationSnapshot,
      updatedAt: new Date(),
    })
    .where(and(eq(useCaseSessions.id, input.sessionId), eq(useCaseSessions.userId, input.userId)));

  return getUseCaseSession(input.userId, input.sessionId);
}
