import React, { useState } from 'react';
import { BeaconHelp } from '../types';

interface RadarViewProps {
  beacons: BeaconHelp[];
  onAddHelp: () => void;
  onBeaconChat: (beacon: BeaconHelp) => void;
  onNavigate: (screen: string) => void;
}

export default function RadarView({ beacons, onAddHelp, onBeaconChat, onNavigate }: RadarViewProps) {
  const [selectedBeacon, setSelectedBeacon] = useState<BeaconHelp | null>(null);

  return (
    <div className="flex-1 flex flex-col pb-32 pt-2 px-4 relative max-w-lg mx-auto w-full">
      {/* Location & Header */}
      <section className="pt-4 pb-2 space-y-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[28px]">location_on</span>
          <h2 className="text-xl font-bold text-on-surface">青年路社区附近</h2>
        </div>

        {/* Analytic Box */}
        <div className="bg-surface-container-low rounded-xl p-5 flex justify-between items-center shadow-[0_2px_8px_rgba(168,198,159,0.08)] border border-surface-variant/40">
          <div className="flex flex-col gap-1">
            <span className="text-3xl font-bold text-primary tracking-tight">36</span>
            <span className="text-xs text-on-surface-variant font-medium">位邻居在线</span>
          </div>
          <div className="h-12 w-px bg-outline-variant/30 rounded-full"></div>
          <div className="flex flex-col gap-1 text-right">
            <span className="text-3xl font-bold text-secondary tracking-tight">12</span>
            <span className="text-xs text-on-surface-variant font-medium">今日完成互助</span>
          </div>
        </div>
      </section>

      {/* Radar Map Sandbox */}
      <section className="flex-1 relative mt-4 mb-4 rounded-3xl overflow-hidden bg-white border border-surface-variant/50 shadow-[inset_0_4px_24px_rgba(168,198,159,0.05)] min-h-[380px] flex flex-col justify-between">
        {/* Abstract Map blur backgrounds */}
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, var(--color-primary-container) 0%, transparent 60%), radial-gradient(circle at 80% 20%, var(--color-secondary-container) 0%, transparent 40%), radial-gradient(circle at 20% 80%, var(--color-tertiary-container) 0%, transparent 50%)",
          filter: "blur(40px)"
        }}></div>

        {/* Concentric Radar Circles */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[90%] aspect-square rounded-full border border-primary/5 opacity-20"></div>
          <div className="absolute w-[65%] aspect-square rounded-full border border-primary/10 opacity-30"></div>
          <div className="absolute w-[40%] aspect-square rounded-full border border-primary/20 opacity-40"></div>
        </div>

        {/* Center pulse dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
            <div className="w-4 h-4 rounded-full bg-primary shadow-[0_0_12px_rgba(74,101,69,0.8)] border-2 border-surface"></div>
          </div>
        </div>

        {/* Beacons mapped onto the coordinate map */}
        {beacons.map((beacon) => {
          let bgClass = 'bg-primary-container text-on-primary-container';
          let icon = 'redeem';
          if (beacon.category === '生活') {
            bgClass = 'bg-secondary-container text-on-secondary-container';
            icon = 'pan_tool';
          } else if (beacon.category === '出行') {
            bgClass = 'bg-tertiary-container text-on-tertiary-container';
            icon = 'shopping_basket';
          }

          return (
            <button
              key={beacon.id}
              onClick={() => setSelectedBeacon(beacon)}
              style={{ top: `${beacon.y}%`, left: `${beacon.x}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 active:scale-95 duration-200 cursor-pointer z-20 flex flex-col items-center group"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md border-2 border-white ${bgClass}`}>
                <span className="material-symbols-outlined text-sm">{icon}</span>
              </div>
              <div className="mt-1 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] text-on-surface-variant font-semibold border border-surface-variant shadow-sm limit-text">
                {beacon.title}
              </div>
            </button>
          );
        })}

        {/* Overlay Beacon Popover detail */}
        {selectedBeacon && (
          <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-primary/15 animate-[fadeInUp_0.3s_ease] z-30">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <img
                  src={selectedBeacon.avatarUrl}
                  alt={selectedBeacon.ownerName}
                  className="w-8 h-8 rounded-full border object-cover"
                />
                <div>
                  <h4 className="text-sm font-semibold text-on-surface">{selectedBeacon.ownerName}</h4>
                  <p className="text-[10px] text-[#A8C69F] font-bold">发起了：{selectedBeacon.title}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedBeacon(null)}
                className="w-6 h-6 rounded-full hover:bg-surface-container flex items-center justify-center text-outline cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
            
            <p className="text-xs text-on-surface-variant leading-relaxed mb-3">
              {selectedBeacon.description}
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => onBeaconChat(selectedBeacon)}
                className="flex-1 bg-primary text-on-primary py-2 rounded-lg text-xs font-semibold hover:opacity-90 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs">chat</span>
                进入临时会话沟通
              </button>
              <button
                onClick={() => setSelectedBeacon(null)}
                className="px-3 bg-surface-container text-on-surface py-2 rounded-lg text-xs font-semibold cursor-pointer"
              >
                关闭
              </button>
            </div>
          </div>
        )}
      </section>

      {/* FAB: 發出求助 */}
      <button
        onClick={onAddHelp}
        className="absolute left-1/2 -translate-x-1/2 bottom-20 z-[35] bg-primary text-on-primary rounded-full px-8 py-3.5 flex items-center gap-2 shadow-[0_8px_24px_rgba(74,101,69,0.3)] hover:bg-primary/95 hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer"
      >
        <span className="material-symbols-outlined font-bold">add</span>
        <span className="text-base font-bold whitespace-nowrap">发出求助</span>
      </button>
    </div>
  );
}
