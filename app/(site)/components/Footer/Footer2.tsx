import { ArrowUpRight, Plus } from "lucide-react";

const columns = [
  { title: "Pages", links: [["All products", "/components"], ["Studio", "/studio"], ["Clients", "/clients"], ["Pricing", "/pricing"], ["Blog", "/blog"]] },
  { title: "Socials", links: [["Instagram", "https://instagram.com"], ["X / Twitter", "https://x.com"], ["LinkedIn", "https://linkedin.com"], ["Dribbble", "https://dribbble.com"]] },
  { title: "Legal", links: [["Privacy policy", "/privacy"], ["Terms of service", "/terms"], ["Cookie policy", "/cookies"]] },
  { title: "Register", links: [["Sign up", "/signup"], ["Log in", "/login"], ["Forgot password", "/forgot-password"]] },
];

export default function Footer2() {
  return (
    <footer className="relative w-full overflow-hidden border border-[var(--color-border-default)] bg-[var(--color-bg)] px-5 pb-5 pt-6 text-[var(--color-fg)] sm:px-8 sm:pb-7 sm:pt-8">
      <div className="relative z-10 flex min-w-0 flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-14">
        <div className="flex min-w-0 flex-col justify-between gap-8 sm:min-h-[190px] sm:max-w-[230px]"><div className="flex items-center gap-2.5"><span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--color-accent-primary)] text-[var(--color-bg)]"><Plus className="h-4 w-4" strokeWidth={2.5} /></span><span className="text-[15px] font-semibold tracking-[-0.04em]">Aura UI</span></div><div><p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-[var(--color-fg-muted)]">© 2026 Aura UI</p><p className="text-[11px] leading-relaxed text-[var(--color-fg-muted)]">A considered interface system for the curious.</p></div></div>
        <div className="grid min-w-0 flex-1 grid-cols-2 gap-x-8 gap-y-9 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-0">{columns.map((column) => <nav key={column.title} aria-label={column.title} className="min-w-0"><h2 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-fg)]/80">{column.title}</h2><ul className="space-y-3">{column.links.map(([link, href]) => <li key={link}><a href={href} className="break-words text-[11px] text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-accent-primary)]">{link}</a></li>)}</ul></nav>)}</div>
      </div>
      <div className="relative z-10 mt-10 flex min-w-0 flex-col items-center gap-4 border-t border-[var(--color-border-default)] pt-5 md:mt-12"><div aria-label="Aura UI" style={{ backgroundImage: "linear-gradient(to top, var(--color-accent-primary), transparent)", fontFamily: "var(--font-arima)", wordSpacing: "0.08em" }} className="order-first w-full max-w-full break-words bg-clip-text text-center text-[clamp(3.75rem,16vw,15rem)] font-bold leading-[0.62] tracking-[-0.055em] text-transparent">Aura UI</div><a href="#top" className="group hidden self-start shrink-0 items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-accent-primary)] sm:inline-flex">Back to top <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a></div>
    </footer>
  );
}
