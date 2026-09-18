import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { codeToHtml } from "shiki";
import Gallery, { type Variant } from "./Gallery";

export const metadata: Metadata = {
  title: "Progress — Aura UI",
  description: "Progress indicator variants for Aura UI.",
};

export default async function ProgressCategoryPage() {
  const dir = path.join(
    process.cwd(),
    "app",
    "(site)",
    "components",
    "Progress",
  );
  const files = [
    "Progress1.tsx",
    "Progress2.tsx",
    "Progress3.tsx",
    "Progress4.tsx",
    "Progress5.tsx",
    "Progress6.tsx",
  ];
  const names = [
    "Gradient line",
    "Circular",
    "Segments",
    "Steps",
    "Metrics",
    "Loading",
  ];
  const variants: Variant[] = await Promise.all(
    files.map(async (fileName, index) => {
      const code = fs.readFileSync(path.join(dir, fileName), "utf8");
      return {
        id: index + 1,
        name: names[index],
        fileName,
        code,
        highlightedCode: await codeToHtml(code, {
          lang: "tsx",
          theme: "github-dark",
        }),
        install: `npx aura-ui add progress-${index + 1}`,
      };
    }),
  );
  return <Gallery variants={variants} />;
}
