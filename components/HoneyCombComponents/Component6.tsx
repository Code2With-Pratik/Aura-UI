import React from "react";
import { Zap, Sparkles, Star, CheckCircle2 } from "lucide-react";

const Components6 = () => {
  return (
    <div className="flex items-center justify-center p-4 min-h-screen font-sans">
      <div className="relative w-[260px] p-5">
        <div className="text-center mb-4">
          <h2 className="text-fg text-base font-semibold tracking-tight">Badge</h2>
          <p className="text-fg/55 text-[10px] mt-0.5">Status indicators</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <Badge icon={<Zap size={10} />} label="New" accent="primary" />
          <Badge
            icon={<Sparkles size={10} />}
            label="Popular"
            accent="secondary"
          />
          <Badge
            icon={<Star size={10} />}
            label="Premium"
            accent="tertiary"
          />
          <Badge
            icon={<CheckCircle2 size={10} />}
            label="Success"
            accent="primary"
          />
        </div>
      </div>
    </div>
  );
};

function Badge({
  icon,
  label,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  accent: "primary" | "secondary" | "tertiary";
}) {
  const color = `var(--color-accent-${accent})`;
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border"
      style={{
        backgroundColor: `color-mix(in srgb, ${color} 18%, transparent)`,
        borderColor: `color-mix(in srgb, ${color} 50%, transparent)`,
        color,
      }}
    >
      {icon}
      {label}
    </span>
  );
}

export default Components6;
