import React from 'react';

export default function Card6() {
  return (
    <div className="group relative w-80 h-[400px] bg-slate-100 dark:bg-[#111] rounded-[2.5rem] overflow-hidden p-3 cursor-pointer">
      
      {/* Inner Media Element that expands on hover */}
      <div className="relative w-full h-1/2 bg-slate-300 dark:bg-slate-800 rounded-[2rem] overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:h-[80%]">
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop" 
          alt="Abstract" 
          className="w-full h-full object-cover transition-transform duration-[10s] ease-linear group-hover:scale-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Text Area */}
      <div className="px-4 py-6 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">Design System</h3>
          <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold px-3 py-1 rounded-full group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">v4.0</span>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">
          A comprehensive UI kit built entirely with arbitrary values for maximum flexibility.
        </p>
      </div>

    </div>
  );
}