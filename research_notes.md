# Live Site Audit Notes

## Genesis Nations Host

Source: [Genesis Nations](https://genesisnations-6t6jlssk.manus.space/)

The current host uses a warm cream canvas, deep green typography, teal italic emphasis, an editorial serif voice, thin borders, illustrated hero scenes, and a seven-item desktop navigation. Its primary routes are Atlas, Table of Nations, Censuses, Levite Allocator, Revelation, and Sources. The opening page promises deterministic arithmetic and cited sources, but several inline references such as “Genesis 9:18–19,” “Num 1:46,” and “Num 26:51” are rendered as text rather than clickable source links. The Temple Atlas integration should therefore improve citation affordances throughout the host shell instead of reproducing the present inconsistency.

## Temple Map Instrument

Source: [Ancient Temples of the World](https://templemap-c7mlfbq3.manus.space/?code=SZkkdocaAQRTr8pdSFmbb5)

The map is a dense full-viewport instrument with a left research sidebar and a world map. It exposes keyword search; region, era, tradition, and country filters; a UNESCO-only toggle; result reset; a scrollable list; map mode controls; clustered markers; and a bottom chronology/range control. The page states “118 sacred compounds,” while its current filtered/default status showed “116 of 118 temples shown.” Its independent visual treatment is lighter and more application-like than Genesis Nations, so seamless integration requires a host frame and coordinated design tokens around the embed. Because the embedded application is deployed independently, parent CSS cannot restyle its internal DOM across origins; visual unity must therefore be achieved through the shared outer shell, carefully matched framing, and a clear path to later harmonize the Temple Map codebase itself if its source is provided.

The map's About panel describes it as “a curated, color-coded interactive map of 118 major ancient temple compounds across the world—from Göbekli Tepe (c. 9500 BCE) to the late Aztec Templo Mayor.” It instructs researchers to select markers or list items, filter by region/religion/era/country/UNESCO status, switch basemaps, and use dark mode. Its stated source classes are the [UNESCO World Heritage Centre](https://whc.unesco.org/), [Wikipedia](https://www.wikipedia.org/), [Encyclopaedia Britannica](https://www.britannica.com/), and academic archaeology references. The About panel also states that dates and dimensions for ancient sites are approximate and that entries marked “c.” are conventional best estimates. That caveat should remain visible in the host-level research note rather than being hidden inside the embedded modal.

## Integration Risks and Decisions

| Issue | Assessment | Decision |
|---|---|---|
| Cross-origin styling | Parent styles cannot modify an externally hosted iframe's internal typography or controls. | Match the host shell to the Temple Atlas frame; preserve an explicit open-original link; document the source-code limitation honestly. |
| Query credential | The supplied Temple Map URL includes a `code` query parameter. | Preserve the exact user-supplied URL in the iframe and external link. |
| Citation quality | Current host text includes many unlinked scriptural and scholarly references. | Build citation components with direct canonical links and accessible external-link labels. |
| Viewport density | The map requires substantial height and width. | Use a route-specific full-bleed layout with a minimum map height and responsive orientation band. |
| Academic usability | PhD-level users need method, scope, and provenance, not simplified promotional copy. | Include a concise research note, scope statement, source pathway, and machine-readable page metadata. |

## Implementation and QA Record

The integrated build establishes three first-class routes: the editorial Atlas home, the embedded Temple Atlas workspace, and the Sources and Method apparatus. Desktop review confirmed a coherent parchment, evergreen, oxidized-teal, clay-gold, editorial-serif, and condensed-label system across all routes. The Temple Atlas remains within the Genesis Nations masthead and footer, with visible embed state, a full-view control, and an explicit link to the original instrument.

Mobile review at 390 × 844 confirmed that the navigation condenses to an icon-and-drawer masthead, research paths become a single reading column, source links remain visible, and the Temple Atlas retains a dedicated 74-dvh instrument viewport. The embedded document was still loading when the concurrent mobile full-page capture occurred; the iframe includes an explicit fallback link and the original instrument remains available through the adjacent “Open original” control.

The visual-review refinement retained the established Illuminated Scholarly Atlas direction and strengthened the emblem, secondary-page register marks, folio annotations, and archival imagery. The cross-origin Temple Atlas interface cannot receive host-page CSS tokens directly; the host frame therefore supplies the shared visual system without interfering with the embedded instrument’s controls.

An automated URL response audit confirmed successful responses from the two Manus sites, the Chicago Manual of Style citation guide, and Wikipedia. UNESCO and Britannica returned automated-access restrictions, while Bible Gateway rejected the sandbox TLS client; these outcomes are access-control or client-handshake behaviors rather than evidence that the user-facing hyperlinks are malformed.

A direct browser verification of `/temples` confirmed that the cross-origin instrument completes loading after its initialization interval. The status changes from “Loading the comparative instrument…” to “Instrument loaded · interactive,” and the embedded document exposes all 118 records, search, region/era/tradition/country filters, UNESCO-only filtering, map modes, marker clusters, and the list panel inside the Genesis Nations shell.

Night-mode browser verification confirmed that the host shell switches to deep evergreen surfaces with warm ivory text, preserves teal links and the clay-gold register accent, keeps the masthead and workspace controls legible, and does not interrupt the already-loaded embedded instrument. The control label also updates to “Switch to day mode,” confirming the state change is exposed accessibly.
