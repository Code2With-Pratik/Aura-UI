import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { codeToHtml } from "shiki";
import Gallery from "./Gallery";

export const metadata: Metadata = {
  title: "Image Uploader — Aura UI",
  description: "An interactive image upload and crop component.",
};

export default async function ImageUploaderPage() {
  const sourcePath = path.join(
    process.cwd(),
    "app",
    "(site)",
    "components",
    "Input",
    "Input13.tsx",
  );
  const code = fs.readFileSync(sourcePath, "utf8");
  const highlightedCode = await codeToHtml(code, {
    lang: "tsx",
    theme: "github-dark",
  });
  const snippet = `import ImageUploader from "@/app/(site)/components/ImageUploader/ImageUploader";\n\nexport default function Demo() {\n  return <ImageUploader />;\n}`;

  return (
    <Gallery
      code={code}
      highlightedCode={highlightedCode}
      highlightedSnippet={await codeToHtml(snippet, {
        lang: "tsx",
        theme: "github-dark",
      })}
    />
  );
}
