import React, { useState } from 'react';

interface MutualConfirmViewProps {
  onWriteThankYou: () => void;
  onGoHome: () => void;
}

export default function MutualConfirmView({ onWriteThankYou, onGoHome }: MutualConfirmViewProps) {
  const [myConfirmed, setMyConfirmed] = useState(true);
  const [neighborConfirmed, setNeighborConfirmed] = useState(true);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 max-w-sm mx-auto w-full pb-16 min-h-[600px] justify-between">
      {/* Top App Bar spacer */}
      <div className="h-6"></div>

      {/* Main Connection Abstract drawing */}
      <div className="relative w-64 h-64 mb-6 flex items-center justify-center animate-[float_5s_ease-in-out_infinite]">
        {/* Glowing background halo */}
        <div className="absolute inset-0 bg-primary-container rounded-full opacity-20 blur-2xl animate-pulse"></div>

        {/* Abstract connection illustration */}
        <img
          alt="Hands high-five connection"
          src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=400&h=400&q=80"
          className="relative z-10 w-44 h-44 object-cover rounded-full shadow-lg border-4 border-white"
          referrerPolicy="no-referrer"
        />

        {/* Floating icons decoration */}
        <div className="absolute top-4 -right-1 bg-secondary-container text-on-secondary-container w-9 h-9 rounded-full flex items-center justify-center shadow-md animate-bounce">
          <span className="material-symbols-outlined text-sm">favorite</span>
        </div>
        <div className="absolute bottom-5 -left-1 bg-tertiary-container text-on-tertiary-container w-8 h-8 rounded-full flex items-center justify-center shadow-md animate-bounce" style={{ animationDelay: '1.2s' }}>
          <span className="material-symbols-outlined text-xs">star</span>
        </div>
      </div>

      {/* Header section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-on-surface mb-2">这次互助完成啦</h2>
        <p className="text-xs text-on-surface-variant font-medium leading-relaxed max-w-[260px] mx-auto">
          感谢您的热心参与，社区因每一句真诚温和的话而愈发温暖。
        </p>
      </div>

      {/* Checklist Grid */}
      <div className="flex items-center justify-center gap-5 w-full mb-10">
        {/* Me Status */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => setMyConfirmed(!myConfirmed)}
            className={`relative w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all cursor-pointer ${
              myConfirmed 
                ? 'bg-primary-container border-primary/20 text-on-primary-container shadow-sm' 
                : 'bg-surface-container-low border-dashed border-outline/40 text-outline'
            }`}
          >
            <span className="material-symbols-outlined text-2xl">person_check</span>
            {myConfirmed && (
              <div className="absolute -bottom-1 -right-1 bg-primary text-on-primary w-5 h-5 rounded-full flex items-center justify-center shadow-sm border border-white">
                <span className="material-symbols-outlined text-xs font-bold">check</span>
              </div>
            )}
          </button>
          <span className="text-[11px] font-bold text-on-surface">我已确认</span>
        </div>

        {/* Joining line */}
        <div className="flex-1 max-w-[50px] h-[2px] bg-outline-variant/50 relative rounded-full opacity-60">
          {myConfirmed && neighborConfirmed && (
            <div className="absolute inset-0 bg-primary opacity-80 animate-pulse"></div>
          )}
        </div>

        {/* Neighbor Status */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => setNeighborConfirmed(!neighborConfirmed)}
            className={`relative w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all cursor-pointer ${
              neighborConfirmed 
                ? 'bg-primary-container border-primary/20 text-on-primary-container shadow-sm' 
                : 'bg-surface-container-low border-dashed border-outline/40 text-outline'
            }`}
          >
            <span className="material-symbols-outlined text-2xl">how_to_reg</span>
            {neighborConfirmed && (
              <div className="absolute -bottom-1 -right-1 bg-primary text-on-primary w-5 h-5 rounded-full flex items-center justify-center shadow-sm border border-white">
                <span className="material-symbols-outlined text-xs font-bold">check</span>
              </div>
            )}
          </button>
          <span className="text-[11px] font-bold text-on-surface">邻居已确认</span>
        </div>
      </div>

      {/* Button Tray */}
      <div className="w-full flex flex-col gap-3 px-2">
        <button
          onClick={onWriteThankYou}
          className="w-full bg-[#ffb37b] text-[#794315] font-bold text-sm py-4 rounded-xl flex items-center justify-center gap-1.5 shadow-[2px_4px_12px_rgba(138,80,33,0.15)] hover:rotate-1 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">edit_note</span>
          写一句感谢
        </button>
        <button
          onClick={onGoHome}
          className="w-full bg-surface-container-high hover:bg-surface-variant text-on-surface font-semibold text-xs py-3.5 rounded-xl cursor-pointer transition-colors active:scale-95"
        >
          返回社区雷达网页
        </button>
      </div>
    </div>
  );
}
