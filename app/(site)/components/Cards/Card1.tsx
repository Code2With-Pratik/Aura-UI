import React from 'react';

export default function Card1() {
  return (
    <div className="group relative w-72 h-96 rounded-3xl p-6 flex flex-col justify-end overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
      {/* Background Image/Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 transition-transform duration-700 group-hover:scale-110" />
      
      {/* Frosted Glass Overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 z-0" />
      
      {/* Content */}
      <div className="relative z-10 text-white transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
        <h3 className="text-2xl font-bold tracking-tight mb-2">Project Alpha</h3>
        <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          A high-performance application featuring realistic physics and fluid animations.
        </p>
      </div>
    </div>
  );
}