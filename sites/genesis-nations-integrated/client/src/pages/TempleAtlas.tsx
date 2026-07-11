/**
 * Illuminated Scholarly Atlas: the embedded map receives a rigorous host frame and maximal research space.
 */
import { CitationLink } from "@/components/CitationLink";
import { ArrowUpRight, CheckCircle2, Expand, Info, LoaderCircle, Map } from "lucide-react";
import { useRef, useState } from "react";

const templeAtlasUrl = "https://templemap-c7mlfbq3.manus.space/?code=SZkkdocaAQRTr8pdSFmbb5";

export default function TempleAtlas() {
  const [loaded, setLoaded] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const openFullscreen = async () => {
    if (frameRef.current?.requestFullscreen) {
      await frameRef.current.requestFullscreen();
    }
  };

  return (
    <main className="temple-page">
      <section className="temple-orientation">
        <div className="temple-orientation__copy">
          <p className="eyebrow">Comparative sacred geography · embedded research instrument</p>
          <h1>Ancient Temples of the World</h1>
          <p>
            Explore 118 major sacred compounds across region, era, tradition, and country—from Göbekli Tepe to the
            late Aztec Templo Mayor. Dates and dimensions are approximate; <strong>“c.”</strong> marks a conventional
            estimate.
          </p>
          <div className="inline-source-row">
            <CitationLink href={templeAtlasUrl} label="Original atlas" />
            <CitationLink href="https://whc.unesco.org/en/list/" label="UNESCO records" />
            <CitationLink href="https://www.britannica.com/" label="Britannica" />
          </div>
        </div>
        <div className="temple-orientation__figure" aria-hidden="true">
          <img src="/manus-storage/temple-comparison-engraving-v2_e62d93b1.png" alt="" />
        </div>
      </section>

      <section className="atlas-workspace" aria-labelledby="workspace-title">
        <div className="atlas-toolbar">
          <div className="atlas-toolbar__status">
            <span className={loaded ? "status-dot is-ready" : "status-dot"} aria-hidden="true" />
            <div>
              <h2 id="workspace-title">Temple Atlas workspace</h2>
              <p>{loaded ? "Instrument loaded · interactive" : "Loading the comparative instrument…"}</p>
            </div>
          </div>
          <div className="atlas-toolbar__actions">
            <button className="tool-button" type="button" onClick={openFullscreen}>
              <Expand aria-hidden="true" size={15} /> Full view
            </button>
            <a className="tool-button" href={templeAtlasUrl} target="_blank" rel="noreferrer noopener">
              <ArrowUpRight aria-hidden="true" size={15} /> Open original
              <span className="sr-only"> in a new tab</span>
            </a>
          </div>
        </div>

        <div className="atlas-frame" ref={frameRef}>
          {!loaded && (
            <div className="atlas-loader" role="status">
              <LoaderCircle aria-hidden="true" size={24} />
              <span>Preparing the map, filters, and chronology controls</span>
            </div>
          )}
          <iframe
            src={templeAtlasUrl}
            title="Ancient Temples of the World interactive atlas"
            loading="eager"
            allow="fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => setLoaded(true)}
          >
            <p>
              This browser cannot display the embedded atlas. <a href={templeAtlasUrl}>Open the Temple Atlas directly.</a>
            </p>
          </iframe>
        </div>
      </section>

      <section className="atlas-notes" aria-label="Research guidance">
        <article>
          <Map aria-hidden="true" size={18} />
          <div>
            <h2>Suggested workflow</h2>
            <p>
              Begin with a region or chronological range, inspect individual records, and then widen the comparison.
              Map clustering indicates density at the current zoom; it does not establish historical influence.
            </p>
          </div>
        </article>
        <article>
          <Info aria-hidden="true" size={18} />
          <div>
            <h2>Dating caution</h2>
            <p>
              Construction, foundation, ritual use, rebuilding, and monumental completion may produce different dates.
              Verify the date definition in an institutional or archaeological source before citation.
            </p>
          </div>
        </article>
        <article>
          <CheckCircle2 aria-hidden="true" size={18} />
          <div>
            <h2>Citation pathway</h2>
            <p>
              Use the atlas to locate and compare; cite the underlying excavation report, catalogue, corpus, or UNESCO
              property record in formal academic writing.
            </p>
          </div>
        </article>
      </section>
    </main>
  );
}
