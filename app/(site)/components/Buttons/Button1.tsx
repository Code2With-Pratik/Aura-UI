'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Buttons1() {
  return (
    <motion.button
      className="relative px-8 py-3 font-semibold text-white rounded-lg overflow-hidden"
      whileHover="hover"
      whileTap="tap"
      initial="rest"
      variants={{
        rest: {},
        hover: {},
        tap: {},
      }}
    >
      {/* Vibrant mesh gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, #ff6b9d 0%, transparent 40%),
            linear-gradient(45deg, #4facfe 0%, transparent 40%),
            linear-gradient(225deg, #43e97b 0%, transparent 40%),
            linear-gradient(315deg, #fa709a 0%, transparent 40%)
          `,
          backgroundSize: '200% 200%',
        }}
      />

      {/* Pulsing outer glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        variants={{
          rest: { opacity: 0, scale: 0.8 },
          hover: {
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.05, 1],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          },
        }}
        style={{
          boxShadow: '0 0 30px rgba(255, 107, 157, 0.6)',
          background: 'radial-gradient(circle, rgba(255,107,157,0.4) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <span className="relative z-10">Aura Gradient</span>
    </motion.button>
  );
}
