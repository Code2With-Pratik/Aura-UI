"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

type ComponentOption = {
  label: string;
  href?: string;
  upcoming?: boolean;
};

const componentOptions: ComponentOption[] = [
  { label: "Buttons", href: "/components/Buttons" },
  { label: "Inputs", href: "/components/Input" },
  { label: "Checkboxes", href: "/components/CheckBoxs" },
  { label: "Cards", href: "/components/Cards" },
  { label: "Badges", href: "/components/Badges" },
  { label: "Loaders", href: "/components/Loaders" },
  { label: "Tables", href: "/components/Tables" },
  { label: "Footer", href: "/components/Footer" },
  { label: "Dock", href: "/components/Dock" },
  { label: "Mockup", href: "/components/MockUp" },
  { label: "Navbar", href: "/components/Navbar" },
  { label: "Page Transition", href: "/components/PageTransition" },
  { label: "Avatar Stack", upcoming: true },
  { label: "Progress", upcoming: true },
  { label: "Spotlight", upcoming: true },
  { label: "Toast", upcoming: true },
  { label: "Tooltip", upcoming: true },
  { label: "Window", upcoming: true },
] as const;

export default function ComponentPicker() {
  return (
    <div className="mb-10 flex flex-wrap items-center justify-center gap-3 md:mb-14">
      <label htmlFor="component-picker" className="eyebrow">
        Browse components
      </label>
      <div className="relative">
        <select
          id="component-picker"
          defaultValue=""
          onChange={(event) => {
            if (event.target.value) window.location.href = event.target.value;
          }}
          className="h-10 min-w-56 appearance-none rounded-full border border-border-default bg-surface px-4 pr-10 text-sm font-medium text-fg outline-none transition-colors hover:border-border-hover focus:border-accent-primary"
        >
          <option value="" disabled>
            Select a component
          </option>
          {componentOptions.map((component) => (
            <option key={component.label} value={component.href ?? ""} disabled={component.upcoming}>
              {component.label}{component.upcoming ? " (Coming soon)" : ""}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-muted"
        />
      </div>
      <Link
        href="/docs/installation"
        className="text-[13px] text-fg-muted underline decoration-border-hover underline-offset-4 transition-colors hover:text-fg"
      >
        Installation guide
      </Link>
    </div>
  );
}
