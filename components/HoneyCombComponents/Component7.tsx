import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

const Components7 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Option Two");

  const options = ["Option One", "Option Two", "Option Three"];

  return (
    <div className="flex items-center justify-center p-4 min-h-screen font-sans">
      <div className="relative w-[260px] p-5">
        <div className="text-center mb-4">
          <h2 className="text-fg text-base font-semibold tracking-tight">Select</h2>
          <p className="text-fg/55 text-[10px] mt-0.5">Custom dropdowns</p>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen((o) => !o)}
            className="w-full h-9 px-3 flex items-center justify-between rounded-xl bg-transparent text-fg text-[12px] transition"
            style={{
              border:
                "1px solid color-mix(in srgb, var(--color-accent-primary) 40%, transparent)",
            }}
          >
            <span>{selected}</span>
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown
                size={14}
                style={{ color: "var(--color-accent-primary)" }}
              />
            </motion.span>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="absolute left-0 right-0 mt-1.5 z-10 rounded-xl overflow-hidden backdrop-blur-md"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--color-fg) 8%, transparent)",
                  border:
                    "1px solid color-mix(in srgb, var(--color-accent-primary) 30%, transparent)",
                }}
              >
                {options.map((opt) => {
                  const isActive = opt === selected;
                  return (
                    <li key={opt}>
                      <button
                        type="button"
                        onClick={() => {
                          setSelected(opt);
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-1.5 text-[12px] transition-colors"
                        style={{
                          color: isActive
                            ? "var(--color-accent-primary)"
                            : "color-mix(in srgb, var(--color-fg) 70%, transparent)",
                        }}
                      >
                        {opt}
                        {isActive && <Check size={12} />}
                      </button>
                    </li>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Components7;
