import React from 'react';

export default function Card5() {
  return (
    <div className="w-72 h-72 bg-white dark:bg-zinc-900 rounded-3xl border border-neutral-200 dark:border-zinc-800 overflow-hidden group cursor-pointer shadow-sm hover:shadow-2xl transition-shadow duration-500">
      
      <div className="w-full h-full p-6 flex flex-col justify-start relative transform transition-transform duration-500 ease-in-out group-hover:-translate-y-8">
        
        {/* Icon & Title */}
        <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Time Tracking</h3>
        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
          Monitor your productivity and analyze hours spent on development tasks.
        </p>

        {/* Action Buttons (Hidden initially, slides up) */}
        <div className="absolute bottom-[-40px] left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 flex gap-2">
          <button className="flex-1 bg-zinc-900 dark:bg-white text-white dark:text-black py-2 rounded-lg font-medium hover:scale-105 transition-transform">
            Launch
          </button>
          <button className="px-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 transition-colors">
            •••
          </button>
        </div>

      </div>
    </div>
  );
}