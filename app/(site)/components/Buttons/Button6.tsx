'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function Buttons6() {
  return (
    <motion.button
      className="relative w-16 h-16 rounded-xl overflow-hidden group"
      whileHover="hover"
      whileTap="tap"
      initial="rest"
      variants={{
        rest: {},
        hover: {},
        tap: { scale: 0.95 },
      }}
    >
      {/* Glass container background */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      />

      {/* Subtle glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 0.5 },
        }}
        style={{
          background: 'radial-gradient(circle, rgba(79, 172, 254, 0.4) 0%, transparent 70%)',
        }}
      />

      {/* 3D-styled icon that scales up */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        variants={{
          rest: { scale: 1, rotateZ: 0 },
          hover: { scale: 1.2, rotateZ: 10 },
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30,
        }}
      >
        <Zap className="w-8 h-8 text-blue-400" strokeWidth={1.5} />
      </motion.div>

      {/* Content label */}
      <span className="relative z-10 sr-only">Bento Icon</span>
    </motion.button>
  );
}
