# Claude Code Prompt: Build "The Architecture of Intelligence" HTML Presentation

## Instructions for Use

Copy this entire prompt into Claude Code (or Claude with Artifacts). It will generate a complete, single-file HTML presentation with interactive navigation, responsive design, and executive-level aesthetics. The presentation covers the full AI landscape from history through governance, written in Hemingway's direct prose style.

---

## BEGIN PROMPT

---

You are an elite presentation engineer. Build a complete, single-file HTML presentation called **"The Architecture of Intelligence: A Holistic Executive Guide to AI."**

### PERSONAS & VOICE

The content is authored from the combined perspectives of:
- **Top AI researchers at MIT and Stanford** (Andrew Ng, Stuart Russell, Max Tegmark)
- **AI consultants at BCG, Bain, and McKinsey**
- **Lead scientists at Anthropic, DeepMind, and Meta AI**

The writing voice is **Ernest Hemingway** — direct, warm, precise. Short declarative sentences. No unnecessary adjectives. Every word earns its place. Professional and polite, never cold. The tone is that of a trusted advisor speaking plainly to a respected executive.

### DESIGN SYSTEM

**Color Palette:**
- Background: Deep navy gradient (`#0a0f1a` to `#0f172a`)
- Cards/Panels: Semi-transparent dark (`rgba(15, 23, 42, 0.8)`) with subtle glassmorphism (`backdrop-filter: blur(12px)`)
- Primary accent: Teal (`#00d4aa`)
- Secondary accent: Electric blue (`#3b82f6`)
- Warning/Emphasis: Amber (`#f59e0b`)
- Alert/Critical: Coral (`#ef4444`)
- Text primary: White (`#f8fafc`)
- Text secondary: Slate (`#94a3b8`)
- Borders: Subtle (`rgba(148, 163, 184, 0.1)`)

**Typography:**
- Font stack: `'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- Import Inter from Google Fonts (weights 300, 400, 500, 600, 700)
- Headlines: 2.5-3rem, font-weight 700, letter-spacing -0.02em
- Subheads: 1.5-1.8rem, font-weight 600
- Body: 1.1rem, font-weight 400, line-height 1.7
- Stats/Numbers: 3-5rem, font-weight 700, teal accent color
- Quotes: 1.2rem, italic, with left border accent

**Layout:**
- Full viewport slides (100vw × 100vh)
- Max content width: 1200px, centered
- Generous padding: 60px minimum on all sides
- Grid layouts for multi-column content (CSS Grid, not flexbox hacks)
- Cards with 1px border, 16px border-radius, 24px padding

**Animations:**
- Slide transitions: Smooth fade + subtle translateY (300ms ease-out)
- Element entrance: Staggered fade-in from bottom (each element 100ms delay)
- Stat counters: Animate numbers on slide entry
- Progress bar: Thin teal line at top showing presentation progress
- Hover effects: Subtle scale(1.02) on cards with transition

### TECHNICAL REQUIREMENTS

1. **Single HTML file** — all CSS and JS inline. No external dependencies except Google Fonts.
2. **Keyboard navigation** — Left/Right arrows, Space for next, Escape for overview
3. **Click navigation** — Left/right click zones on slide edges
4. **Touch navigation** — Swipe left/right on mobile
5. **Progress indicator** — Thin bar at top + slide counter (e.g., "7 / 40") bottom-right
6. **Responsive** — Works on 1920×1080, 1366×768, iPad, and mobile
7. **Print-friendly** — `@media print` styles that show all slides in sequence
8. **Slide overview mode** — Press 'O' to see thumbnail grid of all slides
9. **Speaker notes** — Press 'N' to toggle speaker notes panel at bottom
10. **Dark mode only** — No light mode toggle needed

### SLIDE CONTENT — 40 SLIDES

Build exactly 40 slides with the following content. Each slide must have a clear headline, supporting content, and visual structure as described.

---

#### SLIDE 1: TITLE
**Headline:** The Architecture of Intelligence
**Subhead:** From Primitives to Governance — A Holistic Executive Guide to AI
**Details:** Animated background with subtle floating node-and-edge network pattern (CSS/SVG animation, not canvas). Tagline at bottom: "AI in 2026: The tools are here. The patterns are proven. The path is clear." Small text: "Executive Briefing | 2026"

---

#### SLIDE 2: THE STAKES
**Headline:** The Gap Between Using AI and Winning with AI
**Content:** Four large stat cards in a 2×2 grid:
- **88%** — "Organizations using AI" (source: McKinsey 2025)
- **33%** — "Have scaled AI enterprise-wide"
- **6%** — "True AI leaders (>5% EBIT impact)"
- **$2.52T** — "Global AI spending in 2026" (source: Gartner)
**Bottom insight:** "Only 6% of firms are true AI leaders. The gap between experimenting and scaling is the defining challenge of 2026."

---

#### SLIDE 3: THE FAILURE RATE
**Headline:** 95% of GenAI Pilots Show Zero P&L Impact
**Content:** Large "95%" in coral red, center-screen, animated counter. Below: three supporting stats as horizontal bars:
- 74% show no tangible value
- 9+ months average pilot-to-production
- $100K–$1M direct cost per failed pilot
**Source:** MIT Media Lab Project NANDA, August 2025
**Bottom insight:** "The technology works. The implementation does not."

---

#### SLIDE 4: THE OPPORTUNITY
**Headline:** $4.4 Trillion in Annual Value from Generative AI
**Content:** Horizontal stacked bar showing value by function:
- Customer Operations: $400B+
- Marketing & Sales: $350B+
- Software Engineering: $300B+
- R&D: $250B+
**Bottom insight:** "75% of GenAI value is concentrated in four business functions. The value is in the work people already do."
**Source:** McKinsey Global Institute, 2023

---

#### SLIDE 5: SECTION DIVIDER — HISTORY
**Headline:** Seventy Years of AI
**Subhead:** From Turing's Question to the Transformer Revolution
**Visual:** Large "70" with subtle animation. Three era labels along a horizontal timeline: Symbolic AI (1950s–1980s) | Machine Learning (1990s–2010s) | Deep Learning & GenAI (2012–Present)

---

#### SLIDE 6: WAVE 1 — SYMBOLIC AI
**Headline:** Wave 1: Teaching Machines to Think in Rules (1950s–1980s)
**Content:** Vertical timeline with 7 milestones:
- 1950: Turing's "Can machines think?"
- 1956: Dartmouth Conference — "Artificial Intelligence" coined
- 1966: ELIZA chatbot (MIT)
- 1972: MYCIN expert system
- 1974: First AI Winter
- 1980: Expert systems boom
- 1987: Second AI Winter
**Bottom insight:** "Intelligence cannot be fully captured in hand-written rules."

---

#### SLIDE 7: WAVE 2 — MACHINE LEARNING
**Headline:** Wave 2: Letting Data Do the Teaching (1990s–2010s)
**Content:** Timeline with 4 milestones (1997 Deep Blue, 2006 Hinton, 2011 Watson, 2012 AlexNet). Below: three-column table of ML types:

| Type | Method | Use Cases |
|------|--------|-----------|
| Supervised | Labeled examples | Spam detection, credit scoring |
| Unsupervised | Hidden structure | Segmentation, anomaly detection |
| Reinforcement | Trial and reward | Game playing, robotics, trading |

**Bottom insight:** "The algorithm that learns from data will always beat the algorithm coded by hand."

---

#### SLIDE 8: WAVE 3 — DEEP LEARNING & TRANSFORMERS
**Headline:** Wave 3: Three Forces Converge (2012–Present)
**Content:** Three converging arrows (Data, Compute, Algorithms) meeting at center. Timeline below: 2012 AlexNet → 2017 Transformer → 2018 BERT → 2020 GPT-3 → 2022 ChatGPT → 2023 GPT-4/Claude/Gemini → 2024 AI Agents → 2025 Compound Systems
**Bottom insight:** "The cost of authoring written content collapsed from ~$1,000 to $0.04 per thousand words."

---

#### SLIDE 9: SECTION DIVIDER — TAXONOMY
**Headline:** The AI Taxonomy
**Subhead:** Definitions That Matter
**Quote:** "The words matter. Know them. Use them precisely. Confusion about terms costs companies millions."

---

#### SLIDE 10: THE NESTED HIERARCHY
**Headline:** AI Is a Stack of Capabilities
**Content:** Animated nested circles (concentric, building outward):
- Inner: **Generative AI** — Creates text, images, code
- Second: **Deep Learning** — Neural networks, complex patterns
- Third: **Machine Learning** — Algorithms that learn from data
- Outer: **Artificial Intelligence** — Machines performing human-intelligence tasks
- Cross-cutting label: **NLP** — Bridges AI and human communication

---

#### SLIDE 11: THE AI SPECTRUM
**Headline:** We Live in the Age of Narrow AI — And That Is Enough
**Content:** Three-stage horizontal spectrum with "YOU ARE HERE" marker:
- **Narrow AI (ANI)** — TODAY: Excels at specific tasks. All current AI.
- **General AI (AGI)** — FUTURE: Human-level flexibility. Not yet achieved.
- **Superintelligence** — HYPOTHETICAL: Surpasses all human intelligence.
**Bottom insight:** "Even GPT-4, Gemini, and Claude are Narrow AI. The business opportunity is enormous precisely because Narrow AI, deployed well, can automate and augment at scale."

---

#### SLIDE 12: KEY ARCHITECTURES
**Headline:** Seven Architectures — Each Built for a Different Job
**Content:** Seven-row table with colored accent bars:

| Architecture | Function | Best Use Case |
|-------------|----------|---------------|
| CNN | Spatial patterns | Visual inspection |
| RNN/LSTM | Sequential data | Time-series forecasting |
| Transformer Encoder | Bidirectional context | Document classification |
| Transformer Decoder | Next-token generation | Report drafting, chatbots |
| Vision Transformer | Image-as-tokens | Multimodal integration |
| Diffusion Models | Noise-to-media | Marketing assets |
| Mixture of Experts | Routed specialization | Large-scale platforms |

---

#### SLIDE 13: HOW LLMS WORK
**Headline:** Four Steps: Tokenize → Embed → Attend → Generate
**Content:** Four-step horizontal pipeline with icons:
1. **Tokenize** — Break text into pieces. "Understanding" → ["under", "stand", "ing"]
2. **Embed** — Convert to vectors. 12,288 numbers capturing meaning.
3. **Attend** — See all words at once. Learn which relate to which.
4. **Generate** — Predict next token. Build coherent responses.
**Bottom insight:** "GPT-3: 175 billion parameters. 96 attention layers. 50,257 token vocabulary."

---

#### SLIDE 14: THE TRAINING PROCESS
**Headline:** From Raw Text to Aligned Intelligence
**Content:** Three-stage pipeline:
1. **Pre-Training** — 300B tokens, self-supervised, next-word prediction
2. **Supervised Fine-Tuning** — ~13,000 curated human demonstrations
3. **RLHF** — ~33,000 human comparisons, reward modeling
**HHH Badge:** Three colored badges: Helpful | Honest | Harmless

---

#### SLIDE 15: SECTION DIVIDER — DATA
**Headline:** The Data Foundation
**Subhead:** Unlocking the 80% of Enterprise Data That Is Unstructured
**Large stat:** "80%" with subtitle "of enterprise data is unstructured — growing 5x faster than structured"

---

#### SLIDE 16: DATA LANDSCAPE
**Headline:** Three Types of Corporate Data
**Content:** Three-column comparison with visual bars showing relative volume:
- **Structured (20%)** — Fixed schema, SQL, 60% of IT budget
- **Semi-Structured (5-10%)** — JSON, XML, logs
- **Unstructured (80%)** — Documents, media, text, 40% of IT budget
**Bottom insight:** "Inverse investment ratio: 60% of spend on 20% of data."

---

#### SLIDE 17: VECTORIZATION & RAG
**Headline:** Vectorization + RAG: How AI Reads Your Enterprise
**Content:** Split slide. Left: Vectorization concept (document → embedding → semantic space). Right: RAG pipeline (Ingest → Store → Retrieve → Generate).
**Bottom insight:** "RAG solves hallucinations by grounding answers in actual enterprise data."

---

#### SLIDE 18: RAG vs. MCP
**Headline:** RAG for History. MCP for Real-Time. Both for Complete Context.
**Content:** Two-column comparison table:
- RAG: Unstructured data, vector search, periodic updates
- MCP: Structured data, API invocation, always current
**Bottom insight:** "Hybrid RAG + MCP provides comprehensive context: historical knowledge + current state."

---

#### SLIDE 19: SECTION DIVIDER — ARCHITECTURE
**Headline:** The Architecture of Modern AI Systems
**Subhead:** Models Alone Do Not Create Intelligence — Systems Do
**Visual:** Equation: Intelligence = Models + Tools + Memory + Planning + Orchestration

---

#### SLIDE 20: THE 7-LAYER STACK
**Headline:** Modern AI Is a Seven-Layer System
**Content:** Vertical stack diagram (bottom to top), each layer a card:
1. Infrastructure — GPU clusters, cloud, storage
2. Models — Language, vision, multimodal
3. Knowledge — Vector DBs, knowledge graphs
4. Tools — APIs, databases, code execution
5. Reasoning — Planning, reflection, chain-of-thought
6. Orchestration — Workflow routing, agent collaboration
7. Applications — Copilots, assistants, automation

---

#### SLIDE 21: FOUR SYSTEM ARCHITECTURES
**Headline:** Four Ways to Architect an AI System
**Content:** Four cards in a 2×2 grid:
- **Single Agent:** User → AI → Answer. Best for contained tasks.
- **Workflow:** Research → Analyze → Write. Best for repeatable pipelines.
- **Multi-Agent:** Manager → Specialists. Best for complex, multi-domain problems.
- **Autonomous:** Goal → Plan → Execute → Adapt. Best for long-horizon planning.

---

#### SLIDE 22: SECTION DIVIDER — PRIMITIVES
**Headline:** AI Primitives
**Subhead:** The Atoms of Intelligence
**Quote:** "The primitives are the parts. The patterns are the craft. The system is the story. Know all three."

---

#### SLIDE 23: SEVEN TECHNICAL PRIMITIVES
**Headline:** Seven Building Blocks Power Every AI System
**Content:** Seven numbered cards in a grid:
1. Tokenization — Language → numbers
2. Embeddings — Meaning → vectors
3. Vector Search — Semantic similarity at scale
4. RAG — Knowledge before generation
5. Context Windows — Working memory
6. Function Calling — Delegating to tools
7. Structured Output — Machine-readable responses

---

#### SLIDE 24: THE FOUR-LAYER STACK
**Headline:** Primitives → Patterns → Frameworks → Governed Systems
**Content:** Four ascending layers:
- Layer 1: **AI Primitives** — Actors, Tools, Instructions, Coordination, Connections, Interactions
- Layer 2: **Design Patterns** — Single-Agent, Sequential, Parallel, Loop, Hierarchical
- Layer 3: **Frameworks** — LangChain, Azure AI, Google Agent, AWS Toolkit, HuggingFace
- Layer 4: **Governed AI Systems** — Observable, Explainable, Auditable, Trustworthy

---

#### SLIDE 25: THE COMPLEXITY LADDER
**Headline:** Climb the Ladder One Rung at a Time
**Content:** Seven-rung vertical ladder (bottom to top):
1. Direct API Call
2. Prompt Engineering
3. RAG Pipeline
4. Single Agent + Tools
5. Agent + Reflection
6. Agent + Planning
7. Multi-Agent Collaboration
**Bottom insight:** "Prove the simpler approach fails before adding complexity."

---

#### SLIDE 26: SECTION DIVIDER — AGENTIC PATTERNS
**Headline:** Agentic Design Patterns
**Subhead:** Which Architecture Fits Your Problem?
**Quote:** "The future of AI isn't about perfect autonomous agents — it's about solving business workflows with the right level of autonomy." — Andrew Ng

---

#### SLIDE 27: FOUR FOUNDATIONAL PATTERNS
**Headline:** Andrew Ng's Four Patterns That Drive AI Progress
**Content:** Four pattern cards:
1. **Reflection** — AI reviews its own output. Reliability: High.
2. **Tool Use** — AI delegates to deterministic systems. Reliability: High.
3. **Planning** — AI breaks tasks into steps. Reliability: Medium.
4. **Multi-Agent** — Specialized AIs collaborate. Reliability: Variable.
**Bottom insight:** "The Reliability-Capability Tradeoff: find the minimum complexity that delivers required capability."

---

#### SLIDE 28: PATTERN SELECTION
**Headline:** The Right Pattern Is the One That Solves the Problem
**Content:** Decision tree (visual flowchart):
- Task well-defined? → YES: Single-Agent or Sequential
- Subtasks independent? → YES: Parallel
- Quality needs iteration? → YES: Loop/Critic
- None of the above? → Hierarchical Multi-Agent
**Table below:**

| Pattern | Complexity | Speed | Quality | Best Use |
|---------|-----------|-------|---------|----------|
| Single-Agent | Low | Fast | Good | Contained tasks |
| Sequential | Low-Med | Medium | Good | Pipelines |
| Parallel | High | Fast | High | Independent subtasks |
| Loop/Critic | Med-High | Slower | Highest | Quality-critical |

---

#### SLIDE 29: AGENTS VS. WORKFLOWS
**Headline:** Agents Explore. Workflows Execute. The Best Systems Use Both.
**Content:** Two-column comparison:
- **Agents:** Autonomous, adaptive, flexible, higher cost, best for exploration
- **Workflows:** Predefined, predictable, efficient, lower cost, best for execution
**Bottom insight:** "Agents call workflows for deterministic operations. Workflows invoke agents when flexibility is needed."

---

#### SLIDE 30: SECTION DIVIDER — DETERMINISTIC TOOLS
**Headline:** Integrating Deterministic Tools
**Subhead:** The Bridge Between Probability and Certainty
**Visual:** Balance scale icon

---

#### SLIDE 31: THE FUNDAMENTAL TENSION
**Headline:** AI Thinks in Probabilities. Business Runs on Certainties.
**Content:** Two-column comparison:
- **Probabilistic (LLMs):** Varied responses, excellent at language/reasoning, unreliable at math
- **Deterministic (Tools):** Same output always, excellent at math/validation, unreliable at language
**Example:** "847 × 923? LLM may err. Calculator: 781,481. Always."
**Bottom insight:** "The agent decides WHAT to calculate. The tool decides HOW."

---

#### SLIDE 32: HYBRID WORKFLOW
**Headline:** The Hybrid Workflow: AI for Understanding, Rules for Precision
**Content:** Horizontal flow diagram:
- Unstructured Input → AI/LLM Layer → Structured Data → Rules Engine → Outcome + Audit Log
**Three patterns below:**
1. LLM + HyperFormula → Verified financial calculations
2. LLM + Decision Table → Policy enforcement with audit trail
3. LLM + Pydantic → Validated structured output

---

#### SLIDE 33: CASE STUDY
**Headline:** Global Bank: 50% Faster Reports, 100% Accuracy
**Content:** Four-step workflow:
1. AI Narrative Agent — Drafts report, pulls live data
2. Deterministic Verification — Python/Pandas cross-checks every figure
3. Compliance Review — Second AI checks regulatory compliance
4. Human Sign-Off — Full audit log
**Results:** Four stat badges: ↓50% time | 100% accuracy | Zero incidents | Analysts freed

---

#### SLIDE 34: SECTION DIVIDER — TRUST STACK
**Headline:** Trust, Safety & Governance
**Subhead:** Build Glass Boxes, Not Black Boxes
**Visual:** Four stacked layers preview

---

#### SLIDE 35: THE FOUR LAYERS OF TRUST
**Headline:** Four Layers — Each Depends on the One Below
**Content:** Four stacked cards (bottom to top):
1. **Observability** — "What is the system doing?" — Logs, metrics, anomaly detection
2. **Explainability** — "Why did it decide that?" — SHAP, LIME, counterfactuals
3. **Guardrails** — "What is it prevented from doing?" — Input/output filters, policy limits
4. **Governance** — "Who is accountable?" — Frameworks, committees, audit trails

---

#### SLIDE 36: OBSERVABILITY vs. EXPLAINABILITY
**Headline:** Observability Watches. Explainability Explains.
**Content:** Comparison table:

| Dimension | Observability | Explainability |
|-----------|--------------|----------------|
| Timing | Real-time | Post-analysis |
| Focus | What it's doing | Why it decided |
| Benefit | Error detection | Compliance, trust |
| Tools | Dashboards, logs | SHAP, LIME, counterfactuals |

---

#### SLIDE 37: FOUR GUARDRAIL LAYERS
**Headline:** Defense in Depth — Four Guardrail Layers
**Content:** Four horizontal bars:
1. **Data** — Quality, privacy, bias prevention, lineage tracking
2. **Model** — Confidence thresholds, drift monitoring, adversarial testing
3. **Application** — Banned topics, toxicity filters, human approval gates
4. **Infrastructure** — Identity verification, rate limiting, encryption, isolation

---

#### SLIDE 38: THE EPOCH FILTER
**Headline:** When Humans Must Stay in the Loop
**Content:** Five-letter framework with icons:
- **E** — Ethical: Moral consequences (hiring, bias)
- **P** — Political: Organizational capital (budgets)
- **O** — Operational: Edge cases (crisis response)
- **C** — Creative: True originality (brand strategy)
- **H** — Human: Empathy required (counseling)
**Rule:** "If ANY letter triggers → Human-in-the-Loop. Never fully autonomous."
**Source:** MIT Sloan Management Review, 2024

---

#### SLIDE 39: THE 90-DAY ROADMAP
**Headline:** From Insight to Action — Your 90-Day AI Leadership Roadmap
**Content:** Three-phase timeline:
- **Days 1-30: Foundation** — Audit, define principles, establish governance, identify 2-3 opportunities
- **Days 31-60: Architecture** — Map workflows, select patterns, evaluate frameworks, design hybrid systems
- **Days 61-90: Scale & Govern** — Deploy observability, implement guardrails, launch training, establish review cadence
**Outcomes:** 2 systems in production | 20+ use cases mapped | 1 governance framework | ROI demonstrated

---

#### SLIDE 40: CLOSING
**Headline:** Build Right. Integrate Smart. Govern Well.
**Content:** Three pillars with brief descriptions:
- **Build Right** — Primitives, patterns, frameworks. Architect for purpose, not complexity.
- **Integrate Smart** — AI + deterministic tools. Accuracy, auditability, speed.
- **Govern Well** — Observability, explainability, guardrails. From day one.
**Closing quote:** "The best AI systems are not the most complex. They are the most purposeful. Build them with clarity. Deploy them with care. Govern them with conviction."
**Final line:** "The tools are here. The patterns are proven. The path is clear."

---

### IMPLEMENTATION NOTES

1. **Slide container:** Each slide is a `<section>` with `class="slide"` and `data-slide-number`. Only the active slide is visible (`display: flex`, centered content).

2. **Navigation logic:**
```
- currentSlide variable tracks position (0-indexed)
- showSlide(n) function handles transitions
- Arrow keys, space, click zones, and touch swipe all call showSlide
- Progress bar width = (currentSlide / totalSlides) * 100%
```

3. **Animated counters:** For stat numbers, use `requestAnimationFrame` to count from 0 to target value over 1 second when the slide becomes active. Use `IntersectionObserver` or slide-change event.

4. **Title slide animation:** Create 20-30 small circles with CSS animation (`@keyframes float`) that drift slowly across the background. Low opacity (0.03-0.08). Different sizes and speeds. This creates the "node network" effect without heavy JS.

5. **Overview mode:** Press 'O' to toggle. Shows all slides as small thumbnails (5 per row) in a scrollable grid. Click any thumbnail to jump to that slide.

6. **Speaker notes:** Each `<section>` has a `data-notes` attribute. Press 'N' to show/hide a bottom panel displaying the current slide's notes.

7. **Responsive breakpoints:**
- Desktop (>1200px): Full layout
- Tablet (768-1200px): Slightly reduced font sizes, 2-column grids become 1-column
- Mobile (<768px): Single column, reduced padding, swipe navigation

8. **Print styles:** `@media print` — all slides visible in sequence, page-break-after on each, white background, dark text.

9. **Performance:** No external libraries. No canvas. No WebGL. Pure HTML + CSS + vanilla JS. Should load in under 1 second.

10. **Accessibility:** All slides have `role="region"` and `aria-label`. Keyboard navigation is fully accessible. Color contrast meets WCAG AA.

### OUTPUT

Generate the complete HTML file. Every slide must be fully populated with the content specified above. Do not use placeholder text. Do not abbreviate. Include all tables, all stats, all quotes, all source citations. The file should be production-ready — something an executive could present tomorrow.

---

## END PROMPT

---

## Usage Notes

**For Claude Code:** Paste the entire prompt above. Claude will generate a single HTML file. Save it and open in any browser.

**For Claude with Artifacts:** The same prompt works. Claude will render the presentation as an interactive artifact.

**Customization:** To modify content, edit the slide descriptions in the "SLIDE CONTENT" section. The design system and technical requirements remain constant.

**Extending to more slides:** To expand from 40 to 120 slides (matching the full PowerPoint outline), add slide descriptions following the same format. The navigation and styling will scale automatically.

**Brand customization:** Replace the color palette values in the "DESIGN SYSTEM" section with your brand colors. Replace the font stack with your brand typography.
