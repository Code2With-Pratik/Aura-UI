import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { codeToHtml } from "shiki";
import Gallery, { type Variant } from "./Gallery";

export const metadata: Metadata = {
  title: "Checkboxes — Aura UI",
  description: "Animated checkbox variants for Aura UI.",
};

const names = [
  ["Gradient Pulse", "Soft motion and a bright burst when toggled."],
  ["Wave Check", "A compact interactive style with a ripple-like effect."],
  ["Heart Toggle", "A romantic, rounded checkbox with a heart-shaped gesture."],
  [
    "Neon Glow",
    "Electric borders and glowing particles for a futuristic look.",
  ],
  ["Spark Switch", "A bright, minimal checkbox with a crisp checked state."],
  ["Mellow Flip", "A gentle, rounded toggle with a polished motion feel."],
  ["iOS Stack", "Colorful iOS-inspired options for modern interfaces."],
  ["Soft Capsule", "A calm, pill-like checkbox with softened edges."],
  ["Bold Outline", "A clean, sturdy checkbox with strong emphasis."],
  ["Minimal Toggle", "A lightweight option with a restrained, elegant finish."],
];

export default async function CheckboxesPage() {
  const dir = path.join(
    process.cwd(),
    "app",
    "(site)",
    "components",
    "CheckBoxs",
  );
  const files = Array.from(
    { length: 10 },
    (_, index) => [1, 2, 3, 10, 5, 6, 7, 8, 9, 4][index],
  );
  const variants: Variant[] = await Promise.all(
    files.map(async (sourceNumber, index) => {
      const fileName = `Checkbox${sourceNumber}.tsx`;
      const code = fs.readFileSync(path.join(dir, fileName), "utf8");
      return {
        id: index + 1,
        name: names[sourceNumber - 1][0],
        description: names[sourceNumber - 1][1],
        fileName,
        code,
        highlightedCode: await codeToHtml(code, {
          lang: "tsx",
          theme: "github-dark",
        }),
        install: `npx aura-ui add checkbox-${sourceNumber}`,
      };
    }),
  );
  return <Gallery variants={variants} />;
}
