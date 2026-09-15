import { ArrowRight, ArrowUpRight, Instagram, Linkedin, Mail, MapPin } from "lucide-react";

const locations = [
  ["New York", "SoHo studio", "mailto:ny@auraui.dev"],
  ["London", "Shoreditch studio", "mailto:london@auraui.dev"],
  ["Remote", "Everywhere online", "/about"],
];

export default function Footer4() {
  return (
    <footer className="w-full overflow-hidden rounded-[20px] border border-[var(--color-border-default)] bg-[var(--color-surface)] text-[var(--color-fg)] shadow-sm">
      <div className="flex min-h-[132px] items-end justify-between gap-5 px-5 pb-5 pt-6 sm:px-8 sm:pb-7">
        <div><p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">Have a good idea?</p><h2 className="font-display text-[clamp(2rem,6vw,3.7rem)] leading-[0.85] tracking-[-0.055em]">Contact us<span className="text-[var(--color-accent-primary)]">.</span></h2></div>
        <a href="mailto:hello@auraui.dev" aria-label="Contact Aura UI" className="group grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--color-accent-primary)] text-[var(--color-bg)] transition-transform duration-300 hover:rotate-[-35deg] sm:h-14 sm:w-14"><ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" /></a>
      </div>
      <div className="relative bg-[var(--color-bg)] px-5 pb-8 pt-7 text-[var(--color-fg)] [clip-path:polygon(0_8px,2%_0,4%_7px,6%_1px,8%_8px,10%_0,12%_7px,14%_1px,16%_8px,18%_0,20%_7px,22%_1px,24%_8px,26%_0,28%_7px,30%_1px,32%_8px,34%_0,36%_7px,38%_1px,40%_8px,42%_0,44%_7px,46%_1px,48%_8px,50%_0,52%_7px,54%_1px,56%_8px,58%_0,60%_7px,62%_1px,64%_8px,66%_0,68%_7px,70%_1px,72%_8px,74%_0,76%_7px,78%_1px,80%_8px,82%_0,84%_7px,86%_1px,88%_8px,90%_0,92%_7px,94%_1px,96%_8px,98%_0,100%_7px,100%_100%,0_100%)] sm:px-8 sm:pb-9 sm:pt-8">
        <div className="grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-[1.15fr_1fr_1fr_1.25fr] sm:gap-6">
          <div className="col-span-2 sm:col-span-1"><div className="mb-2 flex items-center gap-2 text-[13px] font-semibold tracking-[-0.04em]"><span className="grid h-5 w-5 place-items-center rounded-full bg-[var(--color-accent-primary)] text-[var(--color-bg)]">+</span>Aura UI</div><p className="max-w-[170px] text-[11px] leading-relaxed text-[var(--color-fg-muted)]">Small details. Clear direction. Better digital products.</p></div>
          {locations.map(([city, detail, href]) => <a key={city} href={href} className="group block text-[11px] text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]"><span className="mb-2 flex items-center gap-1.5 font-semibold text-[var(--color-fg)]"><MapPin className="h-3 w-3 text-[var(--color-accent-primary)]" />{city}</span><span>{detail}</span><span className="mt-1 block text-[10px] group-hover:text-[var(--color-accent-primary)]">Say hello <ArrowUpRight className="inline h-3 w-3" /></span></a>)}
          <div className="col-span-2 border-t border-[var(--color-border-default)] pt-4 sm:col-span-1 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0"><p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-fg-muted)]">Keep in touch</p><a href="mailto:hello@auraui.dev" className="flex items-center gap-2 text-[11px] hover:text-[var(--color-accent-primary)]"><Mail className="h-3.5 w-3.5" /> hello@auraui.dev</a><a href="mailto:hello@auraui.dev?subject=Aura%20UI%20newsletter" className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold text-[var(--color-accent-primary)]">Sign up for the newsletter <ArrowUpRight className="h-3 w-3" /></a><div className="mt-3 flex gap-2"><a href="https://instagram.com" aria-label="Instagram" className="rounded-full border border-[var(--color-border-default)] p-1.5 hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)]"><Instagram className="h-3 w-3" /></a><a href="https://linkedin.com" aria-label="LinkedIn" className="rounded-full border border-[var(--color-border-default)] p-1.5 hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)]"><Linkedin className="h-3 w-3" /></a></div></div>
        </div>
      </div>
    </footer>
  );
}
