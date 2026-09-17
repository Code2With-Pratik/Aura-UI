import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { codeToHtml } from "shiki";
import Gallery, { type Variant } from "./Gallery";

export const metadata: Metadata = {
  title: "Tooltip — Aura UI",
  description: "Tooltip variants for Aura UI.",
};

export default async function TooltipCategoryPage() {
  const dir = path.join(
    process.cwd(),
    "app",
    "(site)",
    "components",
    "Tooltip",
  );
  const files = [
    "Tooltip1.tsx",
    "Tooltip2.tsx",
    "Tooltip3.tsx",
    "Tooltip4.tsx",
    "Tooltip5.tsx",
    "Tooltip6.tsx",
  ];
  const names = [
    "Hover",
    "With title",
    "Stats",
    "Placement",
    "Info",
    "Product preview",
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
        install: `npx aura-ui add tooltip-${index + 1}`,
      };
    }),
  );
  return <Gallery variants={variants} />;
}
