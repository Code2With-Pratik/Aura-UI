import React, { useState } from "react";
import { Volume2, Sun } from "lucide-react";

const Components4 = () => {
  const [volume, setVolume] = useState(75);
  const [brightness, setBrightness] = useState(60);

  return (
    <div className="flex items-center justify-center p-4 min-h-screen font-sans">
      <div className="relative w-[260px] p-5">
        <div className="text-center mb-4">
          <h2 className="text-fg text-base font-semibold tracking-tight">Slider</h2>
          <p className="text-fg/55 text-[10px] mt-0.5">Precision control</p>
        </div>

        <div className="flex flex-col gap-4">
          <SliderRow
            icon={
              <Volume2
                size={14}
                style={{ color: "var(--color-accent-primary)" }}
              />
            }
            label="Volume"
            value={volume}
            onChange={setVolume}
          />
          <SliderRow
            icon={
              <Sun
                size={14}
                style={{ color: "var(--color-accent-primary)" }}
              />
            }
            label="Brightness"
            value={brightness}
            onChange={setBrightness}
          />
        </div>
      </div>
    </div>
  );
};

function SliderRow({
  icon,
  label,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-fg/65 text-[10px] uppercase tracking-wider">
          {label}
        </span>
        <span className="text-fg text-[10px] font-semibold">{value}%</span>
      </div>
      <div className="flex items-center gap-2">
        {icon}
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="aura-slider flex-1 h-1 rounded-full appearance-none cursor-pointer"
          style={{
            background:
              "color-mix(in srgb, var(--color-fg) 15%, transparent)",
          }}
        />
      </div>
      <style>{`
        .aura-slider {
          accent-color: var(--color-accent-primary);
        }
      `}</style>
    </div>
  );
}

export default Components4;
