'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Buttons3() {
  return (
    <motion.button
      className="relative px-8 py-3 font-semibold text-white rounded-xl overflow-hidden border border-white border-opacity-30"
      whileHover={{
        boxShadow: '0 0 30px rgba(255, 255, 255, 0.4)',
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
      }}
    >
      {/* Frosted glass backdrop blur background */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      />

      {/* Inner white glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <span className="relative z-10">Glass Morphic</span>
    </motion.button>
  );
}
