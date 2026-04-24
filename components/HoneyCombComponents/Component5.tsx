import React, { useState } from "react";

const Components5 = () => {
  const [notifications, setNotifications] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(false);

  return (
    <div className="flex items-center justify-center p-4 min-h-screen font-sans">
      <div className="relative w-[260px] p-5">
        <div className="text-center mb-4">
          <h2 className="text-fg text-base font-semibold tracking-tight">Toggle</h2>
          <p className="text-fg/55 text-[10px] mt-0.5">Interactive controls</p>
        </div>

        <div className="flex flex-col gap-3">
          <ToggleRow
            label="Notifications"
            value={notifications}
            onChange={setNotifications}
          />
          <ToggleRow
            label="Auto update"
            value={autoUpdate}
            onChange={setAutoUpdate}
          />
        </div>
      </div>
    </div>
  );
};

function ToggleRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-fg/85 text-[12px]">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className="relative h-5 w-9 rounded-full transition-colors"
        style={{
          backgroundColor: value
            ? "var(--color-accent-primary)"
            : "color-mix(in srgb, var(--color-fg) 20%, transparent)",
          boxShadow: value
            ? "0 0 12px color-mix(in srgb, var(--color-accent-primary) 50%, transparent)"
            : "none",
        }}
        aria-pressed={value}
      >
        <span
          className="absolute top-[2px] h-[16px] w-[16px] rounded-full transition-all"
          style={{
            left: value ? "20px" : "2px",
            backgroundColor: value ? "#000" : "#fff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
          }}
        />
      </button>
    </div>
  );
}

export default Components5;
