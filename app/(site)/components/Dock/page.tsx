import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Gallery, { type Variant } from "./Gallery";

export const metadata: Metadata = { title: "Dock — Aura UI", description: "Responsive desktop dock and taskbar patterns." };

const NAMES = ["macOS Dock", "Windows Taskbar"];

export default function DockCategoryPage() {
  const dir = path.join(process.cwd(), "app", "(site)", "components", "Dock");
  const variants: Variant[] = ["MacDock.tsx", "WindowsTaskbar.tsx"].map((fileName, index) => ({ id: index + 1, name: NAMES[index], fileName, code: fs.readFileSync(path.join(dir, fileName), "utf8") }));
  return <Gallery variants={variants} />;
}
