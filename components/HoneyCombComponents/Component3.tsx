import React from "react";
import { ArrowRight } from "lucide-react";

const Components3 = () => {
  return (
    <div className="flex items-center justify-center p-4 min-h-screen font-sans">
      <div className="relative w-[260px] p-5">
        <div className="text-center mb-4">
          <h2 className="text-fg text-base font-semibold tracking-tight">Card</h2>
          <p className="text-fg/55 text-[10px] mt-0.5">Beautiful container</p>
        </div>

        <div
          className="rounded-2xl p-4"
          style={{
            border:
              "1px solid color-mix(in srgb, var(--color-accent-primary) 25%, transparent)",
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-black text-[12px] font-bold"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary), var(--color-accent-tertiary))",
              }}
            >
              SD
            </div>
            <div>
              <p className="text-fg text-[12px] font-semibold leading-tight">
                Sofia Davis
              </p>
              <p className="text-fg/55 text-[10px]">Product Designer</p>
            </div>
          </div>

          <button
            className="w-full h-9 rounded-xl text-[12px] font-medium flex items-center justify-center gap-1.5 transition"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--color-accent-primary) 15%, transparent)",
              border:
                "1px solid color-mix(in srgb, var(--color-accent-primary) 40%, transparent)",
              color: "var(--color-accent-primary)",
            }}
          >
            View Profile
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Components3;
