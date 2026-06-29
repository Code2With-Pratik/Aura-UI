import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Checkbox1 from "./Checkbox1";
import Checkbox2 from "./Checkbox2";
import Checkbox3 from "./Checkbox3";
import Checkbox4 from "./Checkbox4";
import Checkbox5 from "./Checkbox5";
import Checkbox6 from "./Checkbox6";
import Checkbox7 from "./Checkbox7";
import Checkbox8 from "./Checkbox8";
import Checkbox9 from "./Checkbox9";
import Checkbox10 from "./Checkbox10";

export const metadata: Metadata = {
  title: "Checkboxes — Aura UI",
  description: "Ten checkbox styles with distinct visual personalities.",
};

const CHECKBOX_VARIANTS = [
  {
    name: "Gradient Pulse",
    description: "Soft motion and a bright burst when toggled.",
    Component: Checkbox1,
  },
  {
    name: "Wave Check",
    description: "A compact interactive style with a ripple-like effect.",
    Component: Checkbox2,
  },
  {
    name: "Heart Toggle",
    description: "A romantic, rounded checkbox with a heart-shaped gesture.",
    Component: Checkbox3,
  },
  {
    name: "Neon Glow",
    description: "Electric borders and glowing particles for a futuristic look.",
    Component: Checkbox4,
  },
  {
    name: "Spark Switch",
    description: "A bright, minimal checkbox with a crisp checked state.",
    Component: Checkbox5,
  },
  {
    name: "Mellow Flip",
    description: "A gentle, rounded toggle with a polished motion feel.",
    Component: Checkbox6,
  },
  {
    name: "iOS Stack",
    description: "Colorful iOS-inspired options for modern interfaces.",
    Component: Checkbox7,
  },
  {
    name: "Soft Capsule",
    description: "A calm, pill-like checkbox with softened edges.",
    Component: Checkbox8,
  },
  {
    name: "Bold Outline",
    description: "A clean, sturdy checkbox with strong emphasis.",
    Component: Checkbox9,
  },
  {
    name: "Minimal Toggle",
    description: "A lightweight option with a restrained, elegant finish.",
    Component: Checkbox10,
  },
];

export default function CheckBoxsPage() {
  return (
    <main className="relative mx-auto w-full max-w-[1240px] px-6 pt-6 pb-20 md:pt-10 md:pb-28">
      <Link
        href="/components"
        className="mb-8 inline-flex items-center gap-1.5 text-[13px] text-fg-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All components
      </Link>

      <header className="mb-12 flex flex-col items-center text-center">
        <p className="eyebrow mb-3">Category</p>
        <h1
          className="display-clamp text-balance text-fg"
          style={{ fontSize: "clamp(2rem, 4.5vw + 0.5rem, 4.75rem)" }}
        >
          Checkboxes
        </h1>
        <p className="mt-5 max-w-[560px] text-pretty text-[15px] leading-relaxed text-fg/70">
          Ten distinct checkbox styles, each ready to drop into your UI.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {CHECKBOX_VARIANTS.map(({ name, description, Component }) => (
          <section key={name} className="aura-tile p-4 md:p-5">
            <div className="mb-4">
              <h2 className="text-[15px] font-medium text-fg">{name}</h2>
              <p className="mt-1 text-[13px] leading-relaxed text-fg/55">
                {description}
              </p>
            </div>
            <div className="grid min-h-[140px] place-items-center rounded-lg bg-black/5 p-4 dark:bg-black/35">
              <Component />
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
