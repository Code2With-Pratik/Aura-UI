"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Bell,
  Bluetooth,
  CalendarDays,
  FileText,
  Folder,
  Globe,
  MessageSquare,
  Pause,
  Play,
  RotateCcw,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Timer as TimerIcon,
  Volume2,
  Wifi,
  X,
} from "lucide-react";

const apps = [
  ["File Explorer", Folder],
  ["Browser", Globe],
  ["Documents", FileText],
  ["Settings", Settings],
] as const;
type TaskbarApp = (typeof apps)[number];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdayLabels = ["S", "M", "T", "W", "T", "F", "S"];
type Panel = "launcher" | "search" | "quick" | "notifications" | "timer" | null;
type PanelName = Exclude<Panel, null>;

function createCalendarDays(date: Date) {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const daysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
  ).getDate();
  return [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
}

function formatTimer(seconds: number) {
  return `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
}

const timerBurstParticles = [
  { dx: -14, dy: -12, rotate: -35, delay: 0, ray: true },
  { dx: -8, dy: -18, rotate: -12, delay: 0.04, ray: false },
  { dx: 2, dy: -21, rotate: 8, delay: 0.08, ray: true },
  { dx: 14, dy: -14, rotate: 32, delay: 0.02, ray: false },
  { dx: 19, dy: -3, rotate: 72, delay: 0.1, ray: true },
  { dx: 13, dy: 9, rotate: 128, delay: 0.06, ray: false },
  { dx: -3, dy: 15, rotate: 170, delay: 0.12, ray: true },
  { dx: -17, dy: 7, rotate: 214, delay: 0.03, ray: false },
] as const;

export default function WindowsTaskbar({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [panel, setPanel] = useState<Panel>(null);
  const [query, setQuery] = useState("");
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [volume, setVolume] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [timerMinutes, setTimerMinutes] = useState(5);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRemaining, setTimerRemaining] = useState(300);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerComplete, setTimerComplete] = useState(false);
  const [currentTime, setCurrentTime] = useState("—");
  const [windowApp, setWindowApp] = useState<string | null>(null);
  const [windowMaximized, setWindowMaximized] = useState(false);
  const [calendarDate] = useState(() => new Date());
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const appWindowRef = useRef<HTMLDivElement>(null);
  const appTriggerRef = useRef<HTMLButtonElement>(null);
  const railWrapperRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLButtonElement>(null);
  const [clockCenter, setClockCenter] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const calendarDays = useMemo(
    () => createCalendarDays(calendarDate),
    [calendarDate],
  );
  const today = new Date();

  function togglePanel(nextPanel: PanelName, trigger: HTMLButtonElement) {
    if (panel === nextPanel) {
      closePanel();
      return;
    }
    triggerRef.current = trigger;
    setWindowApp(null);
    setPanel(nextPanel);
  }

  function closePanel() {
    const trigger = triggerRef.current;
    setPanel(null);
    window.requestAnimationFrame(() => trigger?.focus());
  }

  function openAppWindow(label: string, trigger: HTMLButtonElement) {
    appTriggerRef.current = trigger;
    setPanel(null);
    setWindowMaximized(false);
    setWindowApp(label);
  }

  function closeAppWindow() {
    const trigger = appTriggerRef.current;
    setWindowApp(null);
    setWindowMaximized(false);
    window.requestAnimationFrame(() => trigger?.focus());
  }

  function focusActivePanel() {
    if (!panel) return;
    if (panel === "search") {
      searchRef.current?.focus();
      return;
    }
    const panelIds: Record<Exclude<Panel, "search" | null>, string> = {
      launcher: "windows-launcher",
      quick: "windows-quick-settings",
      notifications: "windows-notifications",
      timer: "windows-timer",
    };
    if (panelRef.current?.id === panelIds[panel]) panelRef.current.focus();
  }

  useEffect(() => {
    if (!panel) return;
    const frame = window.requestAnimationFrame(focusActivePanel);
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") closePanel();
    }
    function closeOnOutside(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node))
        closePanel();
    }
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutside);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutside);
    };
  }, [panel]);

  useEffect(() => {
    if (!windowApp) return;
    const frame = window.requestAnimationFrame(() =>
      appWindowRef.current?.focus(),
    );
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") closeAppWindow();
    }
    function closeOnOutside(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node))
        closeAppWindow();
    }
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutside);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutside);
    };
  }, [windowApp]);

  useEffect(() => {
    if (!timerRunning) return;
    const interval = window.setInterval(
      () => setTimerRemaining((remaining) => Math.max(remaining - 1, 0)),
      1_000,
    );
    return () => window.clearInterval(interval);
  }, [timerRunning]);

  useEffect(() => {
    if (!timerRunning || timerRemaining !== 0) return;
    setTimerRunning(false);
    setTimerComplete(true);
  }, [timerRemaining, timerRunning]);

  useEffect(() => {
    if (!timerComplete) return;
    const timeout = window.setTimeout(() => setTimerComplete(false), 4_600);
    return () => window.clearTimeout(timeout);
  }, [timerComplete]);

  useEffect(() => {
    const updateClock = () =>
      setCurrentTime(
        new Intl.DateTimeFormat(undefined, {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(new Date()),
      );
    updateClock();
    const interval = window.setInterval(updateClock, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const wrapper = railWrapperRef.current;
    const rail = railRef.current;
    const clock = clockRef.current;
    if (!wrapper || !rail || !clock) return;
    const updateClockPosition = () => {
      const wrapperRect = wrapper.getBoundingClientRect();
      const clockRect = clock.getBoundingClientRect();
      setClockCenter(clockRect.left - wrapperRect.left + clockRect.width / 2);
    };
    updateClockPosition();
    const observer = new ResizeObserver(updateClockPosition);
    observer.observe(wrapper);
    observer.observe(clock);
    rail.addEventListener("scroll", updateClockPosition, { passive: true });
    window.addEventListener("resize", updateClockPosition);
    return () => {
      observer.disconnect();
      rail.removeEventListener("scroll", updateClockPosition);
      window.removeEventListener("resize", updateClockPosition);
    };
  }, [currentTime]);

  const activeApp = windowApp
    ? apps.find(([label]) => label === windowApp)
    : null;

  function setTimerPreset(minutes: number) {
    setTimerComplete(false);
    setTimerMinutes(minutes);
    setTimerSeconds(0);
    setTimerRemaining(minutes * 60);
    setTimerRunning(false);
  }

  function resetTimer() {
    setTimerComplete(false);
    setTimerRemaining(timerMinutes * 60 + timerSeconds);
    setTimerRunning(false);
  }

  function updateTimerMinutes(value: string) {
    setTimerComplete(false);
    const minutes = Math.max(0, Math.min(99, Number(value) || 0));
    setTimerMinutes(minutes);
    if (!timerRunning) setTimerRemaining(minutes * 60 + timerSeconds);
  }

  function updateTimerSeconds(value: string) {
    setTimerComplete(false);
    const seconds = Math.max(0, Math.min(59, Number(value) || 0));
    setTimerSeconds(seconds);
    if (!timerRunning) setTimerRemaining(timerMinutes * 60 + seconds);
  }

  return (
    <div
      ref={rootRef}
      className={`relative flex min-w-0 w-full flex-col items-center justify-end gap-3 px-3 py-8 pb-5 sm:px-6 sm:py-12 sm:pb-8 ${compact ? "h-[250px] min-h-0" : "h-full min-h-[360px] sm:min-h-[460px]"}`}
    >
      <AnimatePresence initial={false} mode="wait">
        {panel && (
          <motion.div
            key={panel}
            initial={
              reducedMotion ? { opacity: 1 } : { opacity: 0, scaleY: 0.82 }
            }
            animate={{ opacity: 1, scaleY: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scaleY: 0.82 }}
            onAnimationComplete={focusActivePanel}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 420, damping: 30 }
            }
            style={{ transformOrigin: "bottom center" }}
            className={`pointer-events-auto absolute inset-x-0 bottom-[84px] z-20 flex w-full min-w-0 sm:bottom-[96px] ${panel === "quick" || panel === "notifications" ? "justify-end" : "justify-center"}`}
          >
            <TaskbarPanel
              panel={panel}
              panelRef={panelRef}
              query={query}
              setQuery={setQuery}
              searchRef={searchRef}
              close={closePanel}
              wifi={wifi}
              bluetooth={bluetooth}
              volume={volume}
              notifications={notifications}
              setWifi={setWifi}
              setBluetooth={setBluetooth}
              setVolume={setVolume}
              setNotifications={setNotifications}
              calendarDate={calendarDate}
              calendarDays={calendarDays}
              today={today}
              timerMinutes={timerMinutes}
              timerSeconds={timerSeconds}
              timerRemaining={timerRemaining}
              timerRunning={timerRunning}
              updateTimerMinutes={updateTimerMinutes}
              updateTimerSeconds={updateTimerSeconds}
              setTimerPreset={setTimerPreset}
              toggleTimer={() => setTimerRunning((running) => !running)}
              resetTimer={resetTimer}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {activeApp && (
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
                : { type: "spring", stiffness: 360, damping: 28 }
            }
            className="pointer-events-none absolute inset-x-0 bottom-[84px] z-20 flex w-full min-w-0 justify-center px-3 sm:bottom-[96px] sm:px-6"
          >
            <button
              type="button"
              aria-label={`Close ${activeApp[0]} window`}
              onClick={closeAppWindow}
              className="pointer-events-auto absolute inset-0 z-0 cursor-default bg-transparent"
            />
            <TaskbarAppWindow
              app={activeApp}
              maximized={windowMaximized}
              windowRef={appWindowRef}
              close={closeAppWindow}
              toggleMaximize={() =>
                setWindowMaximized((maximized) => !maximized)
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div ref={railWrapperRef} className="relative isolate max-w-full overflow-visible">
        <div ref={railRef} className="flex w-max min-w-0 max-w-full items-center gap-3 overflow-x-auto rounded-2xl border border-[color-mix(in_srgb,var(--color-fg)_14%,transparent)] bg-[color-mix(in_srgb,var(--color-bg)_70%,var(--color-fg)_10%)] px-2 py-2 text-fg shadow-[0_16px_45px_color-mix(in_srgb,var(--color-fg)_20%,transparent)] backdrop-blur-xl sm:gap-4 sm:px-3">
          <button
            type="button"
            aria-label="Open launcher"
            aria-expanded={panel === "launcher"}
            aria-controls="windows-launcher"
            onClick={(event) => togglePanel("launcher", event.currentTarget)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[var(--color-accent-primary)] text-black transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
          >
            <span className="grid grid-cols-2 gap-0.5">
              {Array.from({ length: 4 }, (_, index) => (
                <span
                  key={index}
                  className="h-1.5 w-1.5 rounded-[1px] bg-current"
                />
              ))}
            </span>
          </button>
          <button
            type="button"
            aria-label="Search"
            aria-expanded={panel === "search"}
            aria-controls="windows-search"
            onClick={(event) => togglePanel("search", event.currentTarget)}
            className="flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-xl border border-[color-mix(in_srgb,var(--color-fg)_14%,transparent)] bg-[color-mix(in_srgb,var(--color-bg)_50%,var(--color-fg)_7%)] text-[10px] text-fg-muted transition-colors hover:bg-[color-mix(in_srgb,var(--color-fg)_10%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] sm:w-[150px] sm:justify-start sm:px-3"
          >
            <Search className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">Search</span>
            <span className="ml-auto hidden rounded border border-[color-mix(in_srgb,var(--color-fg)_14%,transparent)] px-1 text-[8px] sm:inline">
              ⌘K
            </span>
          </button>
          <div
            className="flex shrink-0 items-center gap-2 sm:gap-3"
            aria-label="Pinned applications"
          >
            {apps.map(([label, Icon], index) => (
              <button
                type="button"
                key={label}
                aria-label={label}
                onClick={(event) => openAppWindow(label, event.currentTarget)}
                className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-xl text-fg/75 transition-colors hover:bg-[color-mix(in_srgb,var(--color-fg)_10%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] ${index === 1 ? "after:absolute after:bottom-[-5px] after:h-0.5 after:w-4 after:rounded-full after:bg-[var(--color-accent-primary)]" : ""}`}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            ))}
          </div>
          <div className="ml-auto hidden shrink-0 items-center gap-2 border-l border-[color-mix(in_srgb,var(--color-fg)_14%,transparent)] pl-3 sm:flex">
            <TrayButton
              label="Wi-Fi"
              active={wifi}
              expanded={panel === "quick"}
              controls="windows-quick-settings"
              icon={<Wifi className="h-3.5 w-3.5" />}
              onClick={(event) => togglePanel("quick", event.currentTarget)}
            />
            <TrayButton
              label="Bluetooth"
              active={bluetooth}
              expanded={panel === "quick"}
              controls="windows-quick-settings"
              icon={<Bluetooth className="h-3.5 w-3.5" />}
              onClick={(event) => togglePanel("quick", event.currentTarget)}
            />
            <TrayButton
              label="Volume"
              active={volume}
              expanded={panel === "quick"}
              controls="windows-quick-settings"
              icon={<Volume2 className="h-3.5 w-3.5" />}
              onClick={(event) => togglePanel("quick", event.currentTarget)}
            />
            <TrayButton
              label="Notifications"
              active={notifications}
              expanded={panel === "notifications"}
              controls="windows-notifications"
              icon={<Bell className="h-3.5 w-3.5" />}
              onClick={(event) =>
                togglePanel("notifications", event.currentTarget)
              }
            />
            <span className="relative ml-1 inline-flex">
              <button
                type="button"
                ref={clockRef}
                aria-label="Open timer"
                aria-expanded={panel === "timer"}
                aria-controls="windows-timer"
                onClick={(event) => togglePanel("timer", event.currentTarget)}
                className="rounded-md px-1.5 py-1 text-xs tabular-nums text-fg-muted transition-colors sm:text-sm hover:bg-[color-mix(in_srgb,var(--color-fg)_10%,transparent)] hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
              >
                {currentTime}
              </button>
            </span>
          </div>
        </div>
        <AnimatePresence initial={false}>
          {timerComplete && clockCenter !== null && (
            <span className="pointer-events-none absolute bottom-full z-40 mb-1 flex h-7 w-7 items-center justify-center" style={{ left: clockCenter ?? 0, transform: "translateX(-50%)" }}>
              <motion.div
                role="status"
                aria-live="polite"
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 4, scale: 0.82 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.9 }}
                transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 24 }}
                className="h-7 w-7 text-[var(--color-accent-primary)]"
              >
                {Array.from({ length: reducedMotion ? 1 : 4 }, (_, burstIndex) => (
                  <span key={burstIndex} aria-hidden="true" className="absolute inset-0">
                    {timerBurstParticles.map((particle, index) => (
                      <motion.span
                        key={`${burstIndex}-${index}`}
                        initial={reducedMotion ? { opacity: 0.8, x: particle.dx, y: particle.dy } : { opacity: 0, x: 0, y: 0, scale: 0.4 }}
                        animate={reducedMotion ? { opacity: 0.8, x: particle.dx, y: particle.dy } : { opacity: [0, 1, 0], x: [0, particle.dx], y: [0, particle.dy], scale: [0.4, 1.12, 0.7] }}
                        transition={reducedMotion ? { duration: 0 } : { duration: 0.75, delay: burstIndex * 0.85 + particle.delay, ease: "easeOut" }}
                        style={{ rotate: particle.rotate }}
                        className={`absolute left-1/2 top-1/2 origin-left rounded-full bg-current ${particle.ray ? "h-px w-3" : "h-1.5 w-1.5"}`}
                      />
                    ))}
                  </span>
                ))}
                <span className="sr-only">Timer complete. Your timer reached zero.</span>
              </motion.div>
            </span>
          )}
        </AnimatePresence>
        </div>
      </div>
  );
}

function TrayButton({
  label,
  active,
  expanded,
  controls,
  icon,
  onClick,
}: {
  label: string;
  active: boolean;
  expanded: boolean;
  controls: string;
  icon: ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type="button"
      aria-label={`${label}: ${active ? "on" : "off"}`}
      aria-expanded={expanded}
      aria-controls={controls}
      onClick={onClick}
      className={`rounded-md p-1.5 text-fg-muted transition-colors hover:bg-[color-mix(in_srgb,var(--color-fg)_10%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] ${active ? "text-fg/75" : "text-fg/35"}`}
    >
      {icon}
    </button>
  );
}

function TaskbarAppWindow({
  app,
  maximized,
  windowRef,
  close,
  toggleMaximize,
}: {
  app: TaskbarApp;
  maximized: boolean;
  windowRef: RefObject<HTMLDivElement | null>;
  close: () => void;
  toggleMaximize: () => void;
}) {
  const [label, Icon] = app;
  return (
    <div
      ref={windowRef}
      role="dialog"
      aria-modal="false"
      aria-label={`${label} window`}
      tabIndex={-1}
      className={`pointer-events-auto relative z-10 flex max-h-[min(72vh,430px)] min-h-[170px] max-w-full flex-col overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--color-fg)_16%,transparent)] bg-[color-mix(in_srgb,var(--color-bg)_92%,var(--color-fg)_8%)] text-fg backdrop-blur-xl ${maximized ? "w-[min(100%,680px)]" : "w-[min(100%,560px)]"}`}
    >
      <div className="relative flex h-10 shrink-0 items-center justify-center border-b border-[color-mix(in_srgb,var(--color-fg)_12%,transparent)] px-24">
        <span className="truncate text-xs font-medium">{label}</span>
        <div className="absolute right-3 flex items-center gap-1">
          <button
            type="button"
            aria-label={`Minimize ${label}`}
            onClick={close}
            className="grid h-6 w-6 place-items-center rounded-md text-fg-muted transition-colors hover:bg-[color-mix(in_srgb,var(--color-fg)_10%,transparent)] hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
          >
            −
          </button>
          <button
            type="button"
            aria-label={`${maximized ? "Restore" : "Maximize"} ${label}`}
            onClick={toggleMaximize}
            className="grid h-6 w-6 place-items-center rounded-md text-fg-muted transition-colors hover:bg-[color-mix(in_srgb,var(--color-fg)_10%,transparent)] hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
          >
            □
          </button>
          <button
            type="button"
            aria-label={`Close ${label}`}
            onClick={close}
            className="grid h-6 w-6 place-items-center rounded-md text-fg-muted transition-colors hover:bg-red-500/15 hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 overflow-y-auto p-6 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[color-mix(in_srgb,var(--color-fg)_7%,transparent)] text-[var(--color-accent-primary)]">
          <Icon className="h-7 w-7" />
        </span>
        <p className="text-sm font-semibold">{label}</p>
        <p className="max-w-[340px] text-[11px] leading-relaxed text-fg-muted">
          A focused workspace for your content, ready inside the Aura taskbar.
        </p>
      </div>
    </div>
  );
}

function TaskbarPanel({
  panel,
  panelRef,
  query,
  setQuery,
  searchRef,
  close,
  wifi,
  bluetooth,
  volume,
  notifications,
  setWifi,
  setBluetooth,
  setVolume,
  setNotifications,
  calendarDate,
  calendarDays,
  today,
  timerMinutes,
  timerSeconds,
  timerRemaining,
  timerRunning,
  updateTimerMinutes,
  updateTimerSeconds,
  setTimerPreset,
  toggleTimer,
  resetTimer,
}: {
  panel: PanelName;
  panelRef: RefObject<HTMLDivElement | null>;
  query: string;
  setQuery: (value: string) => void;
  searchRef: RefObject<HTMLInputElement | null>;
  close: () => void;
  wifi: boolean;
  bluetooth: boolean;
  volume: boolean;
  notifications: boolean;
  setWifi: (value: boolean) => void;
  setBluetooth: (value: boolean) => void;
  setVolume: (value: boolean) => void;
  setNotifications: (value: boolean) => void;
  calendarDate: Date;
  calendarDays: (number | null)[];
  today: Date;
  timerMinutes: number;
  timerSeconds: number;
  timerRemaining: number;
  timerRunning: boolean;
  updateTimerMinutes: (value: string) => void;
  updateTimerSeconds: (value: string) => void;
  setTimerPreset: (minutes: number) => void;
  toggleTimer: () => void;
  resetTimer: () => void;
}) {
  const panelClass =
    "relative z-20 mx-auto mb-3 text-fg shadow-[0_24px_70px_color-mix(in_srgb,var(--color-fg)_22%,transparent)] backdrop-blur-xl";
  const surfaceClass =
    "border-[color-mix(in_srgb,var(--color-fg)_15%,transparent)] bg-[color-mix(in_srgb,var(--color-bg)_92%,var(--color-fg)_8%)]";
  if (panel === "search")
    return (
      <div
        ref={panelRef}
        id="windows-search"
        role="dialog"
        aria-label="Search"
        tabIndex={-1}
        className={`${panelClass} ${surfaceClass} w-[min(320px,calc(100%_-_1.5rem))] rounded-2xl border p-3`}
      >
        <div className="flex items-center gap-2 rounded-xl border border-[color-mix(in_srgb,var(--color-fg)_14%,transparent)] bg-[color-mix(in_srgb,var(--color-bg)_55%,var(--color-fg)_8%)] px-3">
          <Search className="h-4 w-4 text-fg-muted" />
          <input
            ref={searchRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search apps and files"
            className="min-w-0 flex-1 bg-transparent py-2.5 text-xs text-fg outline-none placeholder:text-fg-muted"
          />
          <button
            type="button"
            aria-label="Close search"
            onClick={close}
            className="text-fg-muted hover:text-fg"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
        <p className="mt-4 text-[10px] uppercase tracking-[0.14em] text-fg-muted">
          {query ? "Results" : "Suggested"}
        </p>
        <p className="mt-3 rounded-xl bg-[color-mix(in_srgb,var(--color-fg)_7%,transparent)] p-3 text-xs text-fg-muted">
          {query
            ? `No results for “${query}”`
            : "Type to search apps, settings, and files."}
        </p>
      </div>
    );
  if (panel === "launcher")
    return (
      <div
        ref={panelRef}
        id="windows-launcher"
        role="dialog"
        aria-label="Application launcher"
        tabIndex={-1}
        className={`${panelClass} ${surfaceClass} w-[min(330px,calc(100%_-_1.5rem))] rounded-2xl border p-4`}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-fg">All apps</span>
          <button
            type="button"
            aria-label="Close launcher"
            onClick={close}
            className="text-fg-muted hover:text-fg"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {apps.map(([label, Icon]) => (
            <button
              type="button"
              key={label}
              onClick={close}
              className="flex items-center gap-2 rounded-xl bg-[color-mix(in_srgb,var(--color-fg)_7%,transparent)] p-3 text-left text-xs text-fg/75 transition-colors hover:bg-[color-mix(in_srgb,var(--color-fg)_12%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
            >
              <Icon className="h-4 w-4 text-[var(--color-accent-primary)]" />
              {label}
            </button>
          ))}
        </div>
      </div>
    );
  if (panel === "quick")
    return (
      <div
        ref={panelRef}
        id="windows-quick-settings"
        role="dialog"
        aria-label="Quick settings"
        tabIndex={-1}
        className={`${panelClass} ${surfaceClass} self-end w-[min(300px,calc(100%_-_1.5rem))] rounded-2xl border p-4`}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-fg">Quick settings</span>
          <button
            type="button"
            aria-label="Close quick settings"
            onClick={close}
            className="text-fg-muted hover:text-fg"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <SettingButton
            label="Wi-Fi"
            active={wifi}
            icon={<Wifi />}
            onClick={() => setWifi(!wifi)}
          />
          <SettingButton
            label="Bluetooth"
            active={bluetooth}
            icon={<Bluetooth />}
            onClick={() => setBluetooth(!bluetooth)}
          />
          <SettingButton
            label="Volume"
            active={volume}
            icon={<Volume2 />}
            onClick={() => setVolume(!volume)}
          />
          <SettingButton
            label="Notifications"
            active={notifications}
            icon={<Bell />}
            onClick={() => setNotifications(!notifications)}
          />
        </div>
      </div>
    );
  if (panel === "timer")
    return (
      <div
        ref={panelRef}
        id="windows-timer"
        role="dialog"
        aria-label="Timer"
        tabIndex={-1}
        className={`${panelClass} ${surfaceClass} w-[min(340px,calc(100%_-_1.5rem))] rounded-2xl border p-4`}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-fg">Timer</span>
          <button
            type="button"
            aria-label="Close timer"
            onClick={close}
            className="text-fg-muted hover:text-fg"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mb-4 flex items-end justify-center gap-2">
          <label className="flex flex-col items-center gap-1 text-[9px] text-fg-muted">
            <span>Minutes</span>
            <input
              type="number"
              min="0"
              max="99"
              value={timerMinutes}
              onChange={(event) => updateTimerMinutes(event.target.value)}
              aria-label="Timer minutes"
              className="h-9 w-16 rounded-lg border border-[color-mix(in_srgb,var(--color-fg)_14%,transparent)] bg-[color-mix(in_srgb,var(--color-fg)_6%,transparent)] text-center text-sm text-fg outline-none focus:border-[var(--color-accent-primary)]"
            />
          </label>
          <span className="pb-2 text-fg-muted">:</span>
          <label className="flex flex-col items-center gap-1 text-[9px] text-fg-muted">
            <span>Seconds</span>
            <input
              type="number"
              min="0"
              max="59"
              value={timerSeconds}
              onChange={(event) => updateTimerSeconds(event.target.value)}
              aria-label="Timer seconds"
              className="h-9 w-16 rounded-lg border border-[color-mix(in_srgb,var(--color-fg)_14%,transparent)] bg-[color-mix(in_srgb,var(--color-fg)_6%,transparent)] text-center text-sm text-fg outline-none focus:border-[var(--color-accent-primary)]"
            />
          </label>
        </div>
        <div className="mb-4 grid grid-cols-3 gap-2">
          {[1, 5, 10].map((minutes) => (
            <button
              type="button"
              key={minutes}
              onClick={() => setTimerPreset(minutes)}
              className="rounded-lg bg-[color-mix(in_srgb,var(--color-fg)_7%,transparent)] px-2 py-2 text-[10px] text-fg-muted transition-colors hover:bg-[color-mix(in_srgb,var(--color-fg)_12%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
            >
              {minutes} min
            </button>
          ))}
        </div>
        <div
          className="mb-4 text-center text-4xl font-semibold tabular-nums tracking-tight text-fg"
          aria-live="polite"
        >
          {formatTimer(timerRemaining)}
        </div>
        <div className="flex justify-center gap-2">
          <button
            type="button"
            onClick={toggleTimer}
            disabled={timerRemaining === 0 && !timerRunning}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-accent-primary)] px-4 py-2 text-xs font-medium text-black disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
          >
            {timerRunning ? (
              <Pause className="h-3.5 w-3.5" />
            ) : (
              <Play className="h-3.5 w-3.5" />
            )}
            {timerRunning ? "Pause" : "Start"}
          </button>
          <button
            type="button"
            onClick={resetTimer}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[color-mix(in_srgb,var(--color-fg)_7%,transparent)] px-4 py-2 text-xs text-fg-muted hover:bg-[color-mix(in_srgb,var(--color-fg)_12%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>
      </div>
    );
  return (
    <div
      ref={panelRef}
      id="windows-notifications"
      role="dialog"
      aria-label="Notifications and calendar"
      tabIndex={-1}
      className={`${panelClass} ${surfaceClass} max-h-[min(430px,calc(100vh_-_2rem))] w-[min(560px,calc(100%_-_1.5rem))] overflow-y-auto rounded-2xl border p-4`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-fg">Notifications</span>
          <p className="mt-1 text-[10px] text-fg-muted">Stay up to date</p>
        </div>
        <button
          type="button"
          aria-label="Close notifications"
          onClick={close}
          className="text-fg-muted hover:text-fg"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-2">
          <NotificationRow
            icon={<MessageSquare />}
            title="New message from Maya"
            detail="The launch notes look great."
            time="9:41 AM"
          />
          <NotificationRow
            icon={<ShieldCheck />}
            title="Security check complete"
            detail="Your device is protected."
            time="8:20 AM"
          />
          <NotificationRow
            icon={<CalendarDays />}
            title="Design review starts soon"
            detail="Today · 2:00 PM"
            time="Yesterday"
          />
        </div>
        <div className="rounded-xl bg-[color-mix(in_srgb,var(--color-fg)_6%,transparent)] p-3">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-fg">
              {monthNames[calendarDate.getMonth()]} {calendarDate.getFullYear()}
            </span>
            <CalendarDays className="h-3.5 w-3.5 text-[var(--color-accent-primary)]" />
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[9px] text-fg-muted">
            {weekdayLabels.map((day, index) => (
              <span key={`${day}-${index}`} className="py-1 font-medium">
                {day}
              </span>
            ))}
            {calendarDays.map((day, index) => {
              const isToday =
                day === today.getDate() &&
                calendarDate.getMonth() === today.getMonth() &&
                calendarDate.getFullYear() === today.getFullYear();
              return (
                <span
                  key={day === null ? `empty-${index}` : day}
                  className={`grid aspect-square place-items-center rounded-md text-[10px] ${isToday ? "bg-[var(--color-accent-primary)] font-semibold text-black" : day ? "text-fg/75" : "text-transparent"}`}
                >
                  {day ?? "·"}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationRow({
  icon,
  title,
  detail,
  time,
}: {
  icon: ReactNode;
  title: string;
  detail: string;
  time: string;
}) {
  return (
    <div className="flex gap-3 rounded-xl bg-[color-mix(in_srgb,var(--color-fg)_6%,transparent)] p-3">
      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[color-mix(in_srgb,var(--color-accent-primary)_20%,transparent)] text-[var(--color-accent-primary)]">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[11px] font-medium text-fg">{title}</p>
          <span className="shrink-0 text-[9px] text-fg-muted">{time}</span>
        </div>
        <p className="mt-1 text-[10px] leading-relaxed text-fg-muted">
          {detail}
        </p>
      </div>
    </div>
  );
}

function SettingButton({
  label,
  active,
  icon,
  onClick,
}: {
  label: string;
  active: boolean;
  icon: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl p-3 text-xs transition-colors ${active ? "bg-[var(--color-accent-primary)] text-black" : "bg-[color-mix(in_srgb,var(--color-fg)_7%,transparent)] text-fg-muted"}`}
    >
      {icon}
      <span>{label}</span>
      <span className="ml-auto text-[9px]">{active ? "On" : "Off"}</span>
    </button>
  );
}
