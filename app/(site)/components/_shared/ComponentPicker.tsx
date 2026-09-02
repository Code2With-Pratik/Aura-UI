"use client";

import { ChevronDown } from "lucide-react";

type ComponentOption = {
  label: string;
  href?: string;
  upcoming?: boolean;
};

const componentOptions: ComponentOption[] = [
  { label: "Buttons", href: "/docs/components/Buttons" },
  { label: "Inputs", href: "/docs/components/Input" },
  { label: "Checkboxes", href: "/docs/components/CheckBoxs" },
  { label: "Cards", href: "/docs/components/Cards" },
  { label: "Badges", href: "/docs/components/Badges" },
  { label: "Loaders", href: "/docs/components/Loaders" },
  { label: "Theme Toggle", href: "/docs/components/ThemeToggle" },
  { label: "Tables", href: "/docs/components/Tables" },
  { label: "Footer", href: "/docs/components/Footer" },
  { label: "Dock", href: "/docs/components/Dock" },
  { label: "Mockup", href: "/docs/components/MockUp" },
  { label: "Navbar", href: "/docs/components/Navbar" },
  { label: "Page Transition", href: "/docs/components/PageTransition" },
  { label: "Avatar Stack", href: "/docs/components/AvatarStack", upcoming: true },
  { label: "Progress", href: "/docs/components/Progress", upcoming: true },
  { label: "Spotlight", href: "/docs/components/Spotlight", upcoming: true },
  { label: "Toast", href: "/docs/components/Toast", upcoming: true },
  { label: "Tooltip", href: "/docs/components/Tooltip", upcoming: true },
  { label: "Window", href: "/docs/components/Window", upcoming: true },
] as const;

export default function ComponentPicker() {
  return (
    <div className="relative shrink-0">
      <select
        id="component-picker"
        defaultValue=""
        aria-label="Browse components"
        onChange={(event) => {
          if (event.target.value) window.location.href = event.target.value;
        }}
        className="h-7 w-7 cursor-pointer appearance-none rounded-md border border-border-default bg-surface text-transparent outline-none transition-colors hover:border-border-hover focus:border-accent-primary"
      >
        <option value="" disabled>
          Select a component
        </option>
        {componentOptions.map((component) => (
          <option key={component.label} value={component.href ?? ""}>
            {component.label}{component.upcoming ? " (Coming soon)" : ""}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 m-auto h-3.5 w-3.5 text-fd-muted-foreground"
      />
    </div>
  );
}
