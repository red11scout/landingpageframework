import { useMemo, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import {
  ArrowRight,
  Brain,
  Building2,
  CheckCircle2,
  Cpu,
  Database,
  GitBranch,
  KeyRound,
  Layers3,
  Loader2,
  LockKeyhole,
  Network,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";

type AnswerValue = string | number | boolean | string[];

type EvaluationAnswer = {
  stepId: string;
  question: string;
  value: AnswerValue;
  updatedAt: string;
};

type PatternComponent = {
  group: string;
  items: readonly string[] | string[];
};

type Pattern = {
  id: string;
  name: string;
  shortName: string;
  promise: string;
  bestFor: string;
  risk: string;
  flow: readonly string[] | string[];
  components: readonly PatternComponent[] | PatternComponent[];
  onPrem: readonly string[] | string[];
};

type Step = {
  id: string;
  title: string;
  prompt: string;
};

const fallbackPatterns: Pattern[] = [
  {
    id: "rag",
    name: "Retrieval-Augmented Generation",
    shortName: "RAG",
    promise: "Ground the model in trusted enterprise knowledge before it speaks.",
    bestFor: "Knowledge assistants, field support, proposal generation, and regulated Q&A.",
    risk: "Retrieval quality, data permissions, source freshness, and citation fidelity.",
    flow: ["User Intent", "Identity Gate", "Retriever", "Vector + SQL Stores", "LLM", "Grounded Output", "EPOCH Review"],
    components: [
      { group: "Storage", items: ["Vector DB", "SQL metadata", "Object storage"] },
      { group: "Human-in-the-Loop via EPOCH", items: ["Evaluate", "Plan", "Operate", "Check", "Handoff"] },
    ],
    onPrem: ["GPU node", "Private vector store", "IAM gateway", "SIEM", "Review console"],
  },
];

const fallbackSteps: Step[] = [
  { id: "friction", title: "Find the friction", prompt: "Where does work slow down, repeat, or create risk?" },
  { id: "current_state", title: "Map current state", prompt: "Who does the work today, in what systems, and how long does it take?" },
  { id: "kpis", title: "Set the scorecard", prompt: "Which leading and lagging KPIs prove the change worked?" },
  { id: "data", title: "Inspect the data estate", prompt: "What sources exist, how sensitive are they, and how ready are they?" },
  { id: "fit", title: "Decide the AI fit", prompt: "Should this be AI, ML, rules, or process redesign?" },
  { id: "economics", title: "Quantify the case", prompt: "Estimate volume, effort, adoption, and capacity value." },
  { id: "governance", title: "Design EPOCH controls", prompt: "Where must Human-in-the-Loop control exist?" },
];

const starterDraft = {
  title: "Enterprise AI Strategy Session",
  friction: "Teams lose time searching policies, reconciling systems, and rewriting customer-ready responses from scratch.",
  current_state: "Analysts work across CRM, ticketing, SharePoint, email, and ERP. Quality depends on senior reviewers and tribal knowledge.",
  kpis: "cycle time, first-pass quality, escalation rate, adoption, cost-to-serve",
  desiredOutcome: "A governed AI cockpit that retrieves trusted context, drafts recommendations, routes exceptions, and leaves people in control.",
  leadingIndicators: "active users, retrieval precision, human approval throughput, exception rate, model confidence trend",
  laggingIndicators: "cycle time reduction, cost-to-serve improvement, quality defect reduction, compliance incident reduction, capacity unlocked",
  data: "SharePoint policy documents, CRM records, ticket history, ERP transactions, call transcripts, and knowledge-base articles.",
  fit: "The workflow requires language understanding, knowledge grounding, business judgment, and controlled tool use.",
  governance: "EPOCH must require human review for low confidence, regulated decisions, customer-impacting actions, and policy conflicts.",
  monthlyOccurrences: "420",
  minutesPerOccurrence: "18",
  usersImpacted: "45",
  automationPotential: "0.35",
  hourlyCost: "72",
  dataSources: "5",
  riskCriticality: "3",
};

function parseAnswerValue(value: string): AnswerValue {
  const trimmed = value.trim();
  const numeric = Number(trimmed);
  if (trimmed !== "" && Number.isFinite(numeric)) return numeric;
  return trimmed;
}

function answerById(answers: EvaluationAnswer[], stepId: string) {
  return answers.find(answer => answer.stepId === stepId)?.value;
}

function formatValue(value: unknown, prefix = "") {
  if (typeof value === "number") return `${prefix}${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  return "—";
}

function componentResidency(group: string) {
  const normalized = group.toLowerCase();
  if (normalized.includes("storage")) return "Private data plane: vector DB, SQL cluster, encrypted object storage, and controlled backup tier.";
  if (normalized.includes("orchestration")) return "Private application cluster: workflow conductor, policy service, prompt router, and queue workers.";
  if (normalized.includes("tools")) return "DMZ integration subnet: MCP registry, API gateway, connector runtime, and service-account vault.";
  if (normalized.includes("security")) return "Security control plane: DLP, prompt firewall, audit store, secrets vault, and policy-as-code engine.";
  if (normalized.includes("identity")) return "Enterprise IAM zone: SSO, RBAC, ABAC, delegated authorization, and session policy.";
  if (normalized.includes("observability")) return "Monitoring estate: SIEM, trace lake, model telemetry, explainability ledger, and cost controls.";
  if (normalized.includes("memory")) return "Low-latency private cache tier: session memory, KV cache, retrieval cache, and policy-safe summaries.";
  if (normalized.includes("epoch")) return "Supervisor operations console: EPOCH Human-in-the-Loop queues, review rights, and handoff paths.";
  return "Enterprise output layer: secure portal, approved workflow destination, or governed downstream system.";
}

function ArchitectureDiagram({ pattern }: { pattern: Pattern }) {
  return (
    <div className="glass-card rounded-[2rem] p-5 md:p-7">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/80">Pattern Flow</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{pattern.name}</h3>
        </div>
        <div className="rounded-full border border-yellow-200/25 bg-yellow-200/10 px-4 py-2 text-sm text-yellow-100">{pattern.shortName}</div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1fr_18rem]">
        <div className="overflow-x-auto pb-3">
          <div className="flex min-w-[780px] items-center gap-2">
            {pattern.flow.map((node, index) => (
              <div className="flex flex-1 items-center gap-2" key={node}>
                <div className="diagram-node min-h-20 flex-1">
                  <span className="text-xs font-semibold text-cyan-200">0{index + 1}</span>
                  <p className="mt-1 font-semibold">{node}</p>
                </div>
                {index < pattern.flow.length - 1 ? <div className="diagram-line" /> : null}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950/35 p-4">
          <p className="text-sm font-semibold text-cyan-100">Private On-Premise Residency Map</p>
          <div className="mt-4 grid max-h-[29rem] gap-2 overflow-y-auto pr-1">
            {pattern.components.map(component => (
              <div className="rounded-2xl bg-white/[0.06] px-3 py-2 text-sm text-slate-200" key={component.group}>
                <div className="flex items-center gap-2 font-semibold text-white"><Cpu className="h-4 w-4 text-yellow-200" />{component.group}</div>
                <p className="mt-1 text-xs leading-5 text-slate-300">{componentResidency(component.group)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-yellow-200/15 bg-yellow-200/10 p-3 text-xs leading-5 text-yellow-50">
            Physical anchors: {pattern.onPrem.join(" · ")}
          </div>
        </div>
      </div>
    </div>
  );
}

type GeneratedArchitectureConfig = {
  patternName: string;
  rationale: string;
  components: { id: string; label: string; layer: string; description: string; residency: string }[];
  flows: { from: string; to: string; label: string }[];
};

function GeneratedArchitectureDiagram({ architectureConfig }: { architectureConfig: GeneratedArchitectureConfig }) {
  const flowOrder = architectureConfig.flows.length
    ? [architectureConfig.flows[0].from, ...architectureConfig.flows.map(flow => flow.to)]
    : architectureConfig.components.map(component => component.id);
  const orderedComponents = flowOrder
    .map(id => architectureConfig.components.find(component => component.id === id))
    .filter((component): component is GeneratedArchitectureConfig["components"][number] => Boolean(component));

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/40 p-5">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-yellow-100">Generated Pattern</p>
        <h3 className="mt-2 text-3xl font-black text-white">{architectureConfig.patternName}</h3>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{architectureConfig.rationale}</p>
        <div className="mt-6 overflow-x-auto pb-3">
          <div className="flex min-w-[880px] items-center gap-2">
            {orderedComponents.map((component, index) => (
              <div className="flex flex-1 items-center gap-2" key={component.id}>
                <div className="diagram-node min-h-28 flex-1">
                  <span className="text-xs font-semibold text-cyan-200">0{index + 1}</span>
                  <p className="mt-1 font-semibold">{component.label}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-300">{component.residency}</p>
                </div>
                {index < orderedComponents.length - 1 ? <div className="diagram-line" /> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/40 p-5">
        <p className="text-sm font-bold text-cyan-100">Component details</p>
        <div className="mt-4 grid max-h-[36rem] gap-3 overflow-y-auto pr-1">
          {architectureConfig.components.map(component => (
            <div className="rounded-3xl border border-cyan-200/15 bg-cyan-100/[0.07] p-4" key={component.id}>
              <div className="flex items-center gap-3">
                {component.layer === "data" ? <Database className="h-5 w-5 text-cyan-200" /> : component.layer === "security" ? <ShieldCheck className="h-5 w-5 text-cyan-200" /> : component.layer === "hardware" ? <Cpu className="h-5 w-5 text-yellow-200" /> : <Network className="h-5 w-5 text-cyan-200" />}
                <p className="font-black text-white">{component.label}</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{component.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, help }: { label: string; value: string; help: string }) {
  return (
    <div className="glass-card rounded-3xl p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.1]">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/75">{label}</p>
      <p className="mt-3 text-3xl font-black text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-300">{help}</p>
    </div>
  );
}

export default function Home() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const utils = trpc.useUtils();
  const libraryQuery = trpc.aiStudio.patternLibrary.useQuery();
  const sessionsQuery = trpc.aiStudio.sessions.useQuery(undefined, { enabled: isAuthenticated });
  const createSession = trpc.aiStudio.createSession.useMutation();
  const saveAnswer = trpc.aiStudio.saveAnswer.useMutation();
  const synthesize = trpc.aiStudio.synthesize.useMutation();

  const [selectedPatternId, setSelectedPatternId] = useState("rag");
  const [selectedComponent, setSelectedComponent] = useState("Storage");
  const [activeStep, setActiveStep] = useState("friction");
  const [draft, setDraft] = useState(starterDraft);
  const [answers, setAnswers] = useState<EvaluationAnswer[]>([]);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [activeSession, setActiveSession] = useState<NonNullable<typeof sessionsQuery.data>[number] | null>(null);
  const [notice, setNotice] = useState("Start with the explorer, then save an authenticated strategy session to unlock live LLM guidance.");

  const patterns = (libraryQuery.data?.patterns ?? fallbackPatterns) as Pattern[];
  const steps = (libraryQuery.data?.evaluationSteps ?? fallbackSteps) as Step[];
  const selectedPattern = patterns.find(pattern => pattern.id === selectedPatternId) ?? patterns[0];
  const activeStepMeta = steps.find(step => step.id === activeStep) ?? steps[0];
  const selectedComponentData = selectedPattern.components.find(component => component.group === selectedComponent) ?? selectedPattern.components[0];
  const calculationInput = useMemo(() => ({ answers }), [answers]);
  const calculationQuery = trpc.aiStudio.calculate.useQuery(calculationInput, { enabled: answers.length > 0 });
  const calculation = calculationQuery.data ?? activeSession?.calculationSnapshot;
  const latestGuidance = activeSession?.guidanceHistory?.[activeSession.guidanceHistory.length - 1];
  const problemStatement = activeSession?.problemStatement;
  const architectureConfig = activeSession?.architectureConfig;
  const operationalError = libraryQuery.error?.message || sessionsQuery.error?.message || calculationQuery.error?.message || createSession.error?.message || saveAnswer.error?.message || synthesize.error?.message;

  const updateDraft = (field: keyof typeof starterDraft, value: string) => {
    setDraft(previous => ({ ...previous, [field]: value }));
  };

  const mergeAnswers = (incoming: EvaluationAnswer[]) => {
    setAnswers(previous => {
      const remaining = previous.filter(existing => !incoming.some(item => item.stepId === existing.stepId));
      return [...remaining, ...incoming];
    });
  };

  const buildAnswersForStep = (stepId: string): EvaluationAnswer[] => {
    const now = new Date().toISOString();
    const make = (id: keyof typeof starterDraft, question: string): EvaluationAnswer => ({
      stepId: id,
      question,
      value: parseAnswerValue(draft[id]),
      updatedAt: now,
    });

    if (stepId === "kpis") return [make("kpis", "Which KPIs define success?"), make("leadingIndicators", "Which leading indicators show the pilot is working early?"), make("laggingIndicators", "Which lagging indicators prove business impact?"), make("desiredOutcome", "What outcome should the enterprise achieve?")];
    if (stepId === "data") return [make("data", "Which data sources will ground the system?"), make("dataSources", "How many enterprise data sources are involved?"), make("riskCriticality", "How critical is the risk profile from one to five?")];
    if (stepId === "fit") return [make("fit", "Why is AI, ML, rules, or process redesign appropriate?"), make("automationPotential", "What share of work can be assisted or automated?")];
    if (stepId === "economics") {
      return [
        make("monthlyOccurrences", "How many monthly occurrences exist?"),
        make("minutesPerOccurrence", "How many minutes does each occurrence take?"),
        make("usersImpacted", "How many users are impacted?"),
        make("hourlyCost", "What blended hourly cost should be used?"),
      ];
    }
    return [make(stepId as keyof typeof starterDraft, activeStepMeta.prompt)];
  };

  const ensureSession = async () => {
    if (sessionId) return sessionId;
    const created = await createSession.mutateAsync({ title: draft.title || "Enterprise AI Strategy Session" });
    if (!created) throw new Error("Could not create a strategy session.");
    setSessionId(created.id);
    setActiveSession(created);
    await utils.aiStudio.sessions.invalidate();
    return created.id;
  };

  const saveCurrentStep = async () => {
    try {
      const prepared = buildAnswersForStep(activeStep);
      mergeAnswers(prepared);

      if (!isAuthenticated) {
        setNotice("Sign in to save the session and trigger server-side LLM guidance for every answer. The app still routes calculations through the server calculation service.");
        return;
      }

      const id = await ensureSession();
      let latest = activeSession;
      for (const answer of prepared) {
        const saved = await saveAnswer.mutateAsync({ sessionId: id, currentStep: activeStep, answer });
        if (saved) latest = saved;
      }
      if (latest) setActiveSession(latest);
      await utils.aiStudio.sessions.invalidate();
      setNotice("Saved. The guidance panel now reflects server-side LLM recommendations with deterministic HyperFormula calculations.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "The session could not be saved. Please try again.");
    }
  };

  const generateSynthesis = async () => {
    try {
      if (!isAuthenticated) {
        setNotice("Sign in to generate and persist the custom architecture and problem statement.");
        return;
      }
      const id = await ensureSession();
      const generated = await synthesize.mutateAsync({ sessionId: id });
      if (generated) setActiveSession(generated);
      await utils.aiStudio.sessions.invalidate();
      setNotice("Generated. Your problem statement and custom architecture are saved to the authenticated session.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "The final architecture could not be generated. Please try again.");
    }
  };

  const loadSession = (id: number) => {
    const found = sessionsQuery.data?.find(session => session.id === id);
    if (!found) return;
    setSessionId(found.id);
    setActiveSession(found);
    setAnswers(found.answers ?? []);
    setNotice(`Loaded saved session: ${found.title}`);
  };

  const currentTextField = activeStep === "current_state" ? "current_state" : activeStep === "governance" ? "governance" : activeStep === "fit" ? "fit" : "friction";

  return (
    <div className="blueally-shell min-h-screen text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/55 backdrop-blur-2xl">
        <div className="container flex min-h-20 items-center justify-between gap-4 py-4">
          <a className="flex items-center gap-3" href="#top" aria-label="BlueAlly AI Solution Studio home">
            <div className="grid h-11 w-11 place-items-center rounded-2xl animated-gradient shadow-lg shadow-cyan-900/40">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-100">BlueAlly</p>
              <p className="text-xs text-slate-300">AI Solution Studio</p>
            </div>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-200 lg:flex" aria-label="Primary navigation">
            <a href="#patterns" className="hover:text-cyan-200">Patterns</a>
            <a href="#evaluate" className="hover:text-cyan-200">Evaluate</a>
            <a href="#architecture" className="hover:text-cyan-200">Architecture</a>
            <a href="#brief" className="hover:text-cyan-200">Brief</a>
          </nav>
          <div className="flex items-center gap-2">
            {loading ? <Loader2 className="h-5 w-5 animate-spin text-cyan-100" /> : isAuthenticated ? (
              <Button className="rounded-full bg-white/10 text-white hover:bg-white/15" onClick={() => void logout()} type="button">
                {user?.name ? `Exit, ${user.name.split(" ")[0]}` : "Sign out"}
              </Button>
            ) : (
              <Button className="rounded-full animated-gradient text-white" onClick={() => { window.location.href = getLoginUrl(); }} type="button">
                Sign in to save
              </Button>
            )}
          </div>
        </div>
      </header>

      <main id="top" className="relative z-10">
        <section className="container grid min-h-[86vh] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <div className="gold-chip inline-flex rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.24em]">Enterprise AI Strategy and Architecture</div>
            <h1 className="mt-8 max-w-5xl text-5xl font-black leading-[0.92] md:text-7xl xl:text-8xl">
              Build AI that is <span className="electric-text">architected to scale.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
              This studio guides leaders from AI pattern literacy to use-case evaluation, live value modeling, EPOCH Human-in-the-Loop governance, and a custom private architecture ready for executive review.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button className="h-13 rounded-full animated-gradient px-7 text-base font-bold text-white" onClick={() => document.getElementById("evaluate")?.scrollIntoView()} type="button">
                Start guided evaluation <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button className="h-13 rounded-full border border-white/15 bg-white/10 px-7 text-base font-bold text-white hover:bg-white/15" onClick={() => document.getElementById("patterns")?.scrollIntoView()} type="button">
                Explore architectures
              </Button>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                ["01", "Learn the top five AI patterns"],
                ["02", "Evaluate pain, KPIs, data, and risk"],
                ["03", "Generate a private architecture"],
              ].map(item => (
                <div className="glass-card rounded-3xl p-4" key={item[0]}>
                  <p className="text-xs font-black text-yellow-100">{item[0]}</p>
                  <p className="mt-2 text-sm font-semibold text-slate-100">{item[1]}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card-strong rounded-[2.5rem] p-5 md:p-7">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/50 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-300">Live Strategy Signal</p>
                  <p className="mt-1 text-2xl font-black text-white">Architecture readiness cockpit</p>
                </div>
                <Brain className="h-10 w-10 text-cyan-200" />
              </div>
              <div className="mt-6 grid gap-3">
                <MetricCard label="Monthly hours recovered" value={formatValue(calculation?.monthlyHoursRecovered)} help="Calculated server-side through HyperFormula from session inputs." />
                <MetricCard label="Annual capacity value" value={formatValue(calculation?.annualCapacityValue, "$ ")} help="A planning estimate, not a promise, with formula trace retained." />
              </div>
              <div className="mt-5 rounded-3xl border border-cyan-200/15 bg-cyan-100/10 p-4">
                <p className="text-sm leading-6 text-cyan-50">{notice}</p>
              </div>
              {operationalError ? (
                <div className="mt-3 rounded-3xl border border-red-300/25 bg-red-500/10 p-4" role="alert">
                  <p className="text-sm font-semibold text-red-100">Operational notice</p>
                  <p className="mt-1 text-sm leading-6 text-red-50">{operationalError}</p>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section id="patterns" className="container py-16">
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-200">Section 1</p>
              <h2 className="mt-3 text-4xl font-black md:text-6xl">Interactive AI Architecture Explorer</h2>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">Drill into RAG, agentic workflows, fine-tuning, multi-modal systems, and hybrid architectures. Every pattern includes storage, orchestration, tools, MCPs, APIs, security, identity, observability, memory, EPOCH controls, output types, and the private on-premise layer.</p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-5">
            {patterns.map(pattern => (
              <button
                className={`focus-card rounded-3xl border p-5 text-left transition duration-300 ${selectedPatternId === pattern.id ? "border-cyan-200/60 bg-cyan-100/15 shadow-xl shadow-cyan-950/30" : "border-white/10 bg-white/[0.05] hover:-translate-y-1 hover:bg-white/[0.08]"}`}
                key={pattern.id}
                onClick={() => {
                  setSelectedPatternId(pattern.id);
                  setSelectedComponent(pattern.components[0]?.group ?? "Storage");
                }}
                type="button"
              >
                <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-100">{pattern.shortName}</p>
                <p className="mt-3 text-lg font-black text-white">{pattern.name}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{pattern.promise}</p>
              </button>
            ))}
          </div>

          <div className="mt-7 grid gap-7 xl:grid-cols-[1.05fr_0.95fr]">
            <ArchitectureDiagram pattern={selectedPattern} />
            <div className="glass-card rounded-[2rem] p-5 md:p-7">
              <div className="flex flex-wrap gap-2">
                {selectedPattern.components.map(component => (
                  <button
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${selectedComponent === component.group ? "border-cyan-200/60 bg-cyan-100/15 text-cyan-50" : "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"}`}
                    key={component.group}
                    onClick={() => setSelectedComponent(component.group)}
                    type="button"
                  >
                    {component.group}
                  </button>
                ))}
              </div>
              <div className="mt-7 rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-cyan-200">Drill-down</p>
                <h3 className="mt-3 text-3xl font-black text-white">{selectedComponentData.group}</h3>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {selectedComponentData.items.map(item => (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm leading-6 text-slate-200" key={item}>
                      <CheckCircle2 className="mb-3 h-5 w-5 text-cyan-200" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5">
                  <p className="font-bold text-white">Best for</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{selectedPattern.bestFor}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5">
                  <p className="font-bold text-white">Watch-outs</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{selectedPattern.risk}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="evaluate" className="container py-16">
          <div className="grid gap-7 xl:grid-cols-[0.82fr_1.18fr]">
            <aside className="glass-card h-fit rounded-[2rem] p-5 md:p-7">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-200">Section 2</p>
              <h2 className="mt-3 text-4xl font-black">AI-Guided Evaluation</h2>
              <p className="mt-4 leading-7 text-slate-300">Answer each step. Authenticated sessions save and resume, and every saved answer triggers server-side LLM guidance. Quantitative values are calculated only through HyperFormula on the server.</p>
              <div className="mt-6 grid gap-2">
                {steps.map((step, index) => (
                  <button
                    className={`focus-card rounded-2xl border p-4 text-left transition ${activeStep === step.id ? "border-cyan-200/60 bg-cyan-100/15" : "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"}`}
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    type="button"
                  >
                    <p className="text-xs font-bold text-yellow-100">0{index + 1}</p>
                    <p className="mt-1 font-black text-white">{step.title}</p>
                    <p className="mt-1 text-sm leading-5 text-slate-300">{step.prompt}</p>
                  </button>
                ))}
              </div>
            </aside>

            <div className="grid gap-7">
              <div className="glass-card-strong rounded-[2rem] p-5 md:p-7">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.24em] text-cyan-200">Current step</p>
                    <h3 className="mt-2 text-3xl font-black text-white">{activeStepMeta.title}</h3>
                    <p className="mt-2 leading-7 text-slate-300">{activeStepMeta.prompt}</p>
                  </div>
                  <input className="rounded-full border border-white/10 bg-white/[0.08] px-4 py-3 text-sm text-white outline-none ring-cyan-300/0 transition focus:ring-2" value={draft.title} onChange={event => updateDraft("title", event.target.value)} aria-label="Session title" />
                </div>

                {activeStep === "kpis" ? (
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {[
                      ["kpis", "Core KPIs"],
                      ["leadingIndicators", "Leading indicators"],
                      ["laggingIndicators", "Lagging indicators"],
                      ["desiredOutcome", "Desired outcome"],
                    ].map(([field, label]) => (
                      <label className="block" key={field}>
                        <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">{label}</span>
                        <textarea className="min-h-36 w-full rounded-3xl border border-white/10 bg-slate-950/45 p-4 text-white outline-none ring-cyan-300/0 transition placeholder:text-slate-500 focus:ring-2" value={draft[field as keyof typeof starterDraft]} onChange={event => updateDraft(field as keyof typeof starterDraft, event.target.value)} />
                      </label>
                    ))}
                  </div>
                ) : activeStep === "data" ? (
                  <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_12rem_12rem]">
                    <textarea className="min-h-40 rounded-3xl border border-white/10 bg-slate-950/45 p-4 text-white outline-none focus:ring-2 focus:ring-cyan-300" value={draft.data} onChange={event => updateDraft("data", event.target.value)} />
                    <input className="rounded-3xl border border-white/10 bg-slate-950/45 p-4 text-white outline-none focus:ring-2 focus:ring-cyan-300" value={draft.dataSources} onChange={event => updateDraft("dataSources", event.target.value)} aria-label="Data sources" />
                    <input className="rounded-3xl border border-white/10 bg-slate-950/45 p-4 text-white outline-none focus:ring-2 focus:ring-cyan-300" value={draft.riskCriticality} onChange={event => updateDraft("riskCriticality", event.target.value)} aria-label="Risk criticality" />
                  </div>
                ) : activeStep === "economics" ? (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {[
                      ["monthlyOccurrences", "Monthly occurrences"],
                      ["minutesPerOccurrence", "Minutes each"],
                      ["usersImpacted", "Users impacted"],
                      ["hourlyCost", "Hourly cost"],
                    ].map(([field, label]) => (
                      <label className="rounded-3xl border border-white/10 bg-slate-950/45 p-4" key={field}>
                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">{label}</span>
                        <input className="mt-3 w-full bg-transparent text-2xl font-black text-white outline-none" value={draft[field as keyof typeof starterDraft]} onChange={event => updateDraft(field as keyof typeof starterDraft, event.target.value)} />
                      </label>
                    ))}
                  </div>
                ) : (
                  <textarea className="mt-6 min-h-44 w-full rounded-3xl border border-white/10 bg-slate-950/45 p-5 text-white outline-none ring-cyan-300/0 transition placeholder:text-slate-500 focus:ring-2" value={draft[currentTextField as keyof typeof starterDraft]} onChange={event => updateDraft(currentTextField as keyof typeof starterDraft, event.target.value)} />
                )}

                {activeStep === "fit" ? (
                  <label className="mt-4 block rounded-3xl border border-white/10 bg-slate-950/45 p-4">
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">Automation potential, expressed as a decimal</span>
                    <input className="mt-3 w-full bg-transparent text-2xl font-black text-white outline-none" value={draft.automationPotential} onChange={event => updateDraft("automationPotential", event.target.value)} />
                  </label>
                ) : null}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button className="rounded-full animated-gradient px-7 text-white" onClick={() => void saveCurrentStep()} disabled={saveAnswer.isPending || createSession.isPending} type="button">
                    {saveAnswer.isPending || createSession.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    Save answer and guide me
                  </Button>
                  <Button className="rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/15" onClick={() => void generateSynthesis()} disabled={synthesize.isPending} type="button">
                    {synthesize.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GitBranch className="mr-2 h-4 w-4" />}
                    Generate final architecture
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <MetricCard label="Readiness" value={formatValue(calculation?.automationReadiness)} help="Formula-backed readiness signal from automation, data, and risk inputs." />
                <MetricCard label="Data complexity" value={formatValue(calculation?.dataComplexityIndex)} help="Formula-backed indicator for source volume and governance load." />
                <MetricCard label="Risk control" value={formatValue(calculation?.riskControlScore)} help="Formula-backed view of control strength for EPOCH planning." />
              </div>

              <div className="glass-card rounded-[2rem] p-5 md:p-7">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-100/15"><Brain className="h-5 w-5 text-cyan-100" /></div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">LLM Guidance Engine</p>
                    <h3 className="text-2xl font-black text-white">Anthropic-style strategy counsel</h3>
                  </div>
                </div>
                {latestGuidance ? (
                  <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5"><p className="font-bold text-cyan-100">Recommendation</p><p className="mt-2 leading-7 text-slate-300">{latestGuidance.recommendation}</p></div>
                    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5"><p className="font-bold text-cyan-100">Benchmark</p><p className="mt-2 leading-7 text-slate-300">{latestGuidance.benchmark}</p></div>
                    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5"><p className="font-bold text-cyan-100">AI vs ML vs Rules</p><p className="mt-2 leading-7 text-slate-300">{latestGuidance.decisionGuidance}</p></div>
                    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5"><p className="font-bold text-cyan-100">Next question</p><p className="mt-2 leading-7 text-slate-300">{latestGuidance.nextQuestion}</p></div>
                  </div>
                ) : (
                  <p className="mt-5 rounded-3xl border border-white/10 bg-white/[0.05] p-5 leading-7 text-slate-300">Save an authenticated answer to trigger server-side LLM guidance. Until then, the studio displays deterministic server-side calculations and pattern education.</p>
                )}
              </div>

              {isAuthenticated && sessionsQuery.data?.length ? (
                <div className="glass-card rounded-[2rem] p-5 md:p-7">
                  <h3 className="text-2xl font-black text-white">Saved sessions</h3>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {sessionsQuery.data.map(session => (
                      <button className="rounded-3xl border border-white/10 bg-white/[0.05] p-4 text-left transition hover:bg-white/[0.09]" key={session.id} onClick={() => loadSession(session.id)} type="button">
                        <p className="font-bold text-white">{session.title}</p>
                        <p className="mt-1 text-sm text-slate-400">{session.status} · {session.answers?.length ?? 0} answers</p>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section id="architecture" className="container py-16">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-200">Section 3</p>
            <h2 className="mt-3 text-4xl font-black md:text-6xl">Dynamic Real-World Architecture Builder</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">The generated diagram uses the same visual grammar as the pattern explorer so executives can connect the reference model to their own use case without relearning the interface.</p>
          </div>

          {architectureConfig ? (
            <div className="glass-card-strong rounded-[2.5rem] p-5 md:p-7">
              <GeneratedArchitectureDiagram architectureConfig={architectureConfig} />
            </div>
          ) : (
            <ArchitectureDiagram pattern={selectedPattern} />
          )}
        </section>

        <section id="brief" className="container py-16 pb-28">
          <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="glass-card rounded-[2rem] p-5 md:p-7">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-200">Problem Statement Document</p>
              <h2 className="mt-3 text-4xl font-black">Executive-ready synthesis</h2>
              <p className="mt-4 leading-7 text-slate-300">The generated document maps measurable KPIs, AI capabilities, architecture logic, and Human-in-the-Loop requirements through the EPOCH framework.</p>
              <div className="mt-6 grid gap-3">
                {[
                  [LockKeyhole, "Identity-first architecture"],
                  [KeyRound, "Private on-premise control layer"],
                  [Workflow, "EPOCH Human-in-the-Loop governance"],
                  [Layers3, "RAG, agents, ML, and rules decisioning"],
                  [Zap, "HyperFormula-only quantitative calculations"],
                  [Building2, "Enterprise save-and-resume sessions"],
                ].map(([Icon, text]) => {
                  const TypedIcon = Icon as typeof LockKeyhole;
                  return (
                    <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] p-3" key={String(text)}>
                      <TypedIcon className="h-5 w-5 text-cyan-200" />
                      <span className="text-sm font-semibold text-slate-200">{String(text)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <article className="glass-card-strong rounded-[2rem] p-5 md:p-7">
              {problemStatement ? (
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.24em] text-yellow-100">{problemStatement.decision} recommendation</p>
                  <h3 className="mt-3 text-3xl font-black text-white">{problemStatement.title}</h3>
                  <p className="mt-5 whitespace-pre-line rounded-3xl border border-white/10 bg-white/[0.04] p-5 leading-7 text-slate-200">
                    {problemStatement.narrative}
                  </p>
                  <div className="mt-7 grid gap-4 md:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5"><p className="font-bold text-cyan-100">Problem</p><p className="mt-2 leading-7 text-slate-300">{problemStatement.problem}</p></div>
                    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5"><p className="font-bold text-cyan-100">Desired outcome</p><p className="mt-2 leading-7 text-slate-300">{problemStatement.desiredOutcome}</p></div>
                  </div>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5"><p className="font-bold text-cyan-100">Leading indicators</p><div className="mt-3 grid gap-2">{problemStatement.leadingIndicators.map(item => <p className="text-sm leading-6 text-slate-300" key={item}>{item}</p>)}</div></div>
                    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5"><p className="font-bold text-cyan-100">Lagging indicators</p><div className="mt-3 grid gap-2">{problemStatement.laggingIndicators.map(item => <p className="text-sm leading-6 text-slate-300" key={item}>{item}</p>)}</div></div>
                  </div>
                  <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.05] p-5">
                    <p className="font-bold text-cyan-100">AI capability mapping</p>
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      {problemStatement.aiCapabilityMapping.map(item => <div className="rounded-2xl bg-white/[0.05] p-3" key={item.capability}><p className="text-sm font-bold text-white">{item.capability}</p><p className="mt-1 text-sm leading-6 text-slate-300">{item.businessImpact}</p></div>)}
                    </div>
                  </div>
                  <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.05] p-5">
                    <p className="font-bold text-cyan-100">EPOCH Human-in-the-Loop considerations</p>
                    <div className="mt-3 grid gap-2">
                      {problemStatement.epochConsiderations.map(item => <p className="text-sm leading-6 text-slate-300" key={item}>{item}</p>)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid min-h-96 place-items-center text-center">
                  <div>
                    <Sparkles className="mx-auto h-12 w-12 text-cyan-200" />
                    <h3 className="mt-4 text-3xl font-black text-white">Generate your brief when ready.</h3>
                    <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-300">Complete a few evaluation steps, sign in, and generate the final architecture. The studio will persist the problem statement, architecture configuration, guidance history, and calculation snapshot per authenticated user.</p>
                  </div>
                </div>
              )}
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
