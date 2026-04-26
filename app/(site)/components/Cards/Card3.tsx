import React from 'react';

export default function Card3() {
  return (
    <div className="group w-72 h-96 [perspective:1000px]">
      <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        
        {/* Front */}
        <div className="absolute inset-0 w-full h-full rounded-2xl bg-slate-800 text-white p-8 flex flex-col justify-center items-center shadow-xl [backface-visibility:hidden] border border-slate-700">
          <svg className="w-16 h-16 mb-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          <h2 className="text-2xl font-bold">Fast Setup</h2>
          <p className="text-sm text-slate-400 mt-2 text-center">Hover to flip and see details</p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 w-full h-full rounded-2xl bg-blue-600 text-white p-8 flex flex-col justify-center items-center shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <h2 className="text-2xl font-bold mb-4">Under the Hood</h2>
          <ul className="text-sm space-y-2 text-blue-100 text-center">
            <li>Zero configuration required</li>
            <li>Deployed in milliseconds</li>
            <li>Optimized for performance</li>
          </ul>
          <button className="mt-6 px-4 py-2 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors">
            Get Started
          </button>
        </div>

      </div>
    </div>
  );
}