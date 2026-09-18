"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  CirclePlay,
  FileText,
  Grid3X3,
  Home,
  Image as ImageIcon,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  UserCircle,
  X,
} from "lucide-react";

type NavbarVariant =
  | "apple"
  | "macos"
  | "ios"
  | "dashboard"
  | "floating"
  | "mega"
  | "fullscreen"
  | "smartcare";

const links = ["Store", "Mac", "iPad", "iPhone", "Watch", "AirPods", "Support"];
const appleMenus: Record<string, { heading: string; items: string[] }[]> = {
  Store: [
    {
      heading: "Shop",
      items: ["Shop the latest", "Mac", "iPad", "iPhone", "Accessories"],
    },
    {
      heading: "Quick links",
      items: ["Find a Store", "Order Status", "Apple Trade In"],
    },
  ],
  Mac: [
    {
      heading: "Explore Mac",
      items: [
        "Explore All Mac",
        "MacBook Air",
        "MacBook Pro",
        "iMac",
        "Mac mini",
        "Mac Studio",
        "Displays",
      ],
    },
    {
      heading: "Shop Mac",
      items: ["Shop Mac", "Mac Accessories", "Ways to Buy", "Personal Setup"],
    },
    {
      heading: "More from Mac",
      items: ["Mac Support", "AppleCare", "macOS", "Apple Intelligence"],
    },
  ],
  iPad: [
    {
      heading: "Explore iPad",
      items: ["Explore All iPad", "iPad Pro", "iPad Air", "iPad", "iPad mini"],
    },
    {
      heading: "Accessories",
      items: ["Apple Pencil", "Magic Keyboard", "iPad Cases"],
    },
  ],
  iPhone: [
    {
      heading: "Explore iPhone",
      items: [
        "Explore All iPhone",
        "iPhone 17 Pro",
        "iPhone Air",
        "iPhone 17",
        "iPhone 16",
      ],
    },
    {
      heading: "Shop iPhone",
      items: ["Shop iPhone", "Compare iPhone", "Switch from Android"],
    },
  ],
  Watch: [
    {
      heading: "Explore Watch",
      items: [
        "Explore Apple Watch",
        "Apple Watch Series",
        "Apple Watch Ultra",
        "Apple Watch SE",
      ],
    },
    {
      heading: "More from Watch",
      items: ["Watch Support", "Apple Watch Studio", "Watch Bands"],
    },
  ],
  AirPods: [
    {
      heading: "Explore AirPods",
      items: ["Explore All AirPods", "AirPods Pro", "AirPods", "AirPods Max"],
    },
    {
      heading: "More from AirPods",
      items: ["Compare AirPods", "AirPods Support", "Apple Music"],
    },
  ],
  Support: [
    {
      heading: "Support",
      items: [
        "iPhone Support",
        "Mac Support",
        "iPad Support",
        "Apple Watch Support",
      ],
    },
    {
      heading: "Helpful links",
      items: ["Contact Support", "Community", "Repair"],
    },
  ],
};

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`grid h-7 w-7 place-items-center rounded-lg text-sm font-semibold ${dark ? "bg-white text-black" : "bg-black text-white"}`}
    >
      A
    </span>
  );
}
function NavLink({
  children,
  active = false,
  light = false,
}: {
  children: ReactNode;
  active?: boolean;
  light?: boolean;
}) {
  return (
    <button
      type="button"
      className={`flex min-w-0 truncate whitespace-nowrap text-left text-[12px] transition-colors ${light ? (active ? "text-black" : "text-black/60 hover:text-black") : active ? "text-fg" : "text-fg-muted hover:text-fg"}`}
    >
      {children}
    </button>
  );
}
function Frame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative flex min-h-[190px] w-full items-center justify-center overflow-visible rounded-[14px] border border-border-default bg-transparent p-5 ${className}`}
    >
      {children}
    </div>
  );
}

function RotatingLabel({ text }: { text: string }) {
  return (
    <span aria-label={text} className="inline-flex whitespace-pre">
      {Array.from(text).map((character, index) => (
        <span
          key={`${character}-${index}`}
          aria-hidden="true"
          style={{ transitionDelay: `${index * 38}ms` }}
          className="inline-block origin-center [transform-style:preserve-3d] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:[transform:rotateX(180deg)]"
        >
          {character}
        </span>
      ))}
    </span>
  );
}

export default function NavbarPreview({ variant }: { variant: NavbarVariant }) {
  const [open, setOpen] = useState(false);
  const [appleMenu, setAppleMenu] = useState<string | null>(null);
  const [floatingActive, setFloatingActive] = useState("Message");
  if (variant === "apple")
    return (
      <Frame>
        <nav
          onMouseLeave={() => setAppleMenu(null)}
          className="flex w-full min-w-0 max-w-[650px] items-center justify-between gap-2 border-b border-border-default px-2 py-3 text-fg sm:px-3 [&>span:first-of-type]:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            aria-label="Apple"
            className="h-4 w-4 shrink-0 fill-fg"
          >
            <path d="M17.05 12.54c-.02-2.25 1.84-3.35 1.92-3.4a4.1 4.1 0 0 0-3.24-1.75c-1.36-.14-2.65.8-3.34.8-.7 0-1.78-.78-2.93-.76a4.32 4.32 0 0 0-3.64 2.22c-1.57 2.72-.4 6.74 1.1 8.95.75 1.08 1.62 2.29 2.78 2.25 1.12-.05 1.54-.72 2.9-.72 1.35 0 1.73.72 2.9.7 1.2-.02 1.96-1.1 2.68-2.19a8.98 8.98 0 0 0 1.22-2.52 3.9 3.9 0 0 1-2.35-3.58ZM14.86 5.96a3.86 3.86 0 0 0 .88-2.78 3.93 3.93 0 0 0-2.54 1.31 3.66 3.66 0 0 0-.9 2.67c.98.08 1.98-.5 2.56-1.2Z" />
          </svg>
          <span className="text-lg text-[#1d1d1f]">●</span>
          <div className="flex min-w-0 flex-1 items-center justify-center gap-2 overflow-hidden sm:gap-4">
            {links.map((link) => (
              <button
                key={link}
                type="button"
                onMouseEnter={() => setAppleMenu(link)}
                onFocus={() => setAppleMenu(link)}
                onClick={() =>
                  setAppleMenu((value) => (value === link ? null : link))
                }
                className="min-w-0 truncate text-[11px] text-fg-muted transition hover:text-fg sm:text-[12px]"
              >
                {link}
              </button>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-2 text-fg-muted sm:gap-3">
            <button
              type="button"
              aria-label="Search"
              className="rounded-md p-1 transition hover:bg-fg/10 hover:text-fg"
            >
              <Search className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              aria-label="Shopping bag"
              className="rounded-md p-1 transition hover:bg-fg/10 hover:text-fg"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="sm:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>
        {appleMenu && (
          <div
            onMouseEnter={() => setAppleMenu(appleMenu)}
            onMouseLeave={() => setAppleMenu(null)}
            className="absolute left-1/2 top-[calc(50%+20px)] z-30 w-[min(94%,680px)] -translate-x-1/2 rounded-b-2xl border border-border-default bg-[var(--color-surface)] px-5 py-5 text-fg shadow-2xl backdrop-blur-xl"
          >
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {(appleMenus[appleMenu] ?? []).map((column) => (
                <div key={column.heading}>
                  <p className="mb-2 text-[11px] font-medium text-fg-muted">
                    {column.heading}
                  </p>
                  <div className="space-y-1.5">
                    {column.items.map((item, index) => (
                      <button
                        key={item}
                        type="button"
                        className={`block text-left text-fg transition-colors hover:text-fg ${index === 0 ? "text-[16px] font-medium" : "text-[13px] text-fg-muted"}`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {open && (
          <div className="absolute inset-x-5 top-[calc(50%+28px)] z-20 rounded-xl border border-border-default bg-[var(--color-surface)] p-4 text-fg shadow-xl sm:hidden">
            {links.map((link) => (
              <button
                key={link}
                type="button"
                className="block w-full border-b border-border-default py-2 text-left text-[13px] text-fg"
              >
                {link}
              </button>
            ))}
          </div>
        )}
      </Frame>
    );
  if (variant === "macos")
    return (
      <Frame className="text-fg">
        <nav className="flex w-full max-w-[650px] items-center justify-between rounded-xl border border-border-default bg-fg/[0.08] px-4 py-2.5 shadow-2xl backdrop-blur-xl">
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Logo dark />
            <span className="text-[12px] font-semibold">Finder</span>
          </div>
          <div className="hidden min-w-0 items-center gap-3 overflow-hidden xl:flex">
            <span className="text-[11px] text-fg-muted">180.6KB/s</span>
            <span className="text-[11px] text-fg-muted">Wi-Fi</span>
            <span className="text-[11px] text-fg/80">Fri 10:44</span>
          </div>
          <button
            type="button"
            className="rounded-lg p-1.5 text-fg-muted hover:bg-fg/10 hover:text-fg"
          >
            <Menu className="h-4 w-4" />
          </button>
        </nav>
      </Frame>
    );
  if (variant === "ios")
    return (
      <Frame>
        <nav className="grid w-full max-w-[520px] grid-cols-5 items-center gap-1 rounded-[30px] border border-white/80 bg-white/45 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,.9),0_16px_40px_rgba(58,84,112,.22)] backdrop-blur-2xl">
          <button
            type="button"
            aria-label="Home"
            className="mx-auto grid h-11 w-11 place-items-center rounded-full text-[#617184] transition-all hover:bg-white/70 hover:shadow-sm"
          >
            <Home className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Explore"
            className="mx-auto grid h-11 w-11 place-items-center rounded-full text-[#617184] transition-all hover:bg-white/70 hover:shadow-sm"
          >
            <Grid3X3 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label="Switch mode"
            className={`mx-auto grid h-12 w-12 place-items-center rounded-full border border-white/60 text-white shadow-[0_8px_18px_rgba(54,132,237,.35)] transition-all duration-300 hover:scale-105 ${open ? "bg-[#7c5cff] shadow-[0_8px_18px_rgba(124,92,255,.38)]" : "bg-[#3684ed]"}`}
          >
            <ArrowRight className="h-5 w-5 rotate-45" />
          </button>
          <button
            type="button"
            aria-label="Analyze"
            className="mx-auto grid h-11 w-11 place-items-center rounded-full text-[#617184] transition-all hover:bg-white/70 hover:shadow-sm"
          >
            <Sparkles className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Profile"
            className="mx-auto grid h-11 w-11 place-items-center rounded-full text-[#617184] transition-all hover:bg-white/70 hover:shadow-sm"
          >
            <UserCircle className="h-4 w-4" />
          </button>
        </nav>
        {open && (
          <span className="absolute bottom-3 rounded-full bg-[#7c5cff] px-3 py-1 text-[10px] text-white shadow-lg">
            Mode switched
          </span>
        )}
      </Frame>
    );
  if (variant === "fullscreen")
    return (
      <Frame className="!min-h-[320px] !items-start bg-[#0b0b0b] p-0 text-white">
        <nav className="relative z-30 flex h-16 w-full items-center justify-between border-b border-white/10 px-5">
          <button
            type="button"
            aria-label="Anne home"
            className="font-serif text-2xl italic text-white transition-opacity hover:opacity-60"
          >
            Anne
          </button>
          <button
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((value) => !value)}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-black"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "menu"}
                initial={{ rotate: open ? -90 : 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: open ? 90 : -90, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {open ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </nav>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.55, ease: [0.83, 0, 0.17, 1] }}
              className="absolute inset-0 z-20 overflow-auto bg-[#0b0b0b] px-5 pb-6 pt-20"
            >
              <div className="grid min-h-full gap-8 md:grid-cols-[0.75fr_1.5fr_0.75fr]">
                <div className="hidden border-r border-white/10 pr-5 md:block">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/40">
                    Navigation
                  </p>
                  <div className="mt-6 space-y-3 text-xs text-white/75">
                    <p>Available for freelance</p>
                    <p>UI / UX</p>
                    <p>Brand Identity</p>
                    <p>Frontend Development</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-2 md:px-5">
                  {["Home", "About", "Projects", "Contact"].map(
                    (item, index) => (
                      <motion.button
                        key={item}
                        type="button"
                        initial={{ y: 28, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.06, duration: 0.4 }}
                        onClick={() => setOpen(false)}
                        className="group text-left font-serif text-4xl uppercase tracking-tight text-white transition-colors hover:text-white/45 sm:text-5xl"
                      >
                        <RotatingLabel text={item} />
                      </motion.button>
                    ),
                  )}
                </div>
                <div className="border-t border-white/10 pt-5 text-xs text-white/75 md:border-l md:border-t-0 md:pl-5 md:pt-0">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/40">
                    Email
                  </p>
                  <p className="mt-2 text-sm text-white">anne@gmail.com</p>
                  <p className="mt-8 text-[9px] uppercase tracking-[0.3em] text-white/40">
                    Social
                  </p>
                  <div className="mt-2 space-y-2">
                    <p className="transition-colors hover:text-white">
                      Instagram
                    </p>
                    <p className="transition-colors hover:text-white">
                      Dribbble
                    </p>
                    <p className="transition-colors hover:text-white">
                      Behance
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Frame>
    );
  if (variant === "smartcare")
    return (
      <Frame className="!min-h-[190px]">
        <nav className="flex w-full max-w-[980px] min-w-0 items-center gap-3 overflow-hidden rounded-full border border-white/80 bg-white/65 p-2 pl-3 text-[#24262b] shadow-[0_12px_32px_rgba(35,42,56,.16),inset_0_1px_0_rgba(255,255,255,.95)] backdrop-blur-2xl sm:gap-5 sm:pl-4">
          <div className="flex min-w-[125px] shrink-0 items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#0c0d0f] text-white shadow-md">
              <span className="text-xl leading-none">+</span>
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-[12px] font-medium">SmartCare</span>
              <span className="block text-[9px] text-black/45">Solutions</span>
            </span>
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-1 overflow-hidden sm:justify-center sm:gap-2">
            {[
              { label: "Home", icon: Home },
              { label: "Articles", icon: FileText },
              { label: "Predictive Analytics", icon: TrendingUp },
              { label: "Image analysis", icon: ImageIcon },
            ].map(({ label, icon: Icon }, index) => (
              <button
                key={label}
                type="button"
                className={`flex min-w-0 shrink-0 items-center gap-1.5 rounded-full px-2.5 py-2 text-[10px] transition-all sm:px-4 sm:text-[12px] ${index === 0 ? "bg-[#0c0d0f] text-white shadow-md" : "text-black/65 hover:bg-black/5 hover:text-black"}`}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{label}</span>
              </button>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              className="hidden items-center gap-2 rounded-full bg-white px-4 py-3 text-[11px] font-medium shadow-sm transition hover:bg-white/70 sm:flex"
            >
              Start now <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              aria-label="Start now"
              className="grid h-9 w-9 place-items-center rounded-full bg-[#0c0d0f] text-white transition hover:scale-105"
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              aria-label="Next"
              className="hidden text-black/45 sm:block"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </Frame>
    );
  if (variant === "floating")
    return (
      <Frame>
        <nav className="flex w-full max-w-[650px] items-center justify-between gap-1 rounded-full border border-white/10 bg-[#080c12]/95 p-2 shadow-2xl">
          {["Home", "Explore", "Message", "Search", "Profile"].map((item) => {
            const Icon =
              item === "Home"
                ? Home
                : item === "Explore"
                  ? Grid3X3
                  : item === "Message"
                    ? CirclePlay
                    : item === "Search"
                      ? Search
                      : UserCircle;
            const active = floatingActive === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setFloatingActive(item)}
                className={`relative flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full px-2 py-3 text-[11px] text-white transition-all duration-300 ${active ? "-translate-y-1 bg-[#1b222c] px-4 shadow-[0_0_25px_rgba(255,100,140,.5)]" : "hover:-translate-y-0.5 hover:bg-white/10"}`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {active && <span className="truncate">{item}</span>}
              </button>
            );
          })}
        </nav>
        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-[#080c12]/95 p-2 shadow-2xl">
          <NavLink>⌂</NavLink>
          <NavLink>◉</NavLink>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-[20px] border border-white/20 bg-[#1b222c] px-5 py-3 text-[12px] font-medium text-white shadow-[0_0_25px_rgba(255,100,140,.5)] transition-transform hover:-translate-y-1"
          >
            {open ? "Active" : "Message"}
          </button>
          <NavLink>⌕</NavLink>
          <NavLink>◌</NavLink>
        </nav>
      </Frame>
    );
  if (variant === "mega")
    return (
      <Frame>
        <nav className="flex w-full min-w-0 max-w-[720px] items-center justify-between gap-2 overflow-hidden rounded-2xl bg-white px-2 py-2 text-black shadow-2xl sm:px-4">
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Logo />
            <span className="hidden text-[12px] font-semibold sm:inline">
              Aura
            </span>
          </div>
          <div className="flex min-w-0 flex-1 items-center justify-center gap-2 overflow-hidden sm:gap-4">
            {["Products", "Solutions", "Resources"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="inline-flex min-w-0 shrink items-center gap-0.5 truncate text-[9px] text-black/65 hover:text-black sm:text-[11px]"
              >
                {item}
                <ChevronDown className="h-3 w-3" />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="rounded-lg p-2 hover:bg-black/5">
              <Search className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              className="shrink-0 rounded-lg bg-black px-2 py-2 text-[9px] font-semibold text-white sm:px-3 sm:text-[10px]"
            >
              Start free
            </button>
          </div>
        </nav>
        {open && (
          <div className="absolute left-1/2 top-[calc(50%+36px)] z-20 w-[min(90%,680px)] -translate-x-1/2 rounded-2xl border border-white/10 bg-[#171717]/95 p-5 text-white shadow-2xl backdrop-blur-xl">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-[10px] uppercase tracking-[.18em] text-white/40">
                  Build
                </p>
                <p className="mt-2 text-xs">Components</p>
                <p className="mt-2 text-xs">Templates</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[.18em] text-white/40">
                  Learn
                </p>
                <p className="mt-2 text-xs">Documentation</p>
                <p className="mt-2 text-xs">Changelog</p>
              </div>
              <div className="rounded-xl bg-white/5 p-3">
                <p className="text-[12px] font-semibold">Ship beautifully.</p>
                <p className="mt-1 text-[10px] text-white/50">
                  A calm system for fast teams.
                </p>
              </div>
            </div>
          </div>
        )}
      </Frame>
    );
  return (
    <Frame>
      <div className="relative w-full max-w-[720px]">
        <nav className="flex w-full min-w-0 items-center justify-between gap-3 overflow-visible rounded-2xl border border-white/70 bg-white/60 px-3 py-3 text-black shadow-[0_18px_45px_rgba(15,23,42,0.16)] backdrop-blur-2xl sm:px-5">
          <div className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
            <Logo />
            <span className="truncate text-[12px] font-semibold text-black">
              Dashboard
            </span>
          </div>
          <div className="flex min-w-0 flex-1 items-center justify-center gap-2 overflow-visible sm:gap-4">
            <NavLink active light>
              Overview
            </NavLink>
            <NavLink light>
              Orders{" "}
              <b className="ml-1 rounded-full bg-fg/10 px-1.5 py-0.5 text-[9px]">
                2
              </b>
            </NavLink>
            <NavLink light>Products</NavLink>
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="inline-flex min-w-0 items-center gap-1 truncate text-[10px] text-black/60 hover:text-black sm:text-[11px]"
              >
                Settings <ChevronDown className="h-3 w-3" />
              </button>
              {open && (
                <div className="absolute left-0 top-[calc(100%+8px)] z-30 flex w-max max-w-[calc(100vw-2rem)] translate-x-0 flex-col gap-0.5 rounded-xl border border-white/70 bg-white/75 p-1.5 text-black shadow-xl backdrop-blur-xl [&>button]:w-full [&>button]:justify-start [&>button]:rounded-md [&>button]:px-2.5 [&>button]:py-1.5 [&>button]:text-left [&>button]:text-[12px] [&>button]:whitespace-nowrap [&>button]:hover:bg-black/5">
                  <NavLink light>General</NavLink>
                  <NavLink light>Billing</NavLink>
                  <NavLink light>Team</NavLink>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-lg p-2 text-black/60 hover:bg-black/5 hover:text-black"
            >
              <Search className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              className="shrink-0 rounded-lg bg-accent-primary px-2 py-2 text-[9px] font-semibold text-black sm:px-3 sm:text-[10px]"
            >
              Upgrade
            </button>
          </div>
        </nav>
      </div>
    </Frame>
  );
}
