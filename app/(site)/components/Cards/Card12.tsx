import React from 'react';

export default function Card12() {
  return (
    <div className="flex items-center justify-center w-80 h-80 bg-neutral-900 rounded-3xl p-4">
      <div className="bg-black text-white w-48 h-14 rounded-full overflow-hidden cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:w-full hover:h-full hover:rounded-3xl border border-white/10 relative shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        
        {/* Compact State (Visible initially) */}
        <div className="absolute top-0 left-0 w-full h-14 flex items-center justify-center gap-3">
          <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
          <span className="font-medium text-sm">System Active</span>
        </div>

        {/* Expanded State (Revealed on hover) */}
        <div className="absolute top-16 left-0 w-full p-6 opacity-0 transition-opacity duration-500 delay-200 hover:opacity-100">
          <h4 className="text-xl font-bold text-neutral-200 mb-2">Server Status</h4>
          <div className="space-y-3">
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <p className="text-xs text-neutral-400">CPU Usage</p>
              <p className="font-mono text-lg">24%</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
              <p className="text-xs text-neutral-400">Memory</p>
              <p className="font-mono text-lg">4.2 GB</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}