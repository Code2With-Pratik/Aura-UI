import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Gallery, { type Variant } from "./Gallery";

export const metadata: Metadata = {
  title: "Buttons — Aura UI",
  description: "Eight animated button variants, ready to drop in.",
};

const NAMES = [
  "Aura Gradient",
  "Retro 3D",
  "Glass Morphic",
  "Gradient Border",
  "Overlay Reveal",
  "Bento Icon",
  "Claymorphism",
  "Liquid Ghost",
];

/* Only metadata + source text crosses the server-to-client boundary;
   the actual React components are imported inside Gallery (client) so
   framer-motion's proxy resolves in the client bundle. */
function loadVariants(): Variant[] {
  const dir = path.join(
    process.cwd(),
    "app",
    "(site)",
    "components",
    "Buttons",
  );
  return Array.from({ length: 8 }, (_, i) => {
    const fileName = `Button${i + 1}.tsx`;
    return {
      id: i + 1,
      name: NAMES[i],
      fileName,
      componentName: `Buttons${i + 1}`,
      code: fs.readFileSync(path.join(dir, fileName), "utf8"),
    };
  });
}

export default function ButtonsCategoryPage() {
  return <Gallery slug="Buttons" title="Buttons" variants={loadVariants()} />;
}
