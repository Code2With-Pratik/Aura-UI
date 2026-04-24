'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Buttons4() {
  return (
    <motion.button
      className="relative px-8 py-3 font-semibold text-white rounded-lg overflow-hidden group"
      whileHover="hover"
      initial="rest"
      variants={{
        rest: {},
        hover: {},
      }}
    >
      {/* Rotating conic-gradient border */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
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
          backgroundSize: '200% 200%',
          padding: '2px',
        }}
      >
        {/* Inner transparent area */}
        <div className="absolute inset-0 bg-black rounded-lg m-0.5" />
      </motion.div>

      {/* Content */}
      <span className="relative z-10">Gradient Border</span>
    </motion.button>
  );
}
