import React from "react";
import { motion } from "framer-motion";
import { Plus, Heart } from "lucide-react";

const Components1 = () => {
  return (
    <div className="flex items-center justify-center p-4 min-h-screen font-sans">
      <div className="relative w-[260px] p-5">
        <div className="text-center mb-4">
          <h2 className="text-fg text-base font-semibold tracking-tight">Button</h2>
          <p className="text-fg/55 text-[10px] mt-0.5">Multiple styles</p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="h-9 rounded-xl text-black text-[12px] font-semibold"
            style={{
              backgroundColor: "var(--color-accent-primary)",
              boxShadow:
                "0 0 14px color-mix(in srgb, var(--color-accent-primary) 45%, transparent)",
            }}
          >
            Primary
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="h-9 rounded-xl text-[12px] font-medium"
            style={{
              backgroundColor: "transparent",
              border:
                "1px solid color-mix(in srgb, var(--color-accent-primary) 60%, transparent)",
              color: "var(--color-accent-primary)",
            }}
          >
            Outline
          </motion.button>
        </div>

        <div className="flex justify-center gap-3">
          {[Plus, Heart].map((Icon, idx) => (
            <motion.button
              key={idx}
              whileHover={{ y: -2 }}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                border:
                  "1px solid color-mix(in srgb, var(--color-accent-primary) 35%, transparent)",
                color: "var(--color-accent-primary)",
                backgroundColor: "transparent",
              }}
            >
              <Icon size={14} />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Components1;
