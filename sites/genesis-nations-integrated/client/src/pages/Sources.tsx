/**
 * Illuminated Scholarly Atlas: source hierarchy and uncertainty are stated plainly for advanced academic use.
 */
import { CitationLink } from "@/components/CitationLink";
import { ArrowUpRight } from "lucide-react";

const sources = [
  {
    class: "Primary textual witness",
    use: "Biblical passages, genealogies, enumeration, and literary context.",
    examples: [
      ["Genesis 10 (ESV)", "https://www.biblegateway.com/passage/?search=Genesis%2010&version=ESV"],
      ["Numbers 1, 2 & 26 (ESV)", "https://www.biblegateway.com/passage/?search=Numbers%201%2C%20Numbers%202%2C%20Numbers%2026&version=ESV"],
      ["Revelation 1–22 (ESV)", "https://www.biblegateway.com/passage/?search=Revelation%201-22&version=ESV"],
    ],
  },
  {
    class: "Institutional heritage record",
    use: "Property boundaries, inscription criteria, official site descriptions, and conservation context.",
    examples: [
      ["UNESCO World Heritage List", "https://whc.unesco.org/en/list/"],
      ["UNESCO World Heritage Centre", "https://whc.unesco.org/"],
    ],
  },
  {
    class: "Reference gateway",
    use: "Terminology, orientation, bibliographic leads, and cross-checking; not a substitute for specialist literature.",
    examples: [
      ["Encyclopaedia Britannica", "https://www.britannica.com/"],
      ["Wikipedia", "https://www.wikipedia.org/"],
    ],
  },
  {
    class: "Interactive research layer",
    use: "Comparative browsing, spatial hypothesis formation, chronological filtering, and record discovery.",
    examples: [
      ["Ancient Temples of the World", "https://templemap-c7mlfbq3.manus.space/?code=SZkkdocaAQRTr8pdSFmbb5"],
      ["Genesis Nations original atlas", "https://genesisnations-6t6jlssk.manus.space/"],
    ],
  },
];

export default function Sources() {
  return (
    <main className="sources-page">
      <header className="sources-hero">
        <div>
          <p className="eyebrow">Scholarly apparatus · version 1.0</p>
          <h1>Sources, method, and limits.</h1>
          <p>
            This atlas separates primary texts, institutional records, general reference gateways, and interactive
            research layers. That hierarchy is a guide to use—not a claim that every item record carries equal
            evidentiary weight.
          </p>
        </div>
        <img
          src="/manus-storage/chronology-register-v2_2346cb05.png"
          alt="Engraved archaeological strata and sacred architecture chronology"
        />
      </header>

      <section className="section sources-table-section" aria-labelledby="source-hierarchy-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Source hierarchy</p>
            <h2 id="source-hierarchy-title">Follow the claim to its strongest available witness.</h2>
          </div>
          <p>
            Interactive displays are excellent for discovery and comparison. Formal research should cite the textual,
            archaeological, epigraphic, catalogue, or institutional record that supports the specific claim.
          </p>
        </div>
        <div className="table-scroll" role="region" aria-label="Source hierarchy table" tabIndex={0}>
          <table className="sources-table">
            <thead>
              <tr>
                <th scope="col">Source class</th>
                <th scope="col">Appropriate use</th>
                <th scope="col">Clickable gateways</th>
              </tr>
            </thead>
            <tbody>
              {sources.map((source) => (
                <tr key={source.class}>
                  <th scope="row">{source.class}</th>
                  <td>{source.use}</td>
                  <td>
                    <div className="source-stack">
                      {source.examples.map(([label, href]) => (
                        <CitationLink key={href} href={href} label={label} compact />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section method-ledger" aria-labelledby="method-ledger-title">
        <div>
          <p className="eyebrow">Critical method</p>
          <h2 id="method-ledger-title">What the interface can—and cannot—establish.</h2>
        </div>
        <div className="method-ledger__entries">
          <article><span>01</span><h3>Geographic placement</h3><p>Markers support spatial orientation and comparison. They do not, by themselves, establish cultural transmission, dependence, or historical contact.</p></article>
          <article><span>02</span><h3>Chronological range</h3><p>Displayed dates may refer to foundation, a major construction phase, rebuilding, or conventional periodization. “c.” identifies an approximate conventional estimate.</p></article>
          <article><span>03</span><h3>Category labels</h3><p>Terms such as “religion,” “temple,” and “tradition” are comparative metadata. Their fit may vary across cultures and historical periods.</p></article>
          <article><span>04</span><h3>Textual interpretation</h3><p>Biblical atlas layers visualize a reading of genealogical and numerical texts. Researchers should compare translations, textual witnesses, and specialist commentaries.</p></article>
        </div>
      </section>

      <section className="section citation-policy">
        <div>
          <p className="eyebrow">Recommended citation practice</p>
          <h2>Cite the instrument and the evidence it helped you find.</h2>
        </div>
        <div>
          <p>
            Record the atlas title, stable URL, access date, active filters, and selected record. Then cite the
            underlying excavation publication, official catalogue, corpus entry, or institutional property record that
            supports the proposition in your argument.
          </p>
          <a className="text-link" href="https://www.chicagomanualofstyle.org/tools_citationguide.html" target="_blank" rel="noreferrer noopener">
            Chicago-Style Citation Quick Guide <ArrowUpRight aria-hidden="true" size={15} />
          </a>
        </div>
      </section>
    </main>
  );
}
