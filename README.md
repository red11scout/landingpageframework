# Revolution Nights

**Revolution Nights** is a responsive HTML application that turns the American Revolution into a 90-night family learning journey. It is built with React, TypeScript, Vite, Tailwind CSS, and semantic browser APIs. The interface is designed mobile-first and expands into a polished desktop reading experience without removing content or functionality.

## Experience

The application consolidates the curriculum into four primary areas. **Today** provides the next recommended night and a historical moment. **Learn** offers a searchable, theme-filtered catalog of all 90 lessons. **Discover** nests the timeline, places, people, glossary, and lesson connections into one focused exploration screen. **Journey** presents persistent progress, nested chapter checklists, the next-night action, and gated family quizzes.

Every lesson includes Read, Explore, and Discuss modes, browser-native narration, primary-source excerpts, external references, key facts, people, places, connected lessons, progress controls, and browser-native printing. The study-pack builder can print one night, any custom selection, a full chapter, or the complete curriculum.

## Mobile optimization

The HTML uses viewport-safe layout rules, touch-sized controls, an adaptive bottom navigation dock, horizontally scrollable filters, responsive typography, mobile-specific hero artwork, reduced-motion support, keyboard focus states, and lazy-loaded routes. Desktop layouts use wider grids and top navigation while retaining the same features.

## Install and offline use

The production build is an installable Progressive Web App. Supported browsers surface an **Install app** control; iPhone and iPad users receive Safari-specific Add to Home Screen instructions. Workbox precaches the app shell, curriculum, route chunks, and interface styles. Fonts and durable CDN artwork are cached after first use. Once the app reports **Ready offline**, previously unseen application routes continue to work even when the origin is unavailable, while progress remains safely stored in the browser.

## Share family progress

Journey includes a **Share** action that opens the device share sheet when available and copies a link otherwise. The compact `/share?p=…` URL contains only completed night numbers—no names, account data, or private profile information. Recipients see a responsive read-only card with total progress, the next unfinished night, and chapter-by-chapter totals.

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

The regression suite verifies all 90 lesson identifiers, ten-theme coverage, connected-lesson integrity, selected print-pack output, safe HTML escaping, and deterministic progress-link encoding. Release verification also checks generated manifest and service-worker artifacts plus a server-offline navigation test.
