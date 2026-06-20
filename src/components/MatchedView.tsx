import React, { useState } from 'react';

interface MatchedViewProps {
  onEnterChat: (ownerName: string, avatarUrl: string) => void;
  onCancel: () => void;
}

interface NeighborPersona {
  name: string;
  avatarUrl: string;
  completedCount: number;
  thanksCount: number;
  distance: string;
}

const PERSONAS: NeighborPersona[] = [
  {
    name: '工具箱小张',
    avatarUrl: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&w=400&h=400&q=80',
    completedCount: 18,
    thanksCount: 12,
    distance: '同小区附近 (约 50 米)'
  },
  {
    name: '王阿姨',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=400&q=80',
    completedCount: 42,
    thanksCount: 35,
    distance: '附近 1 邻楼栋 (约 80 米)'
  },
  {
    name: '工程师小李',
    avatarUrl: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&w=400&h=400&q=80',
    completedCount: 26,
    thanksCount: 21,
    distance: '青年路西侧 (约 150 米)'
  }
];

export default function MatchedView({ onEnterChat, onCancel }: MatchedViewProps) {
  const [personaIndex, setPersonaIndex] = useState(0);
  const currentPersona = PERSONAS[personaIndex];

  const handleSwapNeighbor = () => {
    setPersonaIndex(prev => (prev + 1) % PERSONAS.length);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 relative min-h-[600px] max-w-sm mx-auto w-full">
      {/* Dynamic Celebration Ambient Blooms */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute w-64 h-64 bg-primary-container rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-secondary-container rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-20 -translate-y-20 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Matching successful banner */}
      <div className="text-center mb-6 z-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-container rounded-full mb-3 shadow-[0_8px_24px_rgba(168,198,159,0.35)] transform duration-300 hover:scale-[1.03]">
          <span className="material-symbols-outlined text-4xl text-on-primary-container font-black" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
        </div>
        <h1 className="text-2xl font-extrabold text-primary mb-1">匹配成功</h1>
        <p className="text-xs text-on-surface-variant">为您找到了一位愿意提供帮助的邻居</p>
      </div>

      {/* Matched Neighbor Grid card */}
      <div className="w-full bg-white/90 backdrop-blur-md border border-outline-variant/30 rounded-2xl p-6 shadow-healing z-10 mb-8 relative overflow-hidden transition-all duration-300">
        {/* Colorful top border strip */}
        <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-primary-container to-secondary-container"></div>

        <div className="flex flex-col items-center">
          {/* Avatar frame */}
          <div className="relative mb-3 flex items-center justify-center">
            <img
              src={currentPersona.avatarUrl}
              alt={currentPersona.name}
              className="w-24 h-24 rounded-full border-4 border-white shadow-sm object-cover"
            />
            <div className="absolute bottom-0 right-0 bg-[#ffdcc5] text-[#794315] w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>handyman</span>
            </div>
          </div>

          <h2 className="text-lg font-bold text-on-surface mb-0.5">{currentPersona.name}</h2>
          
          <div className="flex items-center text-on-surface-variant text-[11px] font-bold mb-5 bg-surface-container-low px-3 py-1 rounded-full border border-surface-container-highest/50">
            <span className="material-symbols-outlined text-[14 px] mr-0.5">location_on</span>
            <span>{currentPersona.distance}</span>
          </div>

          <div className="w-full border-t border-surface-variant/40 mb-5"></div>

          {/* Persona micro stats */}
          <div className="w-full grid grid-cols-2 gap-3 text-center">
            <div className="p-2.5 bg-surface-container-low rounded-xl group-hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-primary text-base font-semibold mb-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>handshake</span>
              <p className="text-lg font-extrabold text-on-surface mb-0.5">{currentPersona.completedCount}</p>
              <p className="text-[10px] text-on-surface-variant font-medium">已完成互助</p>
            </div>
            <div className="p-2.5 bg-surface-container-low rounded-xl group-hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-secondary text-base font-semibold mb-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              <p className="text-lg font-extrabold text-on-surface mb-0.5">{currentPersona.thanksCount}</p>
              <p className="text-[10px] text-on-surface-variant font-medium">收到感谢</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom control anchors */}
      <div className="w-full flex flex-col gap-3.5 z-10">
        <button
          onClick={() => onEnterChat(currentPersona.name, currentPersona.avatarUrl)}
          className="w-full bg-primary text-on-primary py-4 rounded-full font-bold text-sm shadow-[0_4px_12px_rgba(74,101,69,0.3)] hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">chat</span>
          进入临时会话
        </button>
        
        <button
          onClick={handleSwapNeighbor}
          className="w-full bg-surface-container-high hover:bg-surface-variant text-on-surface font-semibold text-xs py-3.5 rounded-full flex items-center justify-center gap-1 transition-all border border-outline-variant/30 cursor-pointer"
        >
          <span className="material-symbols-outlined text-xs">refresh</span>
          换一位邻居试试
        </button>

        <button
          onClick={onCancel}
          className="text-xs text-on-surface-variant hover:text-on-surface font-semibold text-center cursor-pointer py-1.5"
        >
          取消关切
        </button>
      </div>
    </div>
  );
}
