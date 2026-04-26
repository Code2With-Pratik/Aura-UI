'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Buttons4() {
  return (
    <motion.button
      className="relative inline-flex overflow-hidden rounded-lg p-[2px] group focus:outline-none"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      {/* THE FIX: 
        1. Make it a massive square (aspect-square w-[300%]) so the edges never clip.
        2. Pin it precisely to the center (left-1/2 top-1/2).
        3. Use Framer Motion to handle the centering translation (x: '-50%', y: '-50%') ALONG with the rotation.
      */}
      <motion.div
        className="absolute left-1/2 top-1/2 aspect-square w-[300%]"
        initial={{ x: '-50%', y: '-50%', rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          background: `conic-gradient(
            from 0deg at 50% 50%,
            #ff6b9d 0deg,
            #4facfe 90deg,
            #43e97b 180deg,
            #fa709a 270deg,
            #ff6b9d 360deg
          )`,
        }}
      />

      {/* Inner Button Area */}
      <div className="relative flex h-full w-full items-center justify-center rounded-[6px] bg-black px-8 py-3 font-semibold text-white z-10 transition-colors duration-300 group-hover:bg-neutral-900">
        Gradient Border
      </div>
    </motion.button>
  );
}