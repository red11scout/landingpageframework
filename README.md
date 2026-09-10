# Revolution Nights

**Revolution Nights** is a responsive HTML application that turns the American Revolution into a 90-night family learning journey. It is built with React, TypeScript, Vite, Tailwind CSS, and semantic browser APIs. The interface is designed mobile-first and expands into a polished desktop reading experience without removing content or functionality.

## Experience

The application consolidates the curriculum into four primary areas. **Today** provides the next recommended night and a historical moment. **Learn** offers a searchable, theme-filtered catalog of all 90 lessons. **Discover** nests the timeline, places, people, glossary, and lesson connections into one focused exploration screen. **Journey** presents persistent progress, nested chapter checklists, the next-night action, and gated family quizzes.

Every lesson includes Read, Explore, and Discuss modes, browser-native narration, primary-source excerpts, external references, key facts, people, places, connected lessons, progress controls, and browser-native printing. The study-pack builder can print one night, any custom selection, a full chapter, or the complete curriculum.

## Mobile optimization

The HTML uses viewport-safe layout rules, touch-sized controls, an adaptive bottom navigation dock, horizontally scrollable filters, responsive typography, mobile-specific hero artwork, reduced-motion support, keyboard focus states, and lazy-loaded routes. Desktop layouts use wider grids and top navigation while retaining the same features.

## Development

```bash
pnpm install
pnpm dev
```

## Verification

```bash
pnpm test
pnpm check
pnpm build
```

The regression suite verifies all 90 lesson identifiers, ten-theme coverage, connected-lesson integrity, selected print-pack output, and safe HTML escaping.
