import { mkdirSync, writeFileSync } from "node:fs";

// A one-star review of Monday, written as if Monday were a
// restaurant. The diner came for brunch and stayed for a
// performance review — Monday served work instead of food — and
// the closer steals the classic one-star-review irony: one star,
// would not recommend, and yet the reviewer will be back
// tomorrow, because Monday always comes back.
const review =
  "One star. Came for brunch, stayed for a performance review. Would not recommend, will be back tomorrow.";

// The gate: UTF-8 text, one line, 1-180 characters, at most 25
// words. Check both limits here so an invalid line can never ship.
const MAX_CHARS = 180;
const MAX_WORDS = 25;

function oneLine(text: string): string {
  const line = text.replace(/\s+/g, " ").trim();
  const words = line === "" ? 0 : line.split(" ").length;
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`review must be 1-${MAX_CHARS} chars, got ${line.length}`);
  }
  if (words > MAX_WORDS) {
    throw new Error(`review must be at most ${MAX_WORDS} words, got ${words}`);
  }
  if (line.includes("\n")) {
    throw new Error("review must be a single line");
  }
  return line;
}

const line = oneLine(review);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");
