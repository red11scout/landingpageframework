import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { invokeLLM } from "./_core/llm";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import {
  createUseCaseSession,
  getUseCaseSession,
  listUseCaseSessions,
  updateUseCaseSessionAnswers,
  updateUseCaseSessionSynthesis,
} from "./db";
import {
  buildFinalSynthesis,
  calculateUseCaseMetrics,
  EPOCH_DEFINITION,
  evaluationSteps,
  fallbackGuidance,
  patternCatalog,
} from "./aiStudioCore";
import type { EvaluationAnswer, GuidanceEntry, ProblemStatement } from "../drizzle/schema";

const answerValueSchema = z.union([z.string(), z.number(), z.boolean(), z.array(z.string())]);

const evaluationAnswerSchema = z.object({
  stepId: z.string().min(1),
  question: z.string().min(1),
  value: answerValueSchema,
  updatedAt: z.string().min(1),
});

async function requestGuidance(input: {
  stepId: string;
  answers: EvaluationAnswer[];
  calculationSnapshot: ReturnType<typeof calculateUseCaseMetrics>;
}): Promise<GuidanceEntry> {
  const fallback = fallbackGuidance(input.stepId, input.answers, input.calculationSnapshot);

  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content:
            "You are a senior enterprise AI strategist with the rigor of MIT and Stanford researchers, the practicality of BCG, Bain, and McKinsey consultants, and the safety judgment of frontier AI labs. Write in concise Hemingway-inspired prose: clear, warm, direct, and executive-ready. Always reference the EPOCH framework by name for Human-in-the-Loop guidance.",
        },
        {
          role: "user",
          content: JSON.stringify({
            task: "Return contextual guidance for the user's current AI use-case evaluation step.",
            currentStepId: input.stepId,
            epochDefinition: EPOCH_DEFINITION,
            answers: input.answers,
            deterministicCalculationSnapshot: input.calculationSnapshot,
            requiredOutput: {
              recommendation: "Practical recommendation for this step.",
              benchmark: "Benchmark or planning range, clearly framed as directional unless provided by the user.",
              decisionGuidance: "AI vs ML vs rules engine guidance.",
              nextQuestion: "The best next question to ask the user.",
            },
          }),
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "ai_strategy_guidance",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              recommendation: { type: "string" },
              benchmark: { type: "string" },
              decisionGuidance: { type: "string" },
              nextQuestion: { type: "string" },
            },
            required: ["recommendation", "benchmark", "decisionGuidance", "nextQuestion"],
          },
        },
      },
    });

    const content = response.choices[0]?.message.content;
    const parsed = typeof content === "string" ? JSON.parse(content) : null;
    if (!parsed) return fallback;

    return {
      stepId: input.stepId,
      recommendation: String(parsed.recommendation || fallback.recommendation),
      benchmark: String(parsed.benchmark || fallback.benchmark),
      decisionGuidance: String(parsed.decisionGuidance || fallback.decisionGuidance),
      nextQuestion: String(parsed.nextQuestion || fallback.nextQuestion),
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.warn("[AI Studio] LLM guidance failed; using deterministic fallback.", error);
    return fallback;
  }
}

async function refineProblemNarrative(input: { problemStatement: ProblemStatement; answers: EvaluationAnswer[] }) {
  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content:
            "You write concise executive AI strategy briefs. Use a professional, polite, warm Hemingway style. Keep numbers exactly as provided. Do not invent calculations. Reference Human-in-the-Loop through the EPOCH framework by name.",
        },
        {
          role: "user",
          content: JSON.stringify({
            task: "Refine only the narrative field for the final AI use case problem statement.",
            problemStatement: input.problemStatement,
            answers: input.answers,
          }),
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "problem_narrative",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: { narrative: { type: "string" } },
            required: ["narrative"],
          },
        },
      },
    });

    const content = response.choices[0]?.message.content;
    const parsed = typeof content === "string" ? JSON.parse(content) : null;
    return typeof parsed?.narrative === "string" ? parsed.narrative : input.problemStatement.narrative;
  } catch (error) {
    console.warn("[AI Studio] Final narrative refinement failed; using deterministic synthesis.", error);
    return input.problemStatement.narrative;
  }
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  aiStudio: router({
    patternLibrary: publicProcedure.query(() => ({
      patterns: patternCatalog,
      evaluationSteps,
      epochDefinition: EPOCH_DEFINITION,
    })),
    calculate: publicProcedure.input(z.object({ answers: z.array(evaluationAnswerSchema) })).query(({ input }) =>
      calculateUseCaseMetrics(input.answers),
    ),
    sessions: protectedProcedure.query(({ ctx }) => listUseCaseSessions(ctx.user.id)),
    getSession: protectedProcedure.input(z.object({ sessionId: z.number().int().positive() })).query(({ ctx, input }) =>
      getUseCaseSession(ctx.user.id, input.sessionId),
    ),
    createSession: protectedProcedure.input(z.object({ title: z.string().min(1).max(180) })).mutation(({ ctx, input }) =>
      createUseCaseSession(ctx.user.id, input.title),
    ),
    saveAnswer: protectedProcedure
      .input(
        z.object({
          sessionId: z.number().int().positive(),
          currentStep: z.string().min(1),
          answer: evaluationAnswerSchema,
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const session = await getUseCaseSession(ctx.user.id, input.sessionId);
        if (!session) throw new Error("Session not found");

        const nextAnswers = [
          ...(session.answers ?? []).filter(answer => answer.stepId !== input.answer.stepId),
          input.answer,
        ];
        const calculationSnapshot = calculateUseCaseMetrics(nextAnswers);
        const guidanceEntry = await requestGuidance({
          stepId: input.currentStep,
          answers: nextAnswers,
          calculationSnapshot,
        });

        return updateUseCaseSessionAnswers({
          userId: ctx.user.id,
          sessionId: input.sessionId,
          currentStep: input.currentStep,
          answers: nextAnswers,
          calculationSnapshot,
          guidanceEntry,
        });
      }),
    synthesize: protectedProcedure.input(z.object({ sessionId: z.number().int().positive() })).mutation(async ({ ctx, input }) => {
      const session = await getUseCaseSession(ctx.user.id, input.sessionId);
      if (!session) throw new Error("Session not found");

      const synthesis = buildFinalSynthesis(session.answers ?? []);
      const narrative = await refineProblemNarrative({
        problemStatement: synthesis.problemStatement,
        answers: session.answers ?? [],
      });

      return updateUseCaseSessionSynthesis({
        userId: ctx.user.id,
        sessionId: input.sessionId,
        problemStatement: { ...synthesis.problemStatement, narrative },
        architectureConfig: synthesis.architectureConfig,
        calculationSnapshot: synthesis.calculationSnapshot,
      });
    }),
  }),
});

export type AppRouter = typeof appRouter;
