/**
 * Illuminated Scholarly Atlas: the footer closes every route with method, provenance, and clear onward paths.
 */
import { CitationLink } from "./CitationLink";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div>
          <p className="folio-label">Genesis Nations · Digital Research Atlas</p>
          <p className="site-footer__statement">
            Scripture, geography, chronology, and comparative sacred architecture presented as an inspectable
            educational environment.
          </p>
        </div>
        <div>
          <h2>Primary paths</h2>
          <a href="https://genesisnations-6t6jlssk.manus.space/nations">Table of Nations</a>
          <a href="https://genesisnations-6t6jlssk.manus.space/census">Censuses of Israel</a>
          <a href="/temples">Temple Atlas</a>
        </div>
        <div>
          <h2>Source gateways</h2>
          <CitationLink href="https://whc.unesco.org/" label="UNESCO World Heritage Centre" compact />
          <CitationLink href="https://www.britannica.com/" label="Encyclopaedia Britannica" compact />
          <CitationLink href="https://www.biblegateway.com/versions/English-Standard-Version-ESV-Bible/" label="ESV Bible" compact />
        </div>
      </div>
      <div className="site-footer__base">
        <span>Educational use · Dates marked “c.” are conventional approximations.</span>
        <a href="/sources">Read the source and method policy</a>
      </div>
    </footer>
  );
}
