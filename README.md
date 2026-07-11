# Genesis Nations Integrated Scholarly Atlas

This repository contains the integrated **Genesis Nations** educational website as its root application. It adds the [Ancient Temples of the World](https://templemap-c7mlfbq3.manus.space/?code=SZkkdocaAQRTr8pdSFmbb5) research instrument as a dedicated Temple Atlas tab within a unified editorial interface, while preserving direct access to the original [Genesis Nations](https://genesisnations-6t6jlssk.manus.space) study routes.

## Experience

The frontend uses an **Illuminated Scholarly Atlas** design system: warm vellum surfaces, evergreen ink, oxidized-teal citations, editorial serif typography, technical folio labels, engraved institutional imagery, and coordinated day/night modes. The Temple Atlas remains interactive inside a responsive, labeled iframe with a full-view option and a direct-link fallback.

| Route | Purpose |
|---|---|
| `/` | Integrated scholarly landing page and research pathways |
| `/temples` | Embedded comparative Temple Atlas workspace |
| `/sources` | Source hierarchy, dating cautions, and citation policy |

## Development

```bash
pnpm install
pnpm dev
```

The development server is provided by Vite. The project is a static React 19 frontend; the `server/` directory only supplies the template's production static-file wrapper.

## Verification

```bash
pnpm check
pnpm build
```

The implementation was reviewed at desktop and mobile breakpoints. External links open with safe rel attributes, the embedded atlas has an accessible title and loading state, and the day/night control exposes its current action to assistive technology.

## Research-use note

The atlas is a discovery and comparison instrument, not a substitute for primary archaeological publications, excavation reports, institutional catalogues, or site-level records. Dates marked **“c.”** are conventional approximations; researchers should verify the definition and evidentiary basis of a displayed date before formal citation.
