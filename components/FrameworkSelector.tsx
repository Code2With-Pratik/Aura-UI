"use client";

import { type ReactNode, useState } from "react";

function ReactIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.9" />
      <ellipse cx="12" cy="12" rx="9" ry="3.7" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <ellipse cx="12" cy="12" rx="9" ry="3.7" fill="none" stroke="currentColor" strokeWidth="1.8" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.7" fill="none" stroke="currentColor" strokeWidth="1.8" transform="rotate(-60 12 12)" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path d="M12 2.5c-5.2 0-9.5 4.3-9.5 9.5S6.8 21.5 12 21.5c2.2 0 4.1-.7 5.7-2.1L10.7 8.9v8.2h-1.8V7.7l8.7 12.3c1.1-1.4 1.7-3.1 1.7-5.1 0-5.2-4.3-9.4-9.5-9.4Zm0 0Z" fill="currentColor" />
      <path d="M17.4 7.8 13.3 13l3.3 4.4h2.2l-4.2-5.6 2.8-4Z" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

function AstroIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path d="M12 2.5c5.2 0 9.5 4.3 9.5 9.5S17.2 21.5 12 21.5 2.5 17.2 2.5 12 6.8 2.5 12 2.5Zm-1.1 4.3-5.4 11.2h2.8l1.5-3.4h4.8l1.5 3.4h2.8L13.1 6.8Zm1.1 2.5 1.8 4.2H11.4l1.8-4.2Z" fill="currentColor" />
    </svg>
  );
}

function ViteIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path d="M8.1 3.2 3.8 15.9c-.4 1.2.4 2.5 1.6 2.9l4.2 1.7c1.2.5 2.6-.2 3.1-1.4L14.9 7c.5-1.5-1-3-2.7-2.2L8.1 3.2Zm8.7 0-4 12.9c-.5 1.6 1 3.1 2.7 2.4l4.3-1.9c1.4-.6 2.1-2.2 1.4-3.7L18.1 3.2h-1.3Zm-5.7 5.2 1.3 4.3-1.7 1.7-1.9-4.3 2.3-1.7Z" fill="currentColor" />
    </svg>
  );
}

function SvelteIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path d="M12 2.5c.8 0 1.6.2 2.3.6l3.8 2.2c1.3.7 2.1 2.1 2.1 3.6v6.2c0 1.5-.8 2.9-2.1 3.6l-3.8 2.2a4.8 4.8 0 0 1-4.6 0l-3.8-2.2A4.1 4.1 0 0 1 2.2 15V8.9c0-1.5.8-2.9 2.1-3.6L8.1 3.1A4.8 4.8 0 0 1 12 2.5Zm-1.8 5.5 4.2 2.4-4.2 2.4-4.2-2.4 4.2-2.4Zm5.2 3.8 2.3 1.3-2.3 1.3-2.3-1.3 2.3-1.3Zm-5.6 0 2.2 1.3-2.2 1.3-2.3-1.3 2.3-1.3Z" fill="currentColor" />
    </svg>
  );
}

const frameworkMap = {
  react: {
    label: "React",
    icon: <ReactIcon />,
    install: "npm install @nexaui-library/aura-ui tailwindcss @tailwindcss/postcss",
    steps: [
      "Create a global CSS file and add the Aura theme tokens.",
      "Import the stylesheet in your app entry file.",
      "Use Aura components directly in your React pages, layouts, and views.",
    ],
    snippet: `import "./styles.css";

export default function App() {
  return <section className="aura-card p-6">Aura UI is ready.</section>;
}`,
  },
  nextjs: {
    label: "Next.js",
    icon: <NextIcon />,
    install: "npm install @nexaui-library/aura-ui",
    steps: [
      "Add the Aura theme tokens to your global stylesheet.",
      "Import the stylesheet in your app layout or root entry file.",
      "Start building with Aura primitives in your components.",
    ],
    snippet: `import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`,
  },
  astro: {
    label: "Astro",
    icon: <AstroIcon />,
    install: "npm install @nexaui-library/aura-ui tailwindcss @tailwindcss/vite",
    steps: [
      "Configure Tailwind in Astro and import the CSS entry file.",
      "Add the Aura theme tokens to your global stylesheet.",
      "Import Aura components into your Astro pages and islands as needed.",
    ],
    snippet: `---
import "../styles.css";
---

<html lang="en">
  <body>
    <section class="aura-card p-6">Aura UI is ready.</section>
  </body>
</html>`,
  },
  vite: {
    label: "Vite",
    icon: <ViteIcon />,
    install: "npm install @nexaui-library/aura-ui tailwindcss @tailwindcss/vite",
    steps: [
      "Configure Tailwind in your Vite project and import Tailwind in CSS.",
      "Add the Aura design tokens and base theme to your global stylesheet.",
      "Render Aura components from your App or route components.",
    ],
    snippet: `import "./styles.css";

export default function App() {
  return <main className="min-h-screen bg-[#080808] text-white">Hello Aura</main>;
}`,
  },
  svelte: {
    label: "Svelte",
    icon: <SvelteIcon />,
    install: "npm install @nexaui-library/aura-ui tailwindcss @tailwindcss/vite",
    steps: [
      "Set up Tailwind and import the global Aura stylesheet in your app.",
      "Apply the design tokens in your root CSS entry.",
      "Compose Aura components into your Svelte components with a simple import.",
    ],
    snippet: `<script lang="ts">
  import "./styles.css";
</script>

<section class="aura-card p-6">Aura UI is ready.</section>`,
  },
} as const;

type FrameworkKey = keyof typeof frameworkMap;

export default function FrameworkSelector() {
  const [selected, setSelected] = useState<FrameworkKey>("nextjs");
  const current = frameworkMap[selected];

  return (
    <div className="not-prose my-8 overflow-hidden rounded-[26px] border border-white/10 bg-[#0b0b0b] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] md:p-6">
      <div className="mb-5">
        <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.22em] text-white/50">
          Choose your framework
        </p>

        <div className="flex flex-wrap gap-2">
          {(Object.entries(frameworkMap) as [FrameworkKey, (typeof frameworkMap)[FrameworkKey]][]).map(
            ([key, value]) => {
              const active = selected === key;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelected(key)}
                  aria-pressed={active}
                  className={[
                    "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-all duration-200",
                    active
                      ? "border-[#b8ff57] bg-[#b8ff57]/10 text-[#d9ff9c] shadow-[0_0_24px_rgba(184,255,87,0.2)]"
                      : "border-white/10 bg-white/2 text-white/75 hover:border-white/20 hover:bg-white/5",
                  ].join(" ")}
                >
                  <span className="flex h-4 w-4 items-center justify-center text-current">{value.icon}</span>
                  {value.label}
                </button>
              );
            },
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/40 p-4 md:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-white/80">Install</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-white/55">
            <span className="flex h-3.5 w-3.5 items-center justify-center text-current">{current.icon}</span>
            {current.label}
          </span>
        </div>

        <pre className="overflow-x-auto rounded-xl border border-white/10 bg-[#111111] p-3 text-sm leading-6 text-[#d8ffd1]">
          <code>{current.install}</code>
        </pre>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <p className="mb-3 text-sm font-medium text-white/80">Setup steps</p>
          <ol className="space-y-3 text-sm leading-6 text-white/70">
            {current.steps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#b8ff57]/15 text-[11px] font-semibold text-[#d9ff9c]">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <p className="mb-3 text-sm font-medium text-white/80">Example</p>
          <pre className="overflow-x-auto rounded-xl border border-white/10 bg-[#111111] p-3 text-sm leading-6 text-[#d7e7ff]">
            <code>{current.snippet}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
