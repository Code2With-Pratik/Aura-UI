import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { codeToHtml } from "shiki";
import Gallery, { type Variant } from "./Gallery";

export const metadata: Metadata = {
  title: "Window — Aura UI",
  description: "Windows and macOS window chrome with preview inputs.",
};

export default async function WindowCategoryPage() {
  const dir = path.join(process.cwd(), "app", "(site)", "components", "Window");
  const files = ["WindowsWindow.tsx", "MacOSWindow.tsx"];
  const names = ["Windows Window", "macOS Window"];
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
        install: `npx aura-ui add ${index === 0 ? "windows-window" : "macos-window"}`,
      };
    }),
  );
  return <Gallery variants={variants} />;
}
