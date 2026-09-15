import { ArrowUpRight, Plus } from "lucide-react";

const groups = [
  { title: "Explore", links: [["All products", "/components"], ["Studio", "/studio"], ["Clients", "/clients"], ["Pricing", "/pricing"]] },
  { title: "Resources", links: [["Documentation", "/docs"], ["Changelog", "/changelog"], ["UI kits", "/components"], ["Journal", "/blog"]] },
  { title: "Company", links: [["About Aura", "/about"], ["Careers", "/careers"], ["Contact", "mailto:hello@auraui.dev"], ["Instagram", "https://instagram.com"]] },
];

export default function Footer1() {
  return (
    <footer className="w-full overflow-hidden border border-[var(--color-border-default)] bg-[var(--color-bg)] text-[var(--color-fg)] shadow-sm">
      <div className="px-5 py-6 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-5 border-b border-[var(--color-border-default)] pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-2.5"><span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--color-accent-primary)] text-[var(--color-bg)]"><Plus className="h-4 w-4" strokeWidth={2.5} /></span><span className="text-[15px] font-semibold tracking-[-0.04em]">Aura UI</span></div>
          <div className="flex max-w-[245px] items-start justify-between gap-8 sm:items-center"><p className="text-[11px] leading-relaxed text-[var(--color-fg-muted)]">Thoughtful building blocks for products with a point of view.</p><a href="#join" className="group inline-flex shrink-0 items-center gap-1.5 border-b border-[var(--color-fg)] pb-1 text-[11px] font-semibold transition-colors hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)]">Join Aura <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a></div>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-7 pt-7 sm:grid-cols-[1.2fr_1fr_1fr_1.35fr] sm:gap-5">
          {groups.map((group) => <nav key={group.title} aria-label={group.title}><h2 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-fg-muted)]">{group.title}</h2><ul className="space-y-2">{group.links.map(([link, href]) => <li key={link}><a href={href} className="text-[12px] text-[var(--color-fg)]/75 transition-colors hover:text-[var(--color-accent-primary)]">{link}</a></li>)}</ul></nav>)}
          <div id="join" className="col-span-2 border-t border-[var(--color-border-default)] pt-5 sm:col-span-1 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0"><p className="mb-1 text-[13px] font-semibold tracking-[-0.02em]">Stay in the loop.</p><p className="mb-4 max-w-[190px] text-[11px] leading-relaxed text-[var(--color-fg-muted)]">New components, notes, and useful details — once in a while.</p><a href="mailto:hello@auraui.dev?subject=Aura%20UI%20updates" className="group inline-flex items-center gap-2 text-[11px] font-semibold text-[var(--color-accent-primary)]">Subscribe to updates <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a></div>
        </div>
      </div>
      <div className="flex flex-col gap-2 border-t border-[var(--color-border-default)] px-5 py-4 text-[10px] text-[var(--color-fg-muted)] sm:flex-row sm:items-center sm:justify-between sm:px-8"><span>© 2026 Aura UI. All rights reserved.</span><div className="flex gap-4"><a href="/privacy" className="transition-colors hover:text-[var(--color-fg)]">Privacy</a><a href="/terms" className="transition-colors hover:text-[var(--color-fg)]">Terms</a><a href="/accessibility" className="transition-colors hover:text-[var(--color-fg)]">Accessibility</a></div></div>
    </footer>
  );
}
