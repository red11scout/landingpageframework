import { lessons } from "./lessons";

export function normalizeProgress(ids: number[]) {
  return Array.from(new Set(ids.filter((id) => Number.isInteger(id) && id >= 1 && id <= 90))).sort((a, b) => a - b);
}

export function encodeProgress(ids: number[]) {
  return normalizeProgress(ids).join(",");
}

export function decodeProgress(value: string | null) {
  if (!value) return [];
  return normalizeProgress(value.split(",").map((part) => Number.parseInt(part, 10)));
}

export function progressShareUrl(ids: number[], origin: string) {
  const encoded = encodeProgress(ids);
  return `${origin}/share${encoded ? `?p=${encodeURIComponent(encoded)}` : ""}`;
}

export function progressShareText(ids: number[]) {
  const completed = normalizeProgress(ids);
  const percent = Math.round((completed.length / 90) * 100);
  const next = lessons.find((lesson) => !completed.includes(lesson.id));
  const nextText = next ? ` Next up: Night ${next.id}, ${next.title}.` : " The 90-night journey is complete.";
  return `Our family has completed ${completed.length} of 90 Revolution Nights (${percent}%).${nextText}`;
}
