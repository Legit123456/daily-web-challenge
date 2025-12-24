import React from "react";

const LoadingSpinner = ({ message = "SYSTEM_BOOTING..." }) => {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#0a0a0a] bg-opacity-95 backdrop-blur-md">
      {/* The Spinner */}
      <div className="relative w-20 h-20">
        {/* The Actual Spinning Part */}
        <div className="absolute inset-0 border-4 border-(--brand-green) border-t-transparent rounded-full anime-spin shadow-[0_0_15px_rgba(0,255,153,0.3)]"></div>
        
        {/* The Stationary Inner Ring (Adds Depth) */}
        <div className="absolute inset-4 border-2 border-gray-800 rounded-full"></div>
      </div>
      
      {/* Text with Anime Pulse */}
      <div className="mt-8 text-center">
        <p className="text-(--brand-green) font-mono text-sm tracking-[0.3em] uppercase animate-pulse">
          {message}
        </p>
        <p className="mt-2 text-gray-500 text-[10px] uppercase tracking-widest opacity-50">
          Accessing Cloud Database...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;