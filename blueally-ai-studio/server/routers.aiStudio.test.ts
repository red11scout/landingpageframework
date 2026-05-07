import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";
import type { EvaluationAnswer } from "../drizzle/schema";

const mockListUseCaseSessions = vi.fn();
const mockGetUseCaseSession = vi.fn();
const mockCreateUseCaseSession = vi.fn();
const mockUpdateUseCaseSessionAnswers = vi.fn();
const mockUpdateUseCaseSessionSynthesis = vi.fn();

vi.mock("./db", () => ({
  createUseCaseSession: mockCreateUseCaseSession,
  getUseCaseSession: mockGetUseCaseSession,
  listUseCaseSessions: mockListUseCaseSessions,
  updateUseCaseSessionAnswers: mockUpdateUseCaseSessionAnswers,
  updateUseCaseSessionSynthesis: mockUpdateUseCaseSessionSynthesis,
}));

vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn().mockResolvedValue({
    choices: [
      {
        message: {
          content: JSON.stringify({
            recommendation: "Prioritize a narrow enterprise pilot with measurable executive value.",
            benchmark: "Comparable pilots often track adoption, retrieval quality, and cycle-time lift before expansion.",
            decisionGuidance: "Use AI for synthesis, ML for prediction, and rules for deterministic approval gates.",
            nextQuestion: "Which EPOCH handoff threshold requires a human reviewer?",
            narrative: "Refined executive narrative with EPOCH Human-in-the-Loop controls.",
          }),
        },
      },
    ],
  }),
}));

const { appRouter } = await import("./routers");

function createContext(userId = 7): TrpcContext {
  return {
    user: {
      id: userId,
      openId: `user-${userId}`,
      email: `user-${userId}@example.com`,
      name: `User ${userId}`,
      loginMethod: "manus",
      role: "user",
      createdAt: new Date("2026-05-07T00:00:00.000Z"),
      updatedAt: new Date("2026-05-07T00:00:00.000Z"),
      lastSignedIn: new Date("2026-05-07T00:00:00.000Z"),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function createAnswer(stepId: string, value: string | number): EvaluationAnswer {
  return {
    stepId,
    question: `Question for ${stepId}`,
    value,
    updatedAt: "2026-05-07T00:00:00.000Z",
  };
}

describe("aiStudio router authenticated persistence", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("lists and creates sessions using the authenticated user id", async () => {
    const caller = appRouter.createCaller(createContext(11));
    mockListUseCaseSessions.mockResolvedValue([{ id: 1, userId: 11, title: "Existing" }]);
    mockCreateUseCaseSession.mockResolvedValue({ id: 2, userId: 11, title: "New Strategy" });

    await expect(caller.aiStudio.sessions()).resolves.toEqual([{ id: 1, userId: 11, title: "Existing" }]);
    await expect(caller.aiStudio.createSession({ title: "New Strategy" })).resolves.toMatchObject({ id: 2, userId: 11 });

    expect(mockListUseCaseSessions).toHaveBeenCalledWith(11);
    expect(mockCreateUseCaseSession).toHaveBeenCalledWith(11, "New Strategy");
  });

  it("saves an answer by replacing the same step, calculating server-side metrics, adding LLM guidance, and preserving user scope", async () => {
    const caller = appRouter.createCaller(createContext(12));
    const existingAnswer = createAnswer("kpis", "old KPI");
    const nextAnswer = createAnswer("kpis", "cycle time, quality, cost-to-serve");
    const updatedSession = { id: 99, userId: 12, answers: [nextAnswer] };

    mockGetUseCaseSession.mockResolvedValue({ id: 99, userId: 12, answers: [existingAnswer], guidanceHistory: [] });
    mockUpdateUseCaseSessionAnswers.mockResolvedValue(updatedSession);

    await expect(caller.aiStudio.saveAnswer({ sessionId: 99, currentStep: "kpis", answer: nextAnswer })).resolves.toEqual(updatedSession);

    expect(mockGetUseCaseSession).toHaveBeenCalledWith(12, 99);
    expect(mockUpdateUseCaseSessionAnswers).toHaveBeenCalledWith(expect.objectContaining({
      userId: 12,
      sessionId: 99,
      currentStep: "kpis",
      answers: [nextAnswer],
      guidanceEntry: expect.objectContaining({
        stepId: "kpis",
        recommendation: "Prioritize a narrow enterprise pilot with measurable executive value.",
      }),
      calculationSnapshot: expect.objectContaining({
        formulaTrace: expect.any(Object),
      }),
    }));
  });

  it("prevents answer updates when the session is not found for the authenticated user", async () => {
    const caller = appRouter.createCaller(createContext(13));
    mockGetUseCaseSession.mockResolvedValue(undefined);

    await expect(caller.aiStudio.saveAnswer({
      sessionId: 101,
      currentStep: "friction",
      answer: createAnswer("friction", "duplicate manual effort"),
    })).rejects.toThrow("Session not found");

    expect(mockGetUseCaseSession).toHaveBeenCalledWith(13, 101);
    expect(mockUpdateUseCaseSessionAnswers).not.toHaveBeenCalled();
  });

  it("generates and persists final synthesis through the authenticated user scope", async () => {
    const caller = appRouter.createCaller(createContext(14));
    mockGetUseCaseSession.mockResolvedValue({
      id: 202,
      userId: 14,
      answers: [
        createAnswer("friction", "claims analysts lose time reconciling knowledge sources"),
        createAnswer("leadingIndicators", "active users, retrieval precision"),
        createAnswer("laggingIndicators", "cycle time reduction, cost-to-serve improvement"),
      ],
    });
    mockUpdateUseCaseSessionSynthesis.mockResolvedValue({ id: 202, userId: 14, status: "ready" });

    await expect(caller.aiStudio.synthesize({ sessionId: 202 })).resolves.toMatchObject({ id: 202, userId: 14, status: "ready" });

    expect(mockGetUseCaseSession).toHaveBeenCalledWith(14, 202);
    expect(mockUpdateUseCaseSessionSynthesis).toHaveBeenCalledWith(expect.objectContaining({
      userId: 14,
      sessionId: 202,
      problemStatement: expect.objectContaining({
        narrative: "Refined executive narrative with EPOCH Human-in-the-Loop controls.",
        epochConsiderations: expect.any(Array),
      }),
      architectureConfig: expect.objectContaining({
        components: expect.any(Array),
        flows: expect.any(Array),
      }),
      calculationSnapshot: expect.objectContaining({
        formulaTrace: expect.any(Object),
      }),
    }));
  });
});
