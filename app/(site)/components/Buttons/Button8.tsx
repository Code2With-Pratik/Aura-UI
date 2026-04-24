'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Buttons8() {
  return (
    <motion.button
      className="relative px-8 py-3 font-semibold text-white rounded-lg overflow-hidden border border-white border-opacity-40"
      whileHover="hover"
      initial="rest"
      variants={{
        rest: {},
        hover: {},
      }}
    >
      {/* Ghost background (transparent) */}
      <div className="absolute inset-0 bg-transparent rounded-lg" />

      {/* Liquid fill animation from bottom to top */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        variants={{
          rest: { clipPath: 'inset(100% 0 0 0)' },
          hover: {
            clipPath: 'inset(0% 0 0 0)',
            transition: {
              duration: 0.6,
              ease: 'easeInOut',
            },
          },
        }}
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      />

      {/* Wave effect overlay */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 0.4 },
        }}
      >
        <defs>
          <filter id="wave">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.03"
              numOctaves="3"
              result="noise"
              seed="2"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <motion.rect
          width="100%"
          height="100%"
          fill="rgba(255, 255, 255, 0.1)"
          filter="url(#wave)"
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.svg>

      {/* Content */}
      <span className="relative z-10">Liquid Ghost</span>
    </motion.button>
  );
}
