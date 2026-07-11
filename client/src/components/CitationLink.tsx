/**
 * Illuminated Scholarly Atlas: citations are visible infrastructure, not decorative footnotes.
 */
import { ExternalLink } from "lucide-react";

type CitationLinkProps = {
  href: string;
  label: string;
  title?: string;
  compact?: boolean;
};

export function CitationLink({ href, label, title, compact = false }: CitationLinkProps) {
  return (
    <a
      className={compact ? "citation-link citation-link--compact" : "citation-link"}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      title={title ?? `Open source: ${label}`}
    >
      <span>{label}</span>
      <ExternalLink aria-hidden="true" size={compact ? 11 : 13} strokeWidth={1.8} />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
