import React from "react";
import { Mail, Lock } from "lucide-react";

const Components2 = () => {
  return (
    <div className="flex items-center justify-center p-4 min-h-screen font-sans">
      <div className="relative w-[260px] p-5">
        <div className="text-center mb-4">
          <h2 className="text-fg text-base font-semibold tracking-tight">Input</h2>
          <p className="text-fg/55 text-[10px] mt-0.5">Clean and intuitive</p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--color-accent-primary)" }}
              size={14}
            />
            <input
              type="email"
              placeholder="Email"
              defaultValue="hello@aura.ui"
              className="w-full h-9 pl-9 pr-3 rounded-xl bg-transparent text-fg text-[12px] placeholder:text-fg/30 focus:outline-none transition"
              style={{
                border:
                  "1px solid color-mix(in srgb, var(--color-accent-primary) 35%, transparent)",
              }}
            />
          </div>

          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--color-accent-primary)" }}
              size={14}
            />
            <input
              type="password"
              placeholder="Password"
              defaultValue="••••••••"
              className="w-full h-9 pl-9 pr-3 rounded-xl bg-transparent text-fg text-[12px] placeholder:text-fg/30 focus:outline-none transition"
              style={{
                border:
                  "1px solid color-mix(in srgb, var(--color-accent-primary) 35%, transparent)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Components2;
