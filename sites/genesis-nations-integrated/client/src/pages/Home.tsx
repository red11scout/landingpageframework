/**
 * Illuminated Scholarly Atlas: the homepage makes a precise intellectual promise, then routes directly to evidence.
 */
import { CitationLink } from "@/components/CitationLink";
import { ArrowRight, BookOpen, Calculator, Landmark, MapPinned, ScrollText } from "lucide-react";
import { Link } from "wouter";

const originalAtlas = "https://genesisnations-6t6jlssk.manus.space";

const researchPaths = [
  {
    eyebrow: "Genesis 10",
    title: "Table of Nations",
    copy: "Trace the genealogical geography of Shem, Ham, and Japheth through the atlas's existing lineage study.",
    href: `${originalAtlas}/nations`,
    action: "Trace the lineage",
    icon: MapPinned,
    source: "https://www.biblegateway.com/passage/?search=Genesis%2010&version=ESV",
  },
  {
    eyebrow: "Numbers 1, 2 & 26",
    title: "Censuses of Israel",
    copy: "Compare the two wilderness censuses and examine the tribal arrangement around the tabernacle.",
    href: `${originalAtlas}/census`,
    action: "Examine the counts",
    icon: Calculator,
    source: "https://www.biblegateway.com/passage/?search=Numbers%201%2C%20Numbers%202%2C%20Numbers%2026&version=ESV",
  },
  {
    eyebrow: "Comparative sacred geography",
    title: "Ancient Temple Atlas",
    copy: "Interrogate 118 sacred compounds across geography, chronology, tradition, and UNESCO status.",
    href: "/temples",
    action: "Open the temple atlas",
    icon: Landmark,
    source: "https://templemap-c7mlfbq3.manus.space/?code=SZkkdocaAQRTr8pdSFmbb5",
    internal: true,
  },
  {
    eyebrow: "Revelation 1–22",
    title: "The Apocalypse, Mapped",
    copy: "Read Revelation chapter by chapter alongside its Old and New Testament intertexts.",
    href: `${originalAtlas}/revelation`,
    action: "Open Revelation",
    icon: BookOpen,
    source: "https://www.biblegateway.com/passage/?search=Revelation%201-22&version=ESV",
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero-section">
        <div className="atlas-register" aria-hidden="true">
          <span>35.0° N</span>
          <span>Folio I</span>
        </div>
        <div className="hero-section__grid">
          <div className="hero-copy enter-stage">
            <p className="eyebrow">An atlas of Scripture · peoples · sacred geography</p>
            <h1>
              From ancestral lines
              <em>to the architecture of nations.</em>
            </h1>
            <p className="hero-lede">
              A source-conscious environment for studying biblical genealogies, Israelite enumeration, and sacred
              compounds across the ancient world. Claims lead to texts; instruments disclose their limits.
            </p>
            <div className="hero-actions">
              <Link className="button button--primary" href="/temples">
                Open the Temple Atlas <ArrowRight aria-hidden="true" size={16} />
              </Link>
              <a className="button button--secondary" href={`${originalAtlas}/nations`}>
                Begin with Genesis 10
              </a>
            </div>
            <div className="hero-citations" aria-label="Opening sources">
              <CitationLink
                href="https://www.biblegateway.com/passage/?search=Genesis%2010%3A32&version=ESV"
                label="Genesis 10:32"
                compact
              />
              <CitationLink
                href="https://templemap-c7mlfbq3.manus.space/?code=SZkkdocaAQRTr8pdSFmbb5"
                label="Temple Atlas scope"
                compact
              />
            </div>
          </div>

          <figure className="hero-plate enter-stage enter-stage--delay">
            <img
              src="/manus-storage/temple-atlas-anchor_89a90d22.png"
              alt="Engraved comparative world atlas with silhouettes of sacred architecture"
            />
            <figcaption>
              <span>Comparative sacred geography</span>
              <CitationLink
                href="https://templemap-c7mlfbq3.manus.space/?code=SZkkdocaAQRTr8pdSFmbb5"
                label="Interactive dataset"
                compact
              />
            </figcaption>
          </figure>
        </div>

        <aside className="research-hint">
          <span className="research-hint__index">Research note 01</span>
          <p>
            Dates in the Temple Atlas marked <strong>“c.”</strong> are conventional estimates. Use the linked source
            gateways and site-level records before treating a displayed date as a settled chronology.
          </p>
          <CitationLink href="https://whc.unesco.org/" label="UNESCO World Heritage Centre" compact />
        </aside>
      </section>

      <section className="section research-paths" aria-labelledby="research-paths-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Research instruments</p>
            <h2 id="research-paths-title">Four pathways, one evidentiary frame.</h2>
          </div>
          <p>
            Move between text, number, place, and built form without losing the distinction between primary source,
            interpretive layer, and exploratory tool.
          </p>
        </div>

        <div className="research-grid">
          {researchPaths.map((path, index) => {
            const Icon = path.icon;
            return (
              <article key={path.title} className="research-card">
                <div className="research-card__topline">
                  <Icon aria-hidden="true" size={19} strokeWidth={1.5} />
                  <span>0{index + 1}</span>
                </div>
                <p className="eyebrow">{path.eyebrow}</p>
                <h3>{path.title}</h3>
                <p>{path.copy}</p>
                {path.internal ? (
                  <Link className="research-card__action" href={path.href}>
                    {path.action} <ArrowRight aria-hidden="true" size={14} />
                  </Link>
                ) : (
                  <a className="research-card__action" href={path.href}>
                    {path.action} <ArrowRight aria-hidden="true" size={14} />
                  </a>
                )}
                <span className="research-card__source">
                  <CitationLink href={path.source} label="Source" compact />
                </span>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section temple-feature" aria-labelledby="temple-feature-title">
        <div className="temple-feature__image">
          <img
            src="/manus-storage/temple-comparison-engraving-v2_e62d93b1.png"
            alt="Engraved silhouettes comparing sacred architecture across world regions"
          />
        </div>
        <div className="temple-feature__copy">
          <p className="eyebrow">New integrated tab · 118 compounds</p>
          <h2 id="temple-feature-title">Sacred architecture, placed in geography and time.</h2>
          <p>
            The Temple Atlas is now framed as part of Genesis Nations rather than a detached application. Search by
            temple, deity, or builder; filter by region, era, tradition, country, and UNESCO status; then compare
            spatial distribution against an adjustable chronology.
          </p>
          <div className="inline-source-row">
            <CitationLink
              href="https://templemap-c7mlfbq3.manus.space/?code=SZkkdocaAQRTr8pdSFmbb5"
              label="Atlas and dataset"
            />
            <CitationLink href="https://whc.unesco.org/en/list/" label="UNESCO World Heritage List" />
          </div>
          <Link className="text-link" href="/temples">
            Enter the comparative instrument <ArrowRight aria-hidden="true" size={15} />
          </Link>
        </div>
      </section>

      <section className="section method-section" aria-labelledby="method-title">
        <div className="method-section__copy">
          <p className="eyebrow">Method before conclusion</p>
          <h2 id="method-title">Use the atlas as an argument you can inspect.</h2>
          <p>
            The interface distinguishes scriptural citations, dataset scope, source gateways, and editorial guidance.
            For dissertation-level use, treat map entries as points of departure: follow the linked institutional
            record, verify chronology and terminology, and cite the underlying publication or catalogue entry.
          </p>
          <div className="method-principles">
            <div><span>01</span><strong>Locate</strong><p>Use geography and chronology to form the comparative question.</p></div>
            <div><span>02</span><strong>Interrogate</strong><p>Open the item record and identify uncertainty or competing dates.</p></div>
            <div><span>03</span><strong>Verify</strong><p>Follow institutional and scholarly sources before publication.</p></div>
          </div>
          <Link className="text-link" href="/sources">
            Read the source policy <ScrollText aria-hidden="true" size={15} />
          </Link>
        </div>
        <figure className="method-section__image">
          <img
            src="/manus-storage/research-desk-detail-v2_efdebaa4.png"
            alt="Engraved scholar's desk with folio, compass, map grid, and archival tags"
          />
          <figcaption>Source criticism · provenance · comparative method</figcaption>
        </figure>
      </section>
    </main>
  );
}
