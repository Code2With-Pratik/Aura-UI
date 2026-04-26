import React from 'react';

export default function Card4() {
  return (
    <div className="relative group w-72 h-48 rounded-2xl overflow-hidden p-[2px] cursor-pointer">
      {/* Rotating Background for the border glow */}
      <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#ef4444_50%,#000000_100%)] transition-all duration-500 group-hover:bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#3b82f6_50%,#000000_100%)]" />
      
      {/* Inner Card content */}
      <div className="relative w-full h-full bg-neutral-950 rounded-[14px] p-6 flex flex-col justify-between z-10 overflow-hidden">
        {/* Subtle inner hover glow */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-1">HellSetCoder Repo</h3>
          <p className="text-neutral-400 text-sm">Full Stack Architecture</p>
        </div>
        
        <div className="relative z-10 flex items-center text-sm font-semibold text-red-500 group-hover:text-blue-500 transition-colors duration-300">
          <span>View Source</span>
          <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </div>
      </div>
    </div>
  );
}