'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Buttons7() {
  return (
    <motion.button
      className="relative px-8 py-3 font-semibold text-white rounded-2xl overflow-hidden"
      whileHover={{
        boxShadow: `
          inset -2px -2px 5px rgba(255, 255, 255, 0.3),
          inset 2px 2px 5px rgba(0, 0, 0, 0.3),
          0px 10px 30px rgba(0, 0, 0, 0.2)
        `,
      }}
      whileTap={{
        boxShadow: `
          inset -1px -1px 3px rgba(255, 255, 255, 0.2),
          inset 1px 1px 3px rgba(0, 0, 0, 0.2),
          0px 5px 15px rgba(0, 0, 0, 0.1)
        `,
      }}
      initial={{
        boxShadow: `
          inset -2px -2px 5px rgba(255, 255, 255, 0.2),
          inset 2px 2px 5px rgba(0, 0, 0, 0.2),
          0px 8px 24px rgba(0, 0, 0, 0.15)
        `,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
      }}
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      {/* Content */}
      <span className="relative z-10">Claymorphism</span>
    </motion.button>
  );
}
