# Claude Code Prompt: The Architecture of Modern AI Systems

**Instructions for the User:**
*Copy the entire prompt below and paste it into Claude (or your preferred LLM code generator) to build the HTML-based presentation.*

---

**Prompt:**

You are a world-class front-end developer and a leading enterprise AI architect. Your task is to build a flawless, interactive, single-page HTML presentation titled "The Architecture of Modern AI Systems."

You must adopt a highly specific persona for the content and design:
1. **Expertise:** Combine the rigorous academic perspective of top researchers at MIT and Stanford, the strategic business framing of consultants at BCG, Bain, and McKinsey, and the frontier engineering insights of lead scientists at Anthropic, DeepMind, and Meta.
2. **Voice and Tone:** Write entirely in the style of Ernest Hemingway. Use short, direct, declarative sentences. Avoid jargon where possible; when technical terms are necessary, define them with absolute clarity. The tone must be professional, polite, warm, and highly authoritative. No fluff. No filler.

### Technical & Design Requirements:
1. **Single File:** Build the presentation as a single `index.html` file containing all HTML, embedded CSS, and vanilla JavaScript. Do not use external libraries (like React or Tailwind) unless loaded via CDN. Pure HTML/CSS/JS is preferred for portability.
2. **Executive Aesthetics:** Use a modern, ultra-clean, executive-level design. 
   - **Colors:** Muted, professional palette. Slate grays (#1E293B), deep blues (#0F172A), crisp whites (#FFFFFF), and subtle accents (e.g., a muted teal #38BDF8 for highlights).
   - **Typography:** Use a strong, sans-serif font like Inter or Helvetica Neue. 
   - **Whitespace:** Use generous padding and margins. The design must breathe.
3. **Interactivity:** Implement smooth, horizontal slide transitions. Allow navigation via keyboard arrow keys, spacebar, and on-screen minimalist buttons.
4. **Responsiveness:** The layout must dynamically adjust for mobile, tablet, and desktop. Ensure text does not overlap and remains perfectly legible on all screen sizes.
5. **Progress:** Include a persistent, elegant progress bar at the bottom of the screen.

### Content and Logical Flow (10 Slides):

Generate the HTML structure to accommodate the following 10 slides. Write the actual content for each slide using the Hemingway voice.

**Slide 1: Title**
- Headline: The Architecture of Modern AI Systems
- Sub-headline: From Foundation Models to Governed Agentic Workflows. A Holistic Guide for Executives.

**Slide 2: The Stakes**
- Explain the $4.4 trillion economic opportunity. 
- Highlight the adoption gap: 88% experiment, but only 5% lead. 
- State clearly why 95% of pilots fail: pilot purgatory, lack of architectural discipline, and treating AI as an IT experiment rather than a business transformation.

**Slide 3: The 70-Year History of AI**
- Summarize the three waves: 
  1. Symbolic Logic and Expert Systems (and why brittle rules caused the AI winters).
  2. Statistical Machine Learning.
  3. The Deep Learning and Transformer revolution.
- Explain how data, compute, and algorithms converged in 2012 to spark the modern era.

**Slide 4: Defining the Taxonomy**
- Define and distinguish the nested circles: Artificial Intelligence, Machine Learning, Deep Learning, and Generative AI.
- Contrast neural network architectures: CNNs (for vision), RNNs (for sequences), and Transformers (for language and attention).
- Explain LLM architectures: Encoder (BERT), Decoder (GPT), and Encoder-Decoder (T5).
- Define Multimodal models and Mixture of Experts (MoE).

**Slide 5: The AI Primitives**
- Explain the atomic layer of AI. Define the 7 primitives clearly: 
  1. Tokenization 
  2. Embeddings 
  3. Vector Search 
  4. RAG (Retrieval-Augmented Generation) 
  5. Context Windows 
  6. Function Calling 
  7. Structured Output.

**Slide 6: Agentic Design Patterns**
- Define an AI agent (LLM + Tools + Memory + Planning).
- Explain Andrew Ng's four patterns: Reflection, Tool Use, Planning, and Multi-Agent collaboration.
- Explain Anthropic's workflow patterns: Prompt chaining, routing, and evaluator-optimizer loops.

**Slide 7: Deterministic Tools vs. Probabilistic AI**
- Explain the critical difference. AI is probabilistic; it guesses. Traditional software is deterministic; it knows.
- Detail how agents use deterministic tools (HyperFormula, GRID, pandas, Pydantic) to ensure 100% accurate calculations and strict schema validation.
- Emphasize the hybrid architecture rule: The AI reasons about *what* to do; the deterministic tool executes *how* to do it.

**Slide 8: The Trust Stack**
- Break down the governance architecture into three pillars. Use a CSS Grid to display these side-by-side.
  - **Observability:** What is the system doing? (Real-time monitoring, token usage, latency).
  - **Explainability:** Why did the system do that? (Post-analysis, SHAP, LIME).
  - **Guardrails:** What is the system prevented from doing? (Input/output filters, action limits).

**Slide 9: AI Governance**
- Explain the three major frameworks: 
  - NIST AI RMF (voluntary, practical).
  - EU AI Act (binding, risk-based).
  - ISO/IEC 42001 (certifiable standard).
- Emphasize the principle of "Compliance by Design." Do not bolt it on later.

**Slide 10: The Executive Mandate**
- Provide a clear, actionable summary.
- Focus on workflows over models. Build hybrid systems. Earn autonomy incrementally. Govern from day one.

### Final Constraints:
- Do not use long lists of bullet points. Write in short, punchy paragraphs.
- Ensure all text is perfectly readable with high contrast against the background.
- Output the complete, functional HTML code block. I must be able to save it as `index.html` and open it in a browser to see a flawless, top 1% presentation.
