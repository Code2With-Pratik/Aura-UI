import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { codeToHtml } from "shiki";
import Gallery from "./Gallery";

export const metadata: Metadata = {
  title: "Page Transitions — Aura UI",
  description: "Six cinematic ladder and reveal page transitions.",
};

const variants = [
  [
    "vertical",
    "Vertical Ladder",
    "Six vertical panels reveal the next page from bottom to top.",
  ],
  [
    "horizontal",
    "Horizontal Ladder",
    "Six horizontal panels sweep across the viewport.",
  ],
  [
    "split",
    "Split Left / Right",
    "Three panels exit left while three panels exit right.",
  ],
  [
    "diagonal",
    "Diagonal Sweep",
    "Six angled panels sweep diagonally across the viewport.",
  ],
  [
    "radial",
    "Radial Collapse",
    "Six layered panels collapse toward the center.",
  ],
  [
    "curtain",
    "Alternating Curtain",
    "Six horizontal panels alternate outward like a stage curtain.",
  ],
] as const;

export default async function PageTransitionCategoryPage() {
  const sourcePath = path.join(
    process.cwd(),
    "app",
    "(site)",
    "components",
    "PageTransition",
    "PageTransitionPreview.tsx",
  );
  const code = fs.readFileSync(sourcePath, "utf8");
  const highlightedCode = await codeToHtml(code, {
    lang: "tsx",
    theme: "github-dark",
  });
  const result = await Promise.all(
    variants.map(async ([id, name, description]) => {
      const snippet = `import PageTransition from "@/app/(site)/components/PageTransition/PageTransitionPreview";\n\nexport default function Demo() {\n  return <PageTransition initialDirection="${id}" showDirectionControls={false} />;\n}`;
      return {
        id,
        name,
        description,
        install: `npx aura-ui add page-transition-${id}`,
        code,
        highlightedCode,
        highlightedSnippet: await codeToHtml(snippet, {
          lang: "tsx",
          theme: "github-dark",
        }),
      };
    }),
  );
  return <Gallery variants={result} />;
}
