import { HyperFormula } from "hyperformula";
import type {
  ArchitectureConfig,
  CalculationSnapshot,
  EvaluationAnswer,
  GuidanceEntry,
  ProblemStatement,
} from "../drizzle/schema";

export const EPOCH_DEFINITION =
  "EPOCH means Evaluate, Plan, Operate, Check, and Handoff. It keeps Human-in-the-Loop control explicit: humans evaluate risk, plan thresholds, operate exception paths, check outcomes, and receive handoff when the system lacks confidence.";

export const patternCatalog = [
  {
    id: "rag",
    name: "Retrieval-Augmented Generation",
    shortName: "RAG",
    promise: "Ground the model in trusted enterprise knowledge before it speaks.",
    bestFor: "Knowledge assistants, policy search, field support, proposal generation, and regulated Q&A.",
    risk: "Retrieval quality, data permissions, source freshness, and citation fidelity must be governed tightly.",
    flow: ["User Intent", "Identity Gate", "Retriever", "Vector + SQL Stores", "LLM", "Grounded Output", "Human Review"],
    components: [
      { group: "Storage", items: ["Vector database", "SQL metadata store", "Document object storage", "Embedding index"] },
      { group: "Orchestration", items: ["Query rewriting", "Chunk ranking", "Context assembly", "Prompt policy"] },
      { group: "Tools / MCPs / APIs", items: ["Search API", "Content connectors", "MCP retrieval tool", "Citation resolver"] },
      { group: "Security", items: ["Row-level authorization", "Data loss prevention", "Prompt injection filters", "Audit trail"] },
      { group: "Identity and Auth", items: ["SSO", "RBAC", "Attribute-based access", "Session policy"] },
      { group: "Observability and Explainability", items: ["Retrieval traces", "Source attribution", "Latency telemetry", "Answer confidence"] },
      { group: "Memory / KV Cache", items: ["Conversation cache", "Embedding cache", "Session memory", "Policy-safe summaries"] },
      { group: "Human-in-the-Loop via EPOCH", items: ["Evaluate risk", "Plan approval thresholds", "Operate exception queues", "Check sampled answers", "Handoff low-confidence cases"] },
      { group: "Output Types", items: ["Cited answer", "Briefing memo", "Workflow task", "Decision support card"] },
    ],
    onPrem: ["GPU inference node", "Internal vector store", "Private SQL cluster", "IAM gateway", "SIEM observability", "Operator review console"],
  },
  {
    id: "agentic",
    name: "Agentic Workflow",
    shortName: "Agentic",
    promise: "Let the system plan, use tools, verify work, and escalate when judgment matters.",
    bestFor: "Multi-step operations, IT service workflows, procurement support, research, and back-office execution.",
    risk: "Tool permissions, action boundaries, state management, and human approval gates determine whether value scales safely.",
    flow: ["Goal", "Planner", "Tool Router", "APIs / MCPs", "Verifier", "Action", "EPOCH Gate"],
    components: [
      { group: "Storage", items: ["Task state store", "SQL system of record", "Vector memory", "Run logs"] },
      { group: "Orchestration", items: ["Planner", "Executor", "Verifier", "Policy engine"] },
      { group: "Tools / MCPs / APIs", items: ["MCP tool registry", "Enterprise APIs", "RPA connector", "Ticketing system"] },
      { group: "Security", items: ["Scoped credentials", "Action sandbox", "Approval policies", "Tool allowlists"] },
      { group: "Identity and Auth", items: ["Delegated auth", "Service identity", "RBAC", "Just-in-time permissions"] },
      { group: "Observability and Explainability", items: ["Step trace", "Tool-call ledger", "Outcome verification", "Policy audit"] },
      { group: "Memory / KV Cache", items: ["Working memory", "Plan cache", "Tool result cache", "Long-term preference memory"] },
      { group: "Human-in-the-Loop via EPOCH", items: ["Evaluate action risk", "Plan approval gates", "Operate with bounded autonomy", "Check completed work", "Handoff exceptions"] },
      { group: "Output Types", items: ["Completed transaction", "Action log", "Exception summary", "Manager approval packet"] },
    ],
    onPrem: ["Inference cluster", "Tool gateway", "Secrets vault", "Workflow database", "Audit lake", "Supervisor cockpit"],
  },
  {
    id: "fine_tuning",
    name: "Fine-Tuning and Adaptation",
    shortName: "Fine-Tuning",
    promise: "Adapt model behavior for a specialized domain, style, taxonomy, or task boundary.",
    bestFor: "Consistent classification, domain-specific drafting, structured extraction, and controlled language generation.",
    risk: "Training data quality, evaluation rigor, drift, privacy, and version governance drive success.",
    flow: ["Curated Examples", "Training Pipeline", "Model Adapter", "Evaluation Harness", "Deployment", "Monitoring"],
    components: [
      { group: "Storage", items: ["Training corpus", "Label store", "Model registry", "Evaluation dataset"] },
      { group: "Orchestration", items: ["Data curation", "Fine-tune jobs", "Evaluation gates", "Release controls"] },
      { group: "Tools / MCPs / APIs", items: ["Annotation tools", "Training API", "Model registry API", "Evaluation runner"] },
      { group: "Security", items: ["PII scrubber", "Dataset lineage", "Model access policy", "Release approvals"] },
      { group: "Identity and Auth", items: ["Model owner", "Reviewer roles", "Training job identity", "Deployment authority"] },
      { group: "Observability and Explainability", items: ["Eval scorecards", "Drift detection", "Regression tests", "Failure clusters"] },
      { group: "Memory / KV Cache", items: ["Prompt cache", "Feature cache", "Evaluation cache", "Adapter version cache"] },
      { group: "Human-in-the-Loop via EPOCH", items: ["Evaluate examples", "Plan acceptance criteria", "Operate review loops", "Check regressions", "Handoff failed classes"] },
      { group: "Output Types", items: ["Specialized response", "Classification", "Structured extraction", "Domain narrative"] },
    ],
    onPrem: ["Training workstation or GPU pod", "Dataset vault", "Model registry", "Evaluation runner", "Private endpoint", "Governance board"],
  },
  {
    id: "multi_modal",
    name: "Multi-Modal Intelligence",
    shortName: "Multi-Modal",
    promise: "Reason across text, image, audio, video, documents, and operational signals.",
    bestFor: "Quality inspection, claims review, meeting intelligence, visual troubleshooting, and document-heavy workflows.",
    risk: "Input quality, consent, storage volume, modality-specific evaluation, and explainability matter more than model novelty.",
    flow: ["Multi-Modal Input", "Preprocessor", "Embedding + Feature Stores", "Model", "Verifier", "Output"],
    components: [
      { group: "Storage", items: ["Object storage", "Vector index", "Transcript store", "Metadata SQL"] },
      { group: "Orchestration", items: ["OCR", "Transcription", "Frame sampling", "Modality fusion"] },
      { group: "Tools / MCPs / APIs", items: ["Vision API", "Speech API", "Document parser", "Sensor connector"] },
      { group: "Security", items: ["Consent controls", "Media redaction", "Watermarking", "Retention policy"] },
      { group: "Identity and Auth", items: ["Media access scope", "Reviewer identity", "Device identity", "Chain of custody"] },
      { group: "Observability and Explainability", items: ["Evidence overlays", "Confidence bands", "Frame-level trace", "Modality attribution"] },
      { group: "Memory / KV Cache", items: ["Embedding cache", "Transcript cache", "Frame cache", "User context cache"] },
      { group: "Human-in-the-Loop via EPOCH", items: ["Evaluate evidence quality", "Plan review thresholds", "Operate assisted review", "Check sampled outputs", "Handoff disputed cases"] },
      { group: "Output Types", items: ["Annotated evidence", "Inspection result", "Summary", "Case packet"] },
    ],
    onPrem: ["Media ingestion appliance", "GPU vision node", "Object store", "Vector service", "Secure review station", "Monitoring console"],
  },
  {
    id: "hybrid",
    name: "Hybrid AI System",
    shortName: "Hybrid",
    promise: "Combine RAG, agents, rules, ML, and human control into one governed operating model.",
    bestFor: "Enterprise platforms where accuracy, action, compliance, and integration must work together.",
    risk: "Complexity rises quickly. Architecture discipline, interface contracts, and observability decide the outcome.",
    flow: ["Business Event", "Rules Gate", "RAG Context", "Agent Workflow", "ML Score", "EPOCH Control", "System Update"],
    components: [
      { group: "Storage", items: ["SQL system of record", "Vector store", "Feature store", "Event lake"] },
      { group: "Orchestration", items: ["Rules engine", "Agent planner", "RAG pipeline", "Workflow conductor"] },
      { group: "Tools / MCPs / APIs", items: ["MCP registry", "ERP API", "CRM API", "ML scoring API"] },
      { group: "Security", items: ["Zero-trust gateway", "Policy-as-code", "Secrets vault", "Continuous audit"] },
      { group: "Identity and Auth", items: ["SSO", "Service identities", "Delegated user permissions", "Approval authority"] },
      { group: "Observability and Explainability", items: ["Unified trace", "Model cards", "Decision lineage", "Cost telemetry"] },
      { group: "Memory / KV Cache", items: ["Session cache", "Feature cache", "Retrieval cache", "Tool response cache"] },
      { group: "Human-in-the-Loop via EPOCH", items: ["Evaluate risk tiers", "Plan governance lanes", "Operate exception handling", "Check business outcomes", "Handoff regulated decisions"] },
      { group: "Output Types", items: ["Decision", "Recommendation", "Automated workflow", "Executive dashboard"] },
    ],
    onPrem: ["Private AI rack", "Kubernetes control plane", "GPU inference pool", "Secure data fabric", "IAM and SIEM", "Business control room"],
  },
] as const;

export const evaluationSteps = [
  { id: "friction", title: "Find the friction", prompt: "Where does the current process break, slow down, repeat, or create quality risk?" },
  { id: "current_state", title: "Map the current state", prompt: "Who performs the work today, what systems are touched, and how long does each occurrence take?" },
  { id: "kpis", title: "Set the scorecard", prompt: "Which leading and lagging KPIs will prove the change worked?" },
  { id: "data", title: "Inspect the data estate", prompt: "What data sources exist, how sensitive are they, and how ready are they for AI?" },
  { id: "fit", title: "Decide if AI is warranted", prompt: "Does this require generative AI, classical ML, a rules engine, or process redesign?" },
  { id: "economics", title: "Quantify the case", prompt: "Estimate volume, effort, adoption, and value so the business case is repeatable." },
  { id: "governance", title: "Design the Human-in-the-Loop model", prompt: `Use the EPOCH framework. ${EPOCH_DEFINITION}` },
] as const;

function answerValue(answers: EvaluationAnswer[], stepId: string) {
  return answers.find(answer => answer.stepId === stepId)?.value;
}

function numericAnswer(answers: EvaluationAnswer[], stepId: string, fallback: number) {
  const value = answerValue(answers, stepId);
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(/[^0-9.-]/g, ""));
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

function stringAnswer(answers: EvaluationAnswer[], stepId: string, fallback: string) {
  const value = answerValue(answers, stepId);
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return fallback;
}

function numberFromCell(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function listAnswer(answers: EvaluationAnswer[], stepId: string, fallback: string[]) {
  const value = stringAnswer(answers, stepId, fallback.join(", "));
  return value
    .split(/[\n,;]+/)
    .map(item => item.trim())
    .filter(Boolean);
}

export function calculateUseCaseMetrics(answers: EvaluationAnswer[]): CalculationSnapshot {
  const monthlyOccurrences = numericAnswer(answers, "monthlyOccurrences", 400);
  const minutesPerOccurrence = numericAnswer(answers, "minutesPerOccurrence", 18);
  const usersImpacted = numericAnswer(answers, "usersImpacted", 45);
  const automationPotential = numericAnswer(answers, "automationPotential", 0.35);
  const hourlyCost = numericAnswer(answers, "hourlyCost", 72);
  const dataSources = numericAnswer(answers, "dataSources", 4);
  const riskCriticality = numericAnswer(answers, "riskCriticality", 3);

  const sheet = [
    ["monthlyOccurrences", monthlyOccurrences],
    ["minutesPerOccurrence", minutesPerOccurrence],
    ["usersImpacted", usersImpacted],
    ["automationPotential", automationPotential],
    ["hourlyCost", hourlyCost],
    ["dataSources", dataSources],
    ["riskCriticality", riskCriticality],
    ["monthlyHoursRecovered", "=B1*B2*B3*B4/60"],
    ["annualCapacityValue", "=B8*B5*12"],
    ["automationReadiness", "=MIN(100,MAX(0,(B4*100)-(B6*4)-(B7*8)+20))"],
    ["dataComplexityIndex", "=MIN(100,MAX(0,B6*12+B7*10))"],
    ["riskControlScore", "=MIN(100,MAX(0,100-(B7*12)+(B6*2)))"],
  ];

  const hf = HyperFormula.buildFromArray(sheet, { licenseKey: "gpl-v3" });
  const at = (row: number) => numberFromCell(hf.getCellValue({ sheet: 0, col: 1, row }));

  return {
    monthlyHoursRecovered: at(7),
    annualCapacityValue: at(8),
    automationReadiness: at(9),
    dataComplexityIndex: at(10),
    riskControlScore: at(11),
    formulaTrace: {
      monthlyHoursRecovered: "=monthlyOccurrences*minutesPerOccurrence*usersImpacted*automationPotential/60",
      annualCapacityValue: "=monthlyHoursRecovered*hourlyCost*12",
      automationReadiness: "=MIN(100,MAX(0,(automationPotential*100)-(dataSources*4)-(riskCriticality*8)+20))",
      dataComplexityIndex: "=MIN(100,MAX(0,dataSources*12+riskCriticality*10))",
      riskControlScore: "=MIN(100,MAX(0,100-(riskCriticality*12)+(dataSources*2)))",
    },
  };
}

export function fallbackGuidance(stepId: string, answers: EvaluationAnswer[], calculationSnapshot: CalculationSnapshot): GuidanceEntry {
  const friction = stringAnswer(answers, "friction", "the work takes too long, repeats too often, and varies by operator");
  const kpi = stringAnswer(answers, "kpis", "cycle time, quality, adoption, and cost-to-serve");
  const step = evaluationSteps.find(item => item.id === stepId) ?? evaluationSteps[0];

  return {
    stepId,
    recommendation: `Name the work clearly. Then narrow it. The strongest AI use cases start with one painful workflow, one accountable owner, and one measurable outcome. For this case, focus on ${friction}.`,
    benchmark: `Use a sober first benchmark: ${calculationSnapshot.monthlyHoursRecovered.toLocaleString()} recoverable hours per month and $${calculationSnapshot.annualCapacityValue.toLocaleString()} in annual capacity value. Treat it as a planning range, not a promise.`,
    decisionGuidance: `If the work depends on language, knowledge retrieval, judgment, or synthesis, AI may be warranted. If the work is a stable prediction from structured records, classical ML may fit. If every path is known in advance, use a rules engine. The current scorecard should center on ${kpi}.`,
    nextQuestion: step.prompt,
    createdAt: new Date().toISOString(),
  };
}

export function buildProblemStatement(answers: EvaluationAnswer[], calculationSnapshot: CalculationSnapshot): ProblemStatement {
  const problem = stringAnswer(answers, "friction", "Critical enterprise work is slowed by manual search, repeated handoffs, and inconsistent decision support.");
  const currentState = stringAnswer(answers, "current_state", "Teams move between systems, interpret policy manually, and depend on tribal knowledge to finish the work.");
  const desiredOutcome = stringAnswer(answers, "desiredOutcome", "Reduce cycle time, improve quality, and give operators a trusted decision cockpit.");
  const kpis = stringAnswer(answers, "kpis", "cycle time, first-pass quality, adoption, escalation rate, and cost-to-serve");
  const leadingIndicators = listAnswer(answers, "leadingIndicators", ["User adoption rate", "Retrieval precision", "Human approval throughput", "Exception rate", "Model confidence trend"]);
  const laggingIndicators = listAnswer(answers, "laggingIndicators", ["Cycle time reduction", "Cost-to-serve improvement", "Quality defect reduction", "Revenue or capacity unlocked", "Compliance incident rate"]);
  const data = stringAnswer(answers, "data", "documents, tickets, structured records, and knowledge bases");
  const riskControl = calculationSnapshot.riskControlScore >= 70 ? "AI" : calculationSnapshot.automationReadiness >= 55 ? "Machine Learning" : "Rules Engine";

  return {
    title: "AI Use Case Strategy Brief",
    problem,
    currentState,
    desiredOutcome,
    leadingIndicators,
    laggingIndicators,
    kpiTargets: kpis.split(",").map((name, index) => ({
      name: name.trim() || `KPI ${index + 1}`,
      baseline: "Capture during discovery",
      target: index === 0 ? "Improve by 20-35% after controlled pilot" : "Set target after baseline instrumentation",
    })),
    aiCapabilityMapping: [
      { capability: "Retrieval and grounding", businessImpact: `Connects the workflow to ${data} without asking users to search manually.` },
      { capability: "Reasoned synthesis", businessImpact: "Turns fragmented inputs into a concise recommendation with evidence." },
      { capability: "Tool-assisted execution", businessImpact: "Moves from advice to action when controls and permissions are clear." },
      { capability: "Deterministic business calculations", businessImpact: "Keeps value estimates repeatable through HyperFormula-backed formulas." },
    ],
    epochConsiderations: [
      `EPOCH Evaluate: classify risk before automation begins. ${EPOCH_DEFINITION}`,
      "EPOCH Plan: define confidence thresholds, approval rights, and escalation paths.",
      "EPOCH Operate: let humans supervise exceptions, sensitive cases, and policy conflicts.",
      "EPOCH Check: audit outputs, measure KPI movement, and review failure patterns.",
      "EPOCH Handoff: transfer decisions to a human when confidence, policy, or consequence demands it.",
    ],
    decision: riskControl as ProblemStatement["decision"],
    narrative: `The case is strong when it stays narrow. Start where pain is visible: ${problem}. The first business lens is capacity. HyperFormula estimates ${calculationSnapshot.monthlyHoursRecovered.toLocaleString()} hours recovered per month and $${calculationSnapshot.annualCapacityValue.toLocaleString()} in annual capacity value. Build the solution with EPOCH Human-in-the-Loop controls from day one. Let AI accelerate the work. Let people own the judgment.`,
  };
}

export function buildArchitectureConfig(answers: EvaluationAnswer[], calculationSnapshot: CalculationSnapshot): ArchitectureConfig {
  const hasManySources = calculationSnapshot.dataComplexityIndex >= 55;
  const needsControl = calculationSnapshot.riskControlScore < 75;
  const pattern = hasManySources && needsControl ? patternCatalog[4] : hasManySources ? patternCatalog[0] : patternCatalog[1];
  const useCase = stringAnswer(answers, "friction", "enterprise workflow acceleration");

  return {
    patternId: pattern.id,
    patternName: pattern.name,
    components: [
      { id: "experience", label: "Executive Workflow Cockpit", layer: "experience", description: `Guided interface for ${useCase}.`, residency: "User browser and internal portal" },
      { id: "identity", label: "Identity and Policy Gate", layer: "security", description: "SSO, RBAC, data entitlement, prompt policy, and audit boundaries.", residency: "Private IAM zone" },
      { id: "orchestrator", label: "AI Orchestration Layer", layer: "orchestration", description: "Routes intent, selects tools, assembles context, and applies EPOCH Human-in-the-Loop thresholds.", residency: "Private application cluster" },
      { id: "retrieval", label: "Retrieval and Data Fabric", layer: "data", description: "Vector search, SQL metadata, document store, and source permissions.", residency: "On-premise or private cloud data plane" },
      { id: "tools", label: "MCP / API Tool Gateway", layer: "orchestration", description: "Controlled access to business systems, workflow tools, and operational APIs.", residency: "DMZ integration subnet" },
      { id: "model", label: "Private Model Endpoint", layer: "intelligence", description: "LLM or adapted model endpoint with prompt, context, and safety policy.", residency: "GPU inference pool or approved private endpoint" },
      { id: "epoch", label: "EPOCH Human Review Console", layer: "security", description: EPOCH_DEFINITION, residency: "Supervisor operations console" },
      { id: "observability", label: "Observability and Explainability", layer: "security", description: "Unified traces, confidence, source attribution, cost telemetry, and decision lineage.", residency: "SIEM, monitoring, and audit lake" },
      { id: "hardware", label: "Private AI Hardware Layer", layer: "hardware", description: "GPU nodes, encrypted storage, Kubernetes control plane, network segmentation, and secure operator access.", residency: "BlueAlly-managed private AI rack or enterprise data center" },
    ],
    flows: [
      { from: "experience", to: "identity", label: "Authenticate" },
      { from: "identity", to: "orchestrator", label: "Authorize intent" },
      { from: "orchestrator", to: "retrieval", label: "Ground context" },
      { from: "orchestrator", to: "tools", label: "Invoke allowed tools" },
      { from: "orchestrator", to: "model", label: "Reason" },
      { from: "model", to: "epoch", label: "Escalate when needed" },
      { from: "orchestrator", to: "observability", label: "Trace" },
      { from: "hardware", to: "model", label: "Host" },
    ],
    rationale: `The generated design mirrors the ${pattern.shortName} visual language from the explorer. It keeps sensitive data close, places identity ahead of inference, and makes EPOCH Human-in-the-Loop control visible instead of implied.`,
  };
}

export function buildFinalSynthesis(answers: EvaluationAnswer[]) {
  const calculationSnapshot = calculateUseCaseMetrics(answers);
  const problemStatement = buildProblemStatement(answers, calculationSnapshot);
  const architectureConfig = buildArchitectureConfig(answers, calculationSnapshot);
  return { calculationSnapshot, problemStatement, architectureConfig };
}
