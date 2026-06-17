# The Bible Translation Atlas

**An interactive scholarly atlas of how the Bible was written, copied, canonized, translated, and debated across three thousand years.**

This is a single-page, client-rendered React experience built on the project's Vite + React 19 + TypeScript + Tailwind v4 stack. It presents a rigorously sourced, multi-tradition view of the biblical text — designed to be visually premium, academically honest, and fully responsive in both light and dark mode.

---

## What it covers

The Atlas is organized as eight narrative "chapters," each a self-contained interactive section:

| # | Section | What it does |
|---|---------|--------------|
| I | **Timeline** | A filterable journey through ~20 pivotal events, from the composition of the Hebrew Scriptures (c. 1400 BC) to the NRSV Updated Edition (2021). Filter by era. |
| II | **Lineage** | A "family tree" tracing every English Bible back through its manuscript stream — Masoretic, Septuagint, Alexandrian, Byzantine, Vulgate, Critical Text, Textus Receptus. Hover to highlight a bloodline. |
| III | **Translation Explorer** | 24 major English versions as filterable cards (philosophy, tradition, canon, literalness, reading level, year). Click any version for a full profile with manuscript basis and a literalness meter. |
| IV | **Comparison Engine** | Pick a landmark verse (John 1:1, John 3:16, Genesis 1:1, Psalm 23:1, Isaiah 7:14, 1 John 5:7–8) and watch translations diverge, ordered most-literal to most-dynamic, against the original Hebrew/Greek with transliteration and a scholarly note. |
| V | **Canon Comparison** | A matrix of which books each of five traditions (Jewish, Protestant, Catholic, Eastern Orthodox, Ethiopian Orthodox) accepts — highlighting the deuterocanon. |
| VI | **Manuscripts** | The major witnesses (Sinaiticus, Vaticanus, Alexandrinus, the Dead Sea Scrolls, Leningrad Codex, Textus Receptus) and the text-type families they belong to. |
| VII | **Textual Variants** | The honest hard cases — the Comma Johanneum, the Longer Ending of Mark, the Woman Caught in Adultery, *almah* in Isaiah 7:14, John 1:18 — each with a scholarly-consensus confidence meter. |
| VIII | **Perspectives** | Read a contested verse through five lenses (Conservative Evangelical, Roman Catholic, Eastern Orthodox, Secular Academic, Jewish Scholarship), each in its own charitable voice. |
| — | **Bible Finder** | A short questionnaire that recommends a translation based on the reader's priorities. |
| — | **Sources** | Inline-numbered citations to the references underpinning the data. |

## Design

A scholarly "manuscript & ink" aesthetic: warm parchment/ivory in light mode, deep ink-navy in dark mode, antique-gold accents, a Cormorant Garamond serif display paired with Inter for UI. Smooth `framer-motion` transitions, a sticky in-page navigator with scroll-spy, full keyboard-reachable controls, and a mobile hamburger menu.

## Data

All content lives in typed modules under `client/src/data/`:

- `translations.ts` — the 24-version catalog
- `verses.ts` — verse-by-verse renderings + original-language text
- `atlas.ts` — timeline, lineage, canons, manuscripts, variants, lenses, quiz
- `references.ts` — citations

The underlying research dossier (with source tiers) is kept in the task workspace.

## Run

```bash
pnpm install
pnpm dev      # development
pnpm build    # production build -> dist/
pnpm start    # serve the production build
```

The experience is entirely client-side; no database or authentication is required to view it.

## A note on scope

This Atlas aims to *describe* how scholars and traditions understand the text — its transmission, its variants, and its competing canons — without adjudicating matters of faith. Confidence labels reflect mainstream text-critical consensus and are presented to illuminate, not to unsettle.
