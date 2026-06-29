import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Gallery, { type Variant } from "./Gallery";
import { codeToHtml } from "shiki";

export const metadata: Metadata = {
  title: "Badges — Aura UI",
  description: "Five high-fidelity badge variants with cool, looping animations.",
};

const NAMES = [
  "Shimmer Pro",
  "Live Pulse",
  "Aurora Border",
  "Verified Glow",
  "Holographic Premium",
];

async function loadVariants(): Promise<Variant[]> {
  const dir = path.join(
    process.cwd(),
    "app",
    "(site)",
    "components",
    "Badges",
  );

  const variants = await Promise.all(
    Array.from({ length: 5 }, async (_, i) => {
      const fileName = `Badge${i + 1}.tsx`;
      const code = fs.readFileSync(path.join(dir, fileName), "utf8");

      const [highlightedCode, highlightedSnippet] = await Promise.all([
        codeToHtml(code, {
          lang: "tsx",
          theme: "github-dark",
        }),
        codeToHtml(code.slice(0, 400) + "...", {
          lang: "tsx",
          theme: "github-dark",
        }),
      ]);

      return {
        id: i + 1,
        name: NAMES[i],
        fileName,
        componentName: `Badge${i + 1}`,
        code,
        highlightedCode,
        highlightedSnippet,
      };
    })
  );

  return variants;
}

export default async function BadgesCategoryPage() {
  const variants = await loadVariants();
  return <Gallery slug="Badges" title="Badges" variants={variants} />;
}
