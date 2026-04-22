# Aura UI

A high-fidelity, macOS-inspired component system built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

| Concern         | Choice                              |
| --------------- | ----------------------------------- |
| Framework       | Next.js 15 — App Router             |
| Language        | TypeScript (strict)                 |
| Styling         | Tailwind v4 (CSS-first `@theme`)    |
| Motion          | Framer Motion                       |
| Type families   | Geist (sans/mono) + Instrument Serif (display) |

## Design tokens

All tokens live in [app/globals.css](app/globals.css) under a single `@theme` block — Tailwind v4 reads them at build time and exposes them as utilities (`bg-bg`, `text-accent-primary`, …) and CSS variables (`var(--color-accent-primary)`).

| Token                          | Value                       |
| ------------------------------ | --------------------------- |
| `--color-bg`                   | `#080808`                   |
| `--color-surface`              | `#0f0f0f`                   |
| `--color-surface-elevated`     | `#141414`                   |
| `--color-accent-primary`       | `#b8ff57` (lime)            |
| `--color-accent-secondary`     | `#57c8ff` (blue)            |
| `--color-accent-tertiary`      | `#ff57b8` (pink)            |
| `--color-border-default`       | `rgba(255,255,255,0.07)`    |
| `--color-border-hover`         | `rgba(255,255,255,0.14)`    |
| `--ease-aura`                  | `cubic-bezier(0.16, 1, 0.3, 1)` |

## Components

| File | Notes |
| ---- | ----- |
| [components/Navbar.tsx](components/Navbar.tsx) | Floating glassmorphic pill, `backdrop-filter: blur(24px)` |
| [components/Hero.tsx](components/Hero.tsx) | Radial hero glow + blinking-dot badge + `clamp()` display type |
| [components/WindowMockup.tsx](components/WindowMockup.tsx) | Traffic lights, sidebar with active states, 3-col tile grid, click yellow light for genie minimize |
| [components/BentoGrid.tsx](components/BentoGrid.tsx) | 12-col grid, span variants 4 / 5 / 7, hover-lift |
| [components/Marquee.tsx](components/Marquee.tsx) | CSS-only horizontal ticker for "Latest Updates" |
| [components/LogoMark.tsx](components/LogoMark.tsx) | Inline SVG mark, lime-accent radial |

## Performance & a11y

- Animations are driven by **CSS variables and transforms** so they stay on the compositor (60fps on retina displays).
- The grain overlay is a single fixed pseudo-element on `<body>` — no per-component cost.
- `prefers-reduced-motion` collapses all transitions/animations.
- Sidebar in [WindowMockup](components/WindowMockup.tsx) is hidden below `md:` for mobile.

## Project layout

```
app/
  globals.css      ← all tokens (@theme), keyframes, grain overlay
  layout.tsx       ← root layout, font wiring
  page.tsx         ← composes the marketing surface
components/
  BentoGrid.tsx
  Hero.tsx
  LogoMark.tsx
  Marquee.tsx
  Navbar.tsx
  WindowMockup.tsx
lib/
  motion.ts        ← shared Framer Motion variants + auraEase
```
