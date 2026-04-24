'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Buttons1() {
  return (
    <motion.button
      className="group relative px-8 py-3 font-semibold text-white rounded-lg overflow-hidden aura-border"
      whileHover="hover"
      whileTap="tap"
      initial="rest"
      variants={{
        rest: { scale: 1 },
        hover: { scale: 1.02 },
        tap: { scale: 0.98 },
      }}
    >
      {/* Background Layer: Deep surface with mesh overlay */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      
      {/* Mesh Gradient */}
      <motion.div
        className="absolute inset-0 opacity-40 mix-blend-screen transition-opacity group-hover:opacity-60"
        variants={{
          rest: { scale: 1.2, rotate: 0 },
          hover: { 
            scale: 1.4, 
            rotate: 5,
            transition: { duration: 3, repeat: Infinity, repeatType: "mirror", ease: "linear" }
          }
        }}
        style={{
          background: `
            radial-gradient(at 0% 0%, var(--color-accent-primary) 0%, transparent 60%),
            radial-gradient(at 100% 0%, var(--color-accent-secondary) 0%, transparent 60%),
            radial-gradient(at 100% 100%, var(--color-accent-tertiary) 0%, transparent 60%),
            radial-gradient(at 0% 100%, #b8ff57 0%, transparent 60%)
          `,
          filter: "blur(20px)",
        }}
      />

      {/* Internal Glass Highlight */}
      <div className="absolute inset-[1px] rounded-[7px] bg-gradient-to-b from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      {/* Pulsing outer glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        variants={{
          rest: { opacity: 0 },
          hover: {
            opacity: [0, 0.4, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          },
        }}
        style={{
          boxShadow: '0 0 20px var(--color-accent-primary)',
        }}
      />

      {/* Content */}
      <span className="relative z-10 drop-shadow-sm">Aura Gradient</span>
    </motion.button>
  );
}
