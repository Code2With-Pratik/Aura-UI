import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { codeToHtml } from "shiki";
import Gallery from "./Gallery";

export const metadata: Metadata = {
  title: "Carousels — Aura UI",
  description: "Six smooth, interactive carousel patterns for visual design.",
};

const variants = [
  [
    "center",
    "Centered Gallery",
    "A calm three-up editorial carousel with a focused center slide.",
  ],
  [
    "stack",
    "Stacked Cards",
    "Layered cards fan out and settle as the active card changes.",
  ],
  [
    "coverflow",
    "3D Coverflow",
    "Perspective-driven slides create a tactile coverflow effect.",
  ],
  [
    "horizontal-expand",
    "Horizontal Expand",
    "Hover expands the focused card while the rail stays compact.",
  ],
  [
    "vertical-expand",
    "Vertical Expand",
    "A vertical rail that grows the active panel on hover.",
  ],
  [
    "filmstrip",
    "Filmstrip",
    "A cinematic strip of cards with a strong active frame.",
  ],
  [
    "radial",
    "Radial Orbit",
    "Cards orbit the active slide in a circular editorial arrangement.",
  ],
  [
    "masonry",
    "Masonry Rail",
    "A staggered rail mixes card heights for a gallery-like rhythm.",
  ],
] as const;

export default async function CarouselsPage() {
  const sourcePath = path.join(
    process.cwd(),
    "app",
    "(site)",
    "components",
    "Carousels",
    "CarouselsPreview.tsx",
  );
  const code = fs.readFileSync(sourcePath, "utf8");
  const highlightedCode = await codeToHtml(code, {
    lang: "tsx",
    theme: "github-dark",
  });
  const result = await Promise.all(
    variants.map(async ([id, name, description]) => {
      const snippet = `import CarouselsPreview from "@/app/(site)/components/Carousels/CarouselsPreview";\n\nexport default function Demo() {\n  return <CarouselsPreview variant="${id}" />;\n}`;
      return {
        id,
        name,
        description,
        install: `npx aura-ui add carousel-${id}`,
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
