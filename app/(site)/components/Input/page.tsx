import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Gallery, { type Variant } from "./Gallery";
import { codeToHtml } from "shiki";

export const metadata: Metadata = {
  title: "Inputs — Aura UI",
  description: "Twelve interactive input variants with smooth animations.",
};

const NAMES = [
  "Standard Float",
  "Bottom Border",
  "Search Focus",
  "3D Neobrutalist",
  "Link Input",
  "Floating Label",
  "Expandable Search",
  "Neumorphic Field",
  "Sparkle AI",
  "Spectrum Glow",
  "Action Field",
  "Perplexity Search",
];

async function loadVariants(): Promise<Variant[]> {
  const dir = path.join(
    process.cwd(),
    "app",
    "(site)",
    "components",
    "Input",
  );

  const variants = await Promise.all(
    Array.from({ length: 12 }, async (_, i) => {
      const fileName = `Input${i + 1}.tsx`;
      const code = fs.readFileSync(path.join(dir, fileName), "utf8");
      
      const highlightedCode = await codeToHtml(code, {
        lang: "tsx",
        theme: "github-dark",
      });

      const importPath = `@/app/(site)/components/Input/Input${i + 1}`;
      const snippet = `import Input${i + 1} from "${importPath}";\n\nexport default function Demo() {\n  return <Input${i + 1} />;\n}`;
      const highlightedSnippet = await codeToHtml(snippet, {
        lang: "tsx",
        theme: "github-dark",
      });

      return {
        id: i + 1,
        name: NAMES[i],
        fileName,
        componentName: `Input${i + 1}`,
        code,
        highlightedCode,
        highlightedSnippet,
      };
    })
  );

  return variants;
}

export default async function InputCategoryPage() {
  const variants = await loadVariants();
  return <Gallery slug="Input" title="Inputs" variants={variants} />;
}
