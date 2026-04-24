'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Buttons5() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.button
      ref={buttonRef}
      className="relative px-8 py-3 font-semibold text-white rounded-lg overflow-hidden"
      onMouseMove={handleMouseMove}
      whileHover={{
        boxShadow: '0 0 30px rgba(79, 172, 254, 0.3)',
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
      }}
    >
      {/* Dark minimal background */}
      <div className="absolute inset-0 bg-gray-900 rounded-lg" />

      {/* Cursor-following colored glow overlay */}
      <motion.div
        className="absolute w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(79, 172, 254, 0.4) 0%, transparent 70%)',
          left: mousePosition.x - 64,
          top: mousePosition.y - 64,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
        }}
      />

      {/* Glass layer */}
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      />

      {/* Content */}
      <span className="relative z-10">Overlay Reveal</span>
    </motion.button>
  );
}
