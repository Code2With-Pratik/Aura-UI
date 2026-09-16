import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Gallery, { type Variant } from "./Gallery";
import { codeToHtml } from "shiki";

export const metadata: Metadata = { title: "Dock — Aura UI", description: "Responsive desktop dock and taskbar patterns." };

const NAMES = ["macOS Dock", "Windows Taskbar"];

export default async function DockCategoryPage() {
  const dir = path.join(process.cwd(), "app", "(site)", "components", "Dock");
  const variants: Variant[] = await Promise.all(["MacDock.tsx", "WindowsTaskbar.tsx"].map(async (fileName, index) => {
    const code = fs.readFileSync(path.join(dir, fileName), "utf8");
    const highlightedCode = await codeToHtml(code, { lang: "tsx", theme: "github-dark" });
    return { id: index + 1, name: NAMES[index], fileName, code, highlightedCode };
  }));
  return <Gallery variants={variants} />;
}
