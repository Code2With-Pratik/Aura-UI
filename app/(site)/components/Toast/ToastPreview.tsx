"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Bell,
  Check,
  CheckCircle2,
  Clock3,
  Info,
  Loader2,
  RotateCcw,
  Sparkles,
  Upload,
  X,
  Zap,
} from "lucide-react";

type ToastVariant =
  | "success"
  | "stack"
  | "action"
  | "progress"
  | "rich"
  | "mobile"
  | "neon"
  | "announcement"
  | "celebration"
  | "command";

function ExtraVariants({
  variant,
  visible,
  setVisible,
  extraAction,
  setExtraAction,
}: {
  variant: ToastVariant;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  extraAction: boolean;
  setExtraAction: (active: boolean) => void;
}) {
  if (!visible)
    return (
      <Shell>
        <motion.button
          type="button"
          onClick={() => setVisible(true)}
          initial={{ opacity: 0, scale: 0.78 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 360, damping: 18 }}
          className="rounded-full border border-border-default px-3 py-1.5 text-xs text-fg-muted hover:text-fg"
        >
          Show toast
        </motion.button>
      </Shell>
    );
  if (variant === "neon")
    return (
      <Shell>
        <motion.div
          initial={{ opacity: 0, scale: 0.7, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="flex w-full max-w-[350px] items-center gap-3 rounded-2xl border border-fuchsia-400/50 bg-[#190b24] p-3 text-white shadow-[0_0_28px_rgba(217,70,239,.35)]"
        >
          <motion.button
            type="button"
            aria-label="Toggle live mode"
            onClick={() => setExtraAction(!extraAction)}
            animate={{ scale: extraAction ? 1 : [1, 1.25, 1] }}
            transition={
              extraAction
                ? { type: "spring", stiffness: 300 }
                : { repeat: Infinity, duration: 1.8 }
            }
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-fuchsia-400/20 text-fuchsia-300"
          >
            <Zap className="h-4 w-4" />
          </motion.button>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">
              {extraAction ? "Live mode paused" : "Live mode enabled"}
            </p>
            <p className="mt-0.5 text-xs text-fuchsia-100/60">
              {extraAction
                ? "Resume realtime updates anytime."
                : "Realtime updates are active."}
            </p>
          </div>
          <Close onClick={() => setVisible(false)} />
        </motion.div>
      </Shell>
    );
  if (variant === "announcement")
    return (
      <Shell>
        <motion.div
          initial={{ opacity: 0, y: -28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 20 }}
          className="flex w-full max-w-[440px] items-center gap-3 rounded-full border border-accent-primary/30 bg-accent-primary/10 px-4 py-2.5 text-fg shadow-lg"
        >
          <Bell className="h-4 w-4 shrink-0 text-accent-primary" />
          <p className="min-w-0 flex-1 truncate text-xs font-medium">
            {extraAction
              ? "Features opened in your workspace"
              : "New workspace features are available"}
          </p>
          <button
            type="button"
            onClick={() => setExtraAction(!extraAction)}
            className="shrink-0 text-xs font-semibold text-accent-primary hover:underline"
          >
            {extraAction ? "Done" : "Explore"}
          </button>
          <Close onClick={() => setVisible(false)} />
        </motion.div>
      </Shell>
    );
  if (variant === "celebration")
    return (
      <Shell>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.75 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 340, damping: 16 }}
          className="relative flex w-full max-w-[360px] items-center gap-3 overflow-hidden rounded-2xl border border-amber-300/30 bg-gradient-to-r from-amber-400/20 to-pink-400/20 p-4 text-fg shadow-xl"
        >
          <motion.div
            animate={{ rotate: extraAction ? 360 : [0, 12, -12, 0] }}
            transition={
              extraAction
                ? { duration: 0.5 }
                : { repeat: Infinity, duration: 2.4 }
            }
          >
            <Sparkles className="h-5 w-5 text-amber-300" />
          </motion.div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">
              {extraAction ? "Launch details unlocked" : "You shipped it!"}
            </p>
            <p className="mt-0.5 text-xs text-fg-muted">
              {extraAction
                ? "Your project is ready to share."
                : "Your project is now live."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setExtraAction(!extraAction)}
            className="shrink-0 text-xs font-medium text-amber-300 hover:underline"
          >
            {extraAction ? "Close" : "View"}
          </button>
          <Close onClick={() => setVisible(false)} />
        </motion.div>
      </Shell>
    );
  if (variant === "command")
    return (
      <Shell>
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 410, damping: 24 }}
          className="flex w-full max-w-[390px] items-center gap-3 rounded-xl border border-border-default bg-[var(--color-surface)] p-3 shadow-2xl"
        >
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-fg/10">
            <span className="font-mono text-sm text-fg">⌘</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-fg-muted">
              {extraAction ? "Command copied" : "Command completed"}
            </p>
            <p className="mt-0.5 truncate font-mono text-[11px] text-fg">
              deploy --production
            </p>
          </div>
          <button
            type="button"
            onClick={() => setExtraAction(!extraAction)}
            className="rounded-md border border-border-default px-2 py-1 text-[10px] text-fg-muted hover:text-fg"
          >
            {extraAction ? "Copied" : "Copy"}
          </button>
          <button
            type="button"
            aria-label="Mark command complete"
            onClick={() => setExtraAction(true)}
            className="rounded-full p-1 text-lime-400 transition hover:bg-lime-400/10"
          >
            <Check className="h-4 w-4" />
          </button>
          <Close onClick={() => setVisible(false)} />
        </motion.div>
      </Shell>
    );
  return null;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-[220px] w-full items-center justify-center overflow-visible rounded-[14px] border border-border-default p-5">
      {children}
    </div>
  );
}

function Close({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label="Dismiss toast"
      onClick={onClick}
      className="rounded-md p-1 text-fg-muted transition hover:bg-fg/10 hover:text-fg"
    >
      <X className="h-3.5 w-3.5" />
    </button>
  );
}

function Toast({
  children,
  tone = "default",
  onClose,
}: {
  children: React.ReactNode;
  tone?: "default" | "success" | "warning" | "info";
  onClose: () => void;
}) {
  const tones = {
    default: "border-border-default bg-[var(--color-surface)]",
    success: "border-lime-400/30 bg-lime-400/10",
    warning: "border-amber-400/30 bg-amber-400/10",
    info: "border-sky-400/30 bg-sky-400/10",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.86 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 420, damping: 22, mass: 0.7 }}
      className={`flex w-full max-w-[360px] items-start gap-3 rounded-xl border p-3 shadow-xl backdrop-blur-xl ${tones[tone]}`}
    >
      <div className="min-w-0 flex-1">{children}</div>
      <Close onClick={onClose} />
    </motion.div>
  );
}

export default function ToastPreview({ variant }: { variant: ToastVariant }) {
  const [visible, setVisible] = useState(true);
  const [extraAction, setExtraAction] = useState(false);
  const [stackItems, setStackItems] = useState([
    "comment",
    "notifications",
    "activity",
  ]);
  const [progress, setProgress] = useState(68);
  useEffect(() => {
    if (variant !== "progress") return;
    const timer = window.setInterval(
      () => setProgress((value) => (value >= 100 ? 0 : value + 1)),
      80,
    );
    return () => window.clearInterval(timer);
  }, [variant]);
  const extraVariant = ExtraVariants({
    variant,
    visible,
    setVisible,
    extraAction,
    setExtraAction,
  });
  if (extraVariant) return extraVariant;
  if (variant === "stack")
    return (
      <Shell>
        <div className="flex w-full max-w-[360px] flex-col gap-2">
          <AnimatePresence initial={false} mode="popLayout">
            {stackItems.map((item, index) => (
              <motion.div
                key={item}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 28, scale: 0.92 }}
                transition={{
                  type: "spring",
                  stiffness: 430,
                  damping: 28,
                  mass: 0.7,
                }}
                className={index > 0 ? "pl-3" : ""}
              >
                {item === "comment" ? (
                  <Toast
                    tone="info"
                    onClose={() =>
                      setStackItems((items) =>
                        items.filter((value) => value !== item),
                      )
                    }
                  >
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 shrink-0 text-sky-400" />
                      <p className="text-sm font-medium text-fg">
                        New comment on your post
                      </p>
                    </div>
                  </Toast>
                ) : (
                  <div className="flex w-full items-center justify-between gap-3 rounded-xl border border-border-default bg-[var(--color-surface)] p-3 shadow-lg">
                    <p className="text-xs text-fg-muted">
                      {item === "notifications"
                        ? "You have 3 unread notifications"
                        : "Team activity updated"}
                    </p>
                    <Close
                      onClick={() =>
                        setStackItems((items) =>
                          items.filter((value) => value !== item),
                        )
                      }
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {stackItems.length === 0 && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 350, damping: 18 }}
              onClick={() =>
                setStackItems(["comment", "notifications", "activity"])
              }
              className="mx-auto rounded-full border border-border-default px-3 py-1.5 text-xs text-fg-muted hover:text-fg"
            >
              Show notifications
            </motion.button>
          )}
        </div>
      </Shell>
    );
  if (!visible)
    return (
      <Shell>
        <motion.button
          type="button"
          onClick={() => setVisible(true)}
          initial={{ opacity: 0, scale: 0.75, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 360, damping: 18 }}
          className="rounded-full border border-border-default px-3 py-1.5 text-xs text-fg-muted hover:text-fg"
        >
          Show toast
        </motion.button>
      </Shell>
    );
  if (variant === "success")
    return (
      <Shell>
        <Toast tone="success" onClose={() => setVisible(false)}>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-lime-400" />
            <div>
              <p className="text-sm font-medium text-fg">Changes saved</p>
              <p className="mt-0.5 text-xs text-fg-muted">
                Your profile is up to date.
              </p>
            </div>
          </div>
        </Toast>
      </Shell>
    );
  if (variant === "action")
    return (
      <Shell>
        <Toast tone="default" onClose={() => setVisible(false)}>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-amber-400" />
            <div>
              <p className="text-sm font-medium text-fg">File moved to trash</p>
              <button
                type="button"
                onClick={() => setVisible(false)}
                className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-fg underline underline-offset-2 hover:text-fg-muted"
              >
                <RotateCcw className="h-3 w-3" /> Undo
              </button>
            </div>
          </div>
        </Toast>
      </Shell>
    );
  if (variant === "progress")
    return (
      <Shell>
        <Toast tone="info" onClose={() => setVisible(false)}>
          <div className="flex items-start gap-2">
            <Upload className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-fg">Uploading assets</p>
                <span className="text-xs text-fg-muted">{progress}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-fg/10">
                <div
                  className="h-full rounded-full bg-sky-400 transition-[width] duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </Toast>
      </Shell>
    );
  if (variant === "rich")
    return (
      <Shell>
        <Toast tone="default" onClose={() => setVisible(false)}>
          <div className="flex gap-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-primary text-black">
              <Clock3 className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-fg">
                Weekly report is ready
              </p>
              <p className="mt-1 text-xs leading-relaxed text-fg-muted">
                Your team insights are ready to review.
              </p>
              <button
                type="button"
                className="mt-2 text-xs font-medium text-accent-primary hover:underline"
              >
                View report
              </button>
            </div>
          </div>
        </Toast>
      </Shell>
    );
  return (
    <Shell>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.86 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 22, mass: 0.7 }}
        className="absolute bottom-5 left-1/2 flex w-[min(92%,420px)] -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/20 bg-[#101216]/95 px-4 py-3 text-white shadow-2xl backdrop-blur-xl"
      >
        <Check className="h-4 w-4 shrink-0 text-lime-300" />
        <p className="min-w-0 flex-1 truncate text-sm">
          Message sent successfully
        </p>
        <button
          type="button"
          className="text-xs text-white/60 hover:text-white"
        >
          View
        </button>
        <Close onClick={() => setVisible(false)} />
      </motion.div>
    </Shell>
  );
}
