import logo from '../assets/LOGO.png';
import React from 'react';

interface SplashViewProps {
  onEnter: () => void;
}

export default function SplashView({ onEnter }: SplashViewProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden px-6 text-center py-10 min-h-[600px] bg-[#FAF7F1]">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm z-10 relative">
        <div className="logo-section">
          <img src={logo} alt="搭把手 LOGO" className="app-logo" />
        </div>

        {/* Logo Text below */}
        <div className="text-center mb-10">
          <h1 className="text-[34px] font-bold text-[#CA6E2D] tracking-[2px] mb-4">
            搭把手
          </h1>
          <p className="text-[16px] font-medium text-[#5D687A] tracking-[1px] m-0">
            邻里之间，随手帮一把。
          </p>
        </div>
      </div>

      {/* Button at bottom */}
      <div className="w-full max-w-sm z-10 mb-8 px-2">
        <button
          onClick={onEnter}
          className="w-full bg-primary text-on-primary py-4 rounded-xl font-semibold shadow-[0_4px_14px_rgba(74,101,69,0.3)] hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>进入社区</span>
          <span className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:translate-x-1">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
}
