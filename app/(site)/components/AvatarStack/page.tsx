import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { codeToHtml } from "shiki";
import Gallery, { type Variant } from "./Gallery";

export const metadata: Metadata = {
  title: "Avatar Stack — Aura UI",
  description: "Animated avatar stack variants for Aura UI.",
};

export default async function AvatarStackCategoryPage() {
  const dir = path.join(
    process.cwd(),
    "app",
    "(site)",
    "components",
    "AvatarStack",
  );
  const files = [
    "Avatar1.tsx",
    "Avatar2.tsx",
    "Avatar3.tsx",
    "Avatar4.tsx",
    "Avatar5.tsx",
    "Avatar6.tsx",
  ];
  const names = [
    "Photo stack",
    "Square stack",
    "Single avatar",
    "Alphabet",
    "Status",
    "Mixed stack",
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
        install: `npx aura-ui add avatar-stack-${index + 1}`,
      };
    }),
  );
  return <Gallery variants={variants} />;
}
