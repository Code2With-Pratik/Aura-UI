import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { codeToHtml } from "shiki";
import Gallery, { type Variant } from "./Gallery";

export const metadata: Metadata = {
  title: "Toast — Aura UI",
  description: "Toast notification variants for Aura UI.",
};

export default async function ToastCategoryPage() {
  const dir = path.join(process.cwd(), "app", "(site)", "components", "Toast");
  const files = [
    "Toast1.tsx",
    "Toast2.tsx",
    "Toast3.tsx",
    "Toast4.tsx",
    "Toast5.tsx",
    "Toast6.tsx",
    "Toast7.tsx",
    "Toast8.tsx",
    "Toast9.tsx",
    "Toast10.tsx",
  ];
  const names = [
    "Success",
    "Notification stack",
    "Undo action",
    "Upload progress",
    "Rich toast",
    "Mobile toast",
    "Neon status",
    "Announcement",
    "Celebration",
    "Command result",
  ];
  const componentCode = fs.readFileSync(
    path.join(dir, "ToastPreview.tsx"),
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
        install: `npx aura-ui add toast-${index + 1}`,
      };
    }),
  );
  return <Gallery variants={variants} />;
}
