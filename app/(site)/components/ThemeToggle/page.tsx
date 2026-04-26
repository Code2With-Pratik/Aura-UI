import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Gallery, { type Variant } from "./Gallery";
import { codeToHtml } from "shiki";

export const metadata: Metadata = {
  title: "Theme Toggle — Aura UI",
  description: "A high-fidelity theme switcher with custom GIF transitions.",
};

async function loadVariant(): Promise<Variant> {
  const filePath = path.join(
    process.cwd(),
    "app",
    "(site)",
    "components",
    "ThemeToggle",
    "ThemeToggle.tsx"
  );

  const code = fs.readFileSync(filePath, "utf8");
  
  // Generate syntax-highlighted HTML on the server
  const highlightedCode = await codeToHtml(code, {
    lang: "tsx",
    theme: "github-dark",
  });

  const importPath = `@/app/(site)/components/ThemeToggle/ThemeToggle`;
  const snippet = `import ThemeToggle from "${importPath}";\n\nexport default function Demo() {\n  return <ThemeToggle />;\n}`;
  const highlightedSnippet = await codeToHtml(snippet, {
    lang: "tsx",
    theme: "github-dark",
  });

  return {
    id: 1,
    name: "Theme Toggle Dashboard",
    fileName: "ThemeToggle.tsx",
    code,
    highlightedCode,
    highlightedSnippet,
  };
}

export default async function ThemeTogglePage() {
  const variant = await loadVariant();
  return <Gallery variant={variant} />;
}
