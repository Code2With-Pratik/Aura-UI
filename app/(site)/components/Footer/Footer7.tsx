import { ArrowUpRight, Github, Instagram, Linkedin, Mail, Plus, Youtube } from "lucide-react";

const groups = [
  { title: "Download", links: [["Mac app", "/download"], ["Windows app", "/download"], ["iOS app", "/download"]] },
  { title: "Products", links: [["Aura Studio", "/products/studio"], ["Aura Sites", "/products/sites"], ["Aura Forms", "/products/forms"]] },
  { title: "Services", links: [["Design systems", "/services/design-systems"], ["Product strategy", "/services/strategy"], ["Consulting", "/services/consulting"]] },
  { title: "Company", links: [["About Aura", "/about"], ["Journal", "/journal"], ["Careers", "/careers"]] },
];

export default function Footer7() {
  return (
    <div className="@container w-full min-w-0 overflow-hidden rounded-[22px] border border-[var(--color-border-default)] bg-[var(--color-bg)] p-2 shadow-[0_24px_80px_color-mix(in_srgb,var(--color-bg)_40%,transparent)] sm:rounded-[28px] sm:p-3">
      <div className="min-w-0 overflow-hidden rounded-[18px] border border-[var(--color-border-default)] bg-[color-mix(in_srgb,var(--color-bg)_92%,black)] text-[var(--color-fg)] sm:rounded-[22px]">
        <div className="flex h-10 items-center gap-2 border-b border-[var(--color-border-default)] px-4" aria-label="Browser window frame">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent-primary)]" />
          <span className="ml-3 hidden min-w-0 flex-1 truncate rounded-md bg-[color-mix(in_srgb,var(--color-fg)_4%,transparent)] px-3 py-1.5 text-[9px] text-[var(--color-fg-muted)] sm:block">auraui.dev / a quieter way to build</span>
          <span className="ml-auto text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--color-fg-muted)]">A / 07</span>
        </div>

        <footer className="min-w-0 px-5 pb-5 pt-7 sm:px-7 sm:pb-7 sm:pt-9 lg:px-10 lg:pb-9">
          <div className="grid min-w-0 grid-cols-1 gap-x-8 gap-y-10 @min-[640px]:grid-cols-2 @min-[640px]:gap-y-12 @min-[1040px]:grid-cols-[1.4fr_repeat(4,minmax(0,1fr))_1.35fr] @min-[1040px]:gap-x-9 @min-[1040px]:gap-y-0">
            <div className="min-w-0 @min-[640px]:col-span-2 @min-[1040px]:col-span-1">
              <div className="flex items-center gap-2.5"><span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--color-accent-primary)] text-[var(--color-bg)]"><Plus className="h-4 w-4" strokeWidth={2.5} /></span><span className="text-[16px] font-semibold tracking-[-0.05em]">Aura UI</span></div>
              <p className="mt-5 max-w-[230px] text-[12px] leading-relaxed text-[var(--color-fg-muted)]">Thoughtful building blocks for digital products with a point of view.</p>
              <a href="/components" className="group mt-5 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-primary)]">See the collection <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
            </div>

            {groups.map((group) => (
              <nav key={group.title} aria-label={group.title} className="min-w-0">
                <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-fg)]/80">{group.title}</h2>
                <ul className="space-y-2.5">{group.links.map(([label, href]) => <li key={label}><a href={href} className="break-words text-[11px] text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-accent-primary)]">{label}</a></li>)}</ul>
              </nav>
            ))}

            <div className="min-w-0 border-t border-[var(--color-border-default)] pt-6 @min-[640px]:col-span-2 @min-[1040px]:col-span-1 @min-[1040px]:border-l @min-[1040px]:border-t-0 @min-[1040px]:pl-7 @min-[1040px]:pt-0">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-fg)]/80">Get in touch</p>
              <a href="mailto:hello@auraui.dev" className="inline-flex max-w-full items-center gap-2 break-all text-[11px] text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-accent-primary)]"><Mail className="h-3.5 w-3.5 shrink-0" /> hello@auraui.dev</a>
              <form action="mailto:hello@auraui.dev" method="post" encType="text/plain" className="mt-4 flex min-w-0 max-w-full items-center gap-2 rounded-lg border border-[var(--color-border-default)] p-1"><label htmlFor="footer7-email" className="sr-only">Email address</label><input id="footer7-email" name="email" type="email" required placeholder="Your email" className="min-w-0 flex-1 bg-transparent px-2 py-1.5 text-[11px] text-[var(--color-fg)] outline-none placeholder:text-[var(--color-fg-muted)]" /><button type="submit" aria-label="Subscribe by email" className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-[var(--color-accent-primary)] text-[var(--color-bg)] transition-transform hover:scale-105"><ArrowUpRight className="h-3.5 w-3.5" /></button></form>
              <div className="mt-5 flex flex-wrap gap-2"><a href="https://instagram.com" aria-label="Instagram" className="rounded-full border border-[var(--color-border-default)] p-2 text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)]"><Instagram className="h-3.5 w-3.5" /></a><a href="https://linkedin.com" aria-label="LinkedIn" className="rounded-full border border-[var(--color-border-default)] p-2 text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)]"><Linkedin className="h-3.5 w-3.5" /></a><a href="https://github.com" aria-label="GitHub" className="rounded-full border border-[var(--color-border-default)] p-2 text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)]"><Github className="h-3.5 w-3.5" /></a><a href="https://youtube.com" aria-label="YouTube" className="rounded-full border border-[var(--color-border-default)] p-2 text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)]"><Youtube className="h-3.5 w-3.5" /></a></div>
            </div>
          </div>

          <div className="mt-10 flex min-w-0 flex-col gap-3 border-t border-[var(--color-border-default)] pt-4 text-[10px] text-[var(--color-fg-muted)] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between"><span>© 2026 Aura UI. All rights reserved.</span><div className="flex flex-wrap gap-x-4 gap-y-2"><a href="/privacy" className="transition-colors hover:text-[var(--color-fg)]">Privacy</a><a href="/terms" className="transition-colors hover:text-[var(--color-fg)]">Terms</a><a href="/accessibility" className="transition-colors hover:text-[var(--color-fg)]">Accessibility</a></div></div>
        </footer>
      </div>
    </div>
  );
}
