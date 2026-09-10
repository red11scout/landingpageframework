import { describe, expect, it } from "vitest";

import { lessons, themes } from "../src/lib/lessons";
import { buildPrintHtml } from "../src/lib/print";

describe("Revolution Nights curriculum", () => {
  it("contains a continuous 90-night sequence", () => {
    expect(lessons).toHaveLength(90);
    expect(lessons.map((lesson) => lesson.id)).toEqual(Array.from({ length: 90 }, (_, index) => index + 1));
  });

  it("covers all nights exactly once across ten themes", () => {
    expect(themes).toHaveLength(10);
    const covered = themes.flatMap((theme) => {
      const [start, end] = theme.lessons.split("-").map(Number);
      return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    });
    expect(covered).toEqual(Array.from({ length: 90 }, (_, index) => index + 1));
  });

  it("keeps lesson connections navigable", () => {
    const ids = new Set(lessons.map((lesson) => lesson.id));
    lessons.forEach((lesson) => lesson.connections.forEach((id) => expect(ids.has(id)).toBe(true)));
  });
});

describe("HTML study packs", () => {
  it("contains only selected lessons in selection order", () => {
    const html = buildPrintHtml([lessons[0], lessons[9]]);
    expect(html).toContain("Night 1 ·");
    expect(html).toContain("The World in 1750");
    expect(html).toContain("Night 10 ·");
    expect(html).toContain("The Tea Party");
    expect(html).not.toContain("Night 2 ·");
  });

  it("escapes markup in printable content", () => {
    const html = buildPrintHtml([{ ...lessons[0], title: "Liberty < Empire" }]);
    expect(html).toContain("Liberty &lt; Empire");
  });
});
