import React, { useState, useEffect } from 'react';

interface WaitingViewProps {
  onSpeedUpMatch: () => void;
  onCancel: () => void;
}

export default function WaitingView({ onSpeedUpMatch, onCancel }: WaitingViewProps) {
  const [timeLeft, setTimeLeft] = useState(28);

  // Tick down minutes slowly to mimic countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 1 ? prev - 1 : 28));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Simulate an automatic matching trigger after 6 seconds if they don't speed it up,
  // making the experience fluidly progress without forcing them to click the buttons!
  useEffect(() => {
    const autoRedirect = setTimeout(() => {
      onSpeedUpMatch();
    }, 7000);
    return () => clearTimeout(autoRedirect);
  }, [onSpeedUpMatch]);

  return (
    <div className="flex-1 flex flex-col bg-surface text-on-surface min-h-[600px] overflow-hidden relative max-w-sm mx-auto w-full pb-10 justify-between">
      {/* Decorative Blur Ambient Circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-secondary-container opacity-20 blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-primary-container opacity-20 blur-3xl"></div>
      </div>

      <header className="relative z-10 flex justify-between items-center px-4 h-16 w-full">
        {/* Empty layout spacer */}
      </header>

      {/* Main waiting sandbox */}
      <main className="flex-grow flex flex-col items-center justify-center relative z-10 px-4">
        {/* Pulsing Concentric Circular Beacons */}
        <div className="relative w-60 h-64 flex items-center justify-center mb-8">
          <div className="absolute inset-0 rounded-full border border-secondary-container animate-ping pointer-events-none"></div>
          <div className="absolute inset-0 rounded-full border-2 border-secondary-container/40 animate-pulse pointer-events-none" style={{ animationDuration: '2.5s' }}></div>

          {/* Core Center Heart Container */}
          <div className="relative z-10 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border border-surface-container-highest">
            <div className="w-20 h-20 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container">
              <span className="material-symbols-outlined text-[36px] animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
            </div>
          </div>

          {/* Floating simulated neighbor indicators */}
          <div className="absolute top-4 left-8 w-10 h-10 bg-surface-variant rounded-full border-2 border-white flex items-center justify-center shadow-sm animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.5s' }}>
            <span className="material-symbols-outlined text-on-surface-variant text-base">person</span>
          </div>
          <div className="absolute bottom-8 right-6 w-12 h-12 bg-primary-container rounded-full border-2 border-white flex items-center justify-center shadow-sm animate-bounce" style={{ animationDuration: '4s', animationDelay: '1.2s' }}>
            <span className="material-symbols-outlined text-on-primary-container text-lg">person</span>
          </div>
          <div className="absolute top-1/2 -left-4 w-8 h-8 bg-tertiary-container rounded-full border-2 border-white flex items-center justify-center shadow-sm animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.2s' }}>
            <span className="material-symbols-outlined text-on-tertiary-container text-xs">person</span>
          </div>
        </div>

        {/* Info label count */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-extrabold text-on-surface">已通知 <span className="text-secondary font-black animate-pulse">8</span> 位附近邻居</h1>
          
          <div className="inline-flex items-center justify-center bg-surface-container-low px-6 py-2.5 rounded-full border border-surface-container-highest shadow-sm">
            <span className="material-symbols-outlined text-outline mr-2 text-sm">schedule</span>
            <p className="text-xs text-on-surface-variant">
              还需等待 <span className="font-bold text-on-surface" id="countdown">{timeLeft}</span> 分钟
            </p>
          </div>
        </div>

        {/* Match progress tip */}
        <div className="mt-8 bg-primary-container/20 border border-primary-container/40 p-3 rounded-2xl text-center max-w-[280px]">
          <p className="text-xs text-on-primary-container leading-relaxed">
            正在为您进行网络优配... 7秒内自动进入邻居匹配面板，或点击下方按钮进行飞速匹配。
          </p>
        </div>
      </main>

      {/* Button Action stack */}
      <div className="w-full space-y-3 px-4 mt-8 relative z-10">
        <button
          onClick={onSpeedUpMatch}
          className="w-full py-4 bg-primary text-on-primary font-bold text-sm rounded-xl shadow-md hover:bg-opacity-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">bolt</span>
          微调网络 - 飞速匹配
        </button>
        <button
          onClick={onCancel}
          className="w-full py-3.5 bg-surface hover:bg-surface-container-low text-error font-medium text-xs rounded-xl border border-error-container transition-colors cursor-pointer"
        >
          取消求助
        </button>

        {/* bottom privacy tip */}
        <div className="pt-2 flex items-center justify-center text-outline gap-1.5 opacity-80">
          <span className="material-symbols-outlined text-[15px]">lock</span>
          <p className="text-[10px] font-semibold">不会显示您的具体门牌号，请放心。</p>
        </div>
      </div>
    </div>
  );
}
