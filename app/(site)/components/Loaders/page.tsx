import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Gallery, { type Variant } from "./Gallery";
import { codeToHtml } from "shiki";

export const metadata: Metadata = {
  title: "Loaders — Aura UI",
  description: "Ten animated loader variants with expressive motion and polished detail.",
};

const NAMES = [
  "Orbital Spin",
  "Pulse Ring",
  "Wave Sweep",
  "Orbit Dot",
  "Quantum Pulse",
  "Bloom Loader",
  "Ripple Pulse",
  "Circuit Loader",
  "Neon Drift",
  "Halo Wave",
];

async function loadVariants(): Promise<Variant[]> {
  const dir = path.join(process.cwd(), "app", "(site)", "components", "Loaders");

  const variants = await Promise.all(
    Array.from({ length: 10 }, async (_, i) => {
      const fileName = `Loader${i + 1}.tsx`;
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
        componentName: `Loader${i + 1}`,
        code,
        highlightedCode,
        highlightedSnippet,
      };
    })
  );

  return variants;
}

export default async function LoadersCategoryPage() {
  const variants = await loadVariants();
  return <Gallery slug="Loaders" title="Loaders" variants={variants} />;
}
