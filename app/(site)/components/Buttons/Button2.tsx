'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Buttons2() {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.button
      className="relative px-8 py-3 font-semibold text-white rounded-lg overflow-hidden"
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      animate={{
        y: isPressed ? 2 : 0,
        boxShadow: isPressed
          ? '0px 2px 8px rgba(0, 0, 0, 0.3)'
          : '0px 4px 16px rgba(0, 0, 0, 0.4)',
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
      }}
      style={{
        background: 'linear-gradient(135deg, #ff9a56 0%, #ff7043 100%)',
      }}
    >
      {/* Hard shadow backdrop */}
      <div className="absolute -inset-1 bg-orange-900 opacity-50 blur-sm -z-10" />

      {/* Content */}
      <span className="relative z-10">Retro 3D</span>
    </motion.button>
  );
}
