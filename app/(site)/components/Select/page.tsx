import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { codeToHtml } from "shiki";
import Gallery, { type Variant } from "./Gallery";

export const metadata: Metadata = {
  title: "Select — Aura UI",
  description: "Select input variants for Aura UI.",
};

export default async function SelectCategoryPage() {
  const dir = path.join(process.cwd(), "app", "(site)", "components", "Select");
  const files = [
    "Select1.tsx",
    "Select2.tsx",
    "Select3.tsx",
    "Select4.tsx",
    "Select5.tsx",
    "Select6.tsx",
  ];
  const names = [
    "Basic",
    "Pill",
    "Searchable",
    "Multi-select",
    "Grouped",
    "Command",
  ];
  const componentCode = fs.readFileSync(
    path.join(dir, "SelectPreview.tsx"),
    "utf8",
  );
  const variants: Variant[] = await Promise.all(
    files.map(async (fileName, index) => {
      const wrapperCode = fs.readFileSync(path.join(dir, fileName), "utf8");
      const code = `${wrapperCode}\n\n${componentCode}`;
      return {
        id: index + 1,
        name: names[index],
        fileName,
        code,
        highlightedCode: await codeToHtml(code, {
          lang: "tsx",
          theme: "github-dark",
        }),
        install: `npx aura-ui add select-${index + 1}`,
      };
    }),
  );
  return <Gallery variants={variants} />;
}
