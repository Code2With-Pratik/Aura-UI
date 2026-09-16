"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

export type DockItem = {
  id: string;
  name: string;
  icon: ReactNode;
  onClick?: () => void;
  active?: boolean;
};

const defaultItems: DockItem[] = [
  {
    id: "finder",
    name: "Finder",
    icon: <img src="/AppIcon/Finder.png" alt="" width={44} height={44} />,
    active: true,
  },
  {
    id: "launchpad",
    name: "Launchpad",
    icon: <img src="/AppIcon/Launchpad.png" alt="" width={44} height={44} />,
  },
  {
    id: "app-store",
    name: "App Store",
    icon: <img src="/AppIcon/AppStore.png" alt="" width={44} height={44} />,
  },
  {
    id: "folder",
    name: "Folder",
    icon: <img src="/AppIcon/Folder.png" alt="" width={44} height={44} />,
  },
  {
    id: "calendar",
    name: "Calendar",
    icon: <img src="/AppIcon/Calendar.png" alt="" width={44} height={44} />,
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: <img src="/AppIcon/WhatsApp.png" alt="" width={44} height={44} />,
  },
  {
    id: "weather",
    name: "Weather",
    icon: <img src="/AppIcon/Weather.png" alt="" width={44} height={44} />,
  },
  {
    id: "music",
    name: "Music",
    icon: <img src="/AppIcon/Music.png" alt="" width={44} height={44} />,
  },
  {
    id: "spotify",
    name: "Spotify",
    icon: <img src="/AppIcon/Sportify.png" alt="" width={44} height={44} />,
  },
  {
    id: "settings",
    name: "Settings",
    icon: <img src="/AppIcon/Setting.png" alt="" width={44} height={44} />,
  },
  {
    id: "trash",
    name: "Trash",
    icon: <img src="/AppIcon/Trash.png" alt="" width={44} height={44} />,
  },
];

export function Dock({
  items = defaultItems,
  compact = false,
}: {
  items?: DockItem[];
  compact?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [launchpadOpen, setLaunchpadOpen] = useState(false);
  const [launchpadQuery, setLaunchpadQuery] = useState("");
  const [appWindow, setAppWindow] = useState<DockItem | null>(null);
  const [appMaximized, setAppMaximized] = useState(false);
  const reducedMotion = useReducedMotion();
  const launchpadSearchRef = useRef<HTMLInputElement>(null);
  const launchpadTriggerRef = useRef<HTMLButtonElement>(null);
  const appWindowRef = useRef<HTMLDivElement>(null);
  const appTriggerRef = useRef<HTMLButtonElement>(null);
  const spring = reducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 430, damping: 28, mass: 0.45 };

  function closeLaunchpad() {
    const trigger = launchpadTriggerRef.current;
    setLaunchpadOpen(false);
    window.requestAnimationFrame(() => trigger?.focus());
  }

  function closeAppWindow() {
    const trigger = appTriggerRef.current;
    setAppWindow(null);
    setAppMaximized(false);
    window.requestAnimationFrame(() => trigger?.focus());
  }

  useEffect(() => {
    if (!launchpadOpen) return;
    const frame = window.requestAnimationFrame(() =>
      launchpadSearchRef.current?.focus(),
    );
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") closeLaunchpad();
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [launchpadOpen]);

  useEffect(() => {
    if (!appWindow) return;
    const frame = window.requestAnimationFrame(() =>
      appWindowRef.current?.focus(),
    );
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") closeAppWindow();
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [appWindow]);

  function handleItemClick(
    item: DockItem,
    event: MouseEvent<HTMLButtonElement>,
  ) {
    if (item.id === "launchpad") {
      launchpadTriggerRef.current = event.currentTarget;
      setAppWindow(null);
      setLaunchpadOpen((open) => !open);
    } else {
      appTriggerRef.current = event.currentTarget;
      setLaunchpadOpen(false);
      setAppMaximized(false);
      setAppWindow(item);
    }
    item.onClick?.();
  }

  function handleLaunchpadAppClick(item: DockItem) {
    appTriggerRef.current = launchpadTriggerRef.current;
    setAppMaximized(false);
    setAppWindow(item);
    item.onClick?.();
    closeLaunchpad();
  }

  const query = launchpadQuery.trim().toLowerCase();
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(query),
  );

  return (
    <div
      className={`relative flex min-w-0 w-full flex-col items-center justify-end overflow-visible ${compact ? "h-[250px]" : "min-h-[360px]"}`}
    >
      <AnimatePresence initial={false}>
        {launchpadOpen && (
          <motion.div
            initial={
              reducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 10, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }
            }
            transition={
              reducedMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 330, damping: 27 }
            }
            className="pointer-events-none absolute inset-x-0 bottom-[65px] z-20 w-full min-w-0 px-3 sm:px-6"
          >
            <button
              type="button"
              aria-label="Close Launchpad"
              onClick={closeLaunchpad}
              className="pointer-events-auto absolute inset-0 z-0 cursor-default bg-transparent"
            />
            <div
              role="dialog"
              aria-modal="false"
              aria-label="Launchpad applications"
              tabIndex={-1}
              className="pointer-events-auto relative z-10 mx-auto max-h-[min(72vh,430px)] w-[min(100%,560px)] max-w-full overflow-y-auto rounded-[15px] border border-[color-mix(in_srgb,var(--color-fg)_16%,transparent)] bg-[color-mix(in_srgb,var(--color-bg)_76%,var(--color-fg)_8%)] p-4 shadow-[0_24px_80px_color-mix(in_srgb,var(--color-fg)_22%,transparent)] backdrop-blur-2xl"
            >
              <input
                ref={launchpadSearchRef}
                type="search"
                value={launchpadQuery}
                onChange={(event) => setLaunchpadQuery(event.target.value)}
                placeholder="Search applications"
                aria-label="Search applications"
                className="mx-auto mb-4 block h-9 w-full max-w-[320px] rounded-full border border-[color-mix(in_srgb,var(--color-fg)_14%,transparent)] bg-[color-mix(in_srgb,var(--color-bg)_48%,var(--color-fg)_7%)] px-4 text-center text-[11px] text-fg outline-none placeholder:text-fg-muted focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/30"
              />
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-5 gap-2" role="list">
                  {filteredItems.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => handleLaunchpadAppClick(item)}
                      className="group flex min-w-0 flex-col items-center gap-1 rounded-lg p-1 text-center transition-colors hover:bg-[color-mix(in_srgb,var(--color-fg)_8%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                    >
                      <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-[11px] transition-transform group-hover:scale-105">
                        {item.icon}
                      </span>
                      <span className="max-w-full truncate text-[10px] text-fg/80">
                        {item.name}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="py-8 text-center text-[11px] text-fg-muted">
                  No applications found
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {appWindow && (
          <motion.div
            initial={
              reducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 10, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }
            }
            transition={
              reducedMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 330, damping: 27 }
            }
            className="pointer-events-none absolute inset-x-0 bottom-[65px] z-20 w-full min-w-0 px-3 sm:px-6"
          >
            <button
              type="button"
              aria-label={`Close ${appWindow.name} window`}
              onClick={closeAppWindow}
              className="pointer-events-auto absolute inset-0 z-0 cursor-default bg-transparent"
            />
            <div
              ref={appWindowRef}
              role="dialog"
              aria-modal="false"
              aria-label={`${appWindow.name} window`}
              tabIndex={-1}
              className={`pointer-events-auto relative z-10 mx-auto flex max-h-[min(72vh,430px)] min-h-[180px] max-w-full flex-col overflow-hidden rounded-[15px] border border-[color-mix(in_srgb,var(--color-fg)_16%,transparent)] bg-[color-mix(in_srgb,var(--color-bg)_82%,var(--color-fg)_8%)] backdrop-blur-2xl ${appMaximized ? "w-[min(100%,680px)]" : "w-[min(100%,560px)]"}`}
            >
              <div className="relative flex h-10 shrink-0 items-center justify-center border-b border-[color-mix(in_srgb,var(--color-fg)_12%,transparent)] px-20">
                <div className="absolute left-3 flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label={`Close ${appWindow.name}`}
                    onClick={closeAppWindow}
                    className="h-3 w-3 rounded-full bg-[#ff5f57] ring-1 ring-black/10 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                  />
                  <button
                    type="button"
                    aria-label={`Minimize ${appWindow.name}`}
                    onClick={closeAppWindow}
                    className="h-3 w-3 rounded-full bg-[#febc2e] ring-1 ring-black/10 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                  />
                  <button
                    type="button"
                    aria-label={`${appMaximized ? "Restore" : "Maximize"} ${appWindow.name}`}
                    onClick={() => setAppMaximized((maximized) => !maximized)}
                    className="h-3 w-3 rounded-full bg-[#28c840] ring-1 ring-black/10 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                  />
                </div>
                <span className="truncate text-xs font-medium text-fg">
                  {appWindow.name}
                </span>
              </div>
              <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 overflow-y-auto p-6 text-center">
                <span className="grid h-14 w-14 place-items-center overflow-hidden rounded-2xl shadow-lg">
                  {appWindow.icon}
                </span>
                <p className="text-sm font-semibold text-fg">
                  {appWindow.name}
                </p>
                <p className="max-w-[320px] text-[11px] leading-relaxed text-fg-muted">
                  A focused Aura workspace for your next idea. This app window
                  is ready for your content.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 w-full items-end overflow-x-auto overflow-y-hidden overscroll-x-contain px-2 pb-3 pt-10 [scrollbar-width:thin] sm:px-6 sm:pt-10">
        <div
          aria-label="Dock"
          onMouseLeave={() => setActiveIndex(null)}
          className="mx-auto flex h-[52px] w-max max-w-none shrink-0 items-center gap-2 overflow-visible rounded-[20px] border border-[color-mix(in_srgb,var(--color-fg)_16%,transparent)] bg-[color-mix(in_srgb,var(--color-bg)_72%,var(--color-fg)_10%)] px-2 shadow-[0_18px_50px_color-mix(in_srgb,var(--color-fg)_18%,transparent)] backdrop-blur-xl sm:gap-2 sm:px-2.5"
        >
          {items.length > 0 ? (
            items.map((item, index) => {
              const distance =
                activeIndex === null ? Infinity : Math.abs(index - activeIndex);
              const scale = distance === 0 ? 1.34 : distance === 1 ? 1.09 : 1;
              const y = distance === 0 ? -10 : distance === 1 ? -3 : 0;
              const highlighted = activeIndex === index;
              const tooltipId = `dock-tooltip-${item.id}`;
              return (
                <div
                  key={item.id}
                  className="relative flex h-9 w-9 flex-col items-center sm:h-9 sm:w-9"
                >
                  {index === 0 && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-1 top-1/2 h-6 w-px -translate-y-1/2 bg-[color-mix(in_srgb,var(--color-fg)_22%,transparent)]"
                    />
                  )}
                  {item.id === "trash" && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -left-1 top-1/2 h-6 w-px -translate-y-1/2 bg-[color-mix(in_srgb,var(--color-fg)_22%,transparent)]"
                    />
                  )}
                  <AnimatePresence>
                    {highlighted && (
                      <motion.span
                        id={tooltipId}
                        role="tooltip"
                        initial={
                          reducedMotion ? { opacity: 0 } : { opacity: 0, y: 5 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        exit={
                          reducedMotion ? { opacity: 0 } : { opacity: 0, y: 3 }
                        }
                        transition={{ duration: reducedMotion ? 0 : 0.16 }}
                        className="pointer-events-none absolute bottom-full mb-3 whitespace-nowrap rounded-md border border-[color-mix(in_srgb,var(--color-fg)_14%,transparent)] bg-[color-mix(in_srgb,var(--color-bg)_90%,var(--color-fg)_10%)] px-2 py-1 text-[9px] font-medium text-fg shadow-lg"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <motion.button
                    type="button"
                    aria-label={item.name}
                    aria-describedby={highlighted ? tooltipId : undefined}
                    aria-pressed={item.active}
                    onClick={(event) => handleItemClick(item, event)}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onBlur={() => setActiveIndex(null)}
                    animate={{ scale, y }}
                    transition={spring}
                    whileTap={reducedMotion ? undefined : { scale: 0.94 }}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
                  >
                    <span className="flex h-full w-full items-center justify-center overflow-hidden rounded-[inherit] [&>img]:h-full [&>img]:w-full [&>img]:rounded-[inherit] [&>img]:object-contain">
                      {item.icon}
                    </span>
                  </motion.button>
                  {item.active && (
                    <span
                      className="pointer-events-none absolute bottom-[-5px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent-primary"
                      aria-label={`${item.name} is active`}
                    />
                  )}
                </div>
              );
            })
          ) : (
            <span className="px-3 text-[10px] text-white/55">No apps</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dock;
