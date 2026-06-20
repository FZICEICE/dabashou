import React, { useState, useEffect } from 'react';

interface VoiceInputViewProps {
  onBack: () => void;
  onNext: (transcription: string) => void;
}

export default function VoiceInputView({ onBack, onNext }: VoiceInputViewProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [dots, setDots] = useState('');

  // Animate transcribing dots
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setDots(prev => (prev.length < 3 ? prev + '.' : ''));
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isRecording]);

  const handleStartSimulate = () => {
    setIsRecording(true);
    setTranscript('正在倾听您的需要...');

    // Simulate real speech typing transcript delay
    setTimeout(() => {
      setTranscript('" 我家书架装到一半，想借一个电钻用十分钟。 "');
      setIsRecording(false);
    }, 2500);
  };

  return (
    <div className="flex-1 flex flex-col pt-4 px-4 pb-24 relative max-w-lg mx-auto w-full min-h-[600px] justify-between">
      {/* Top Header */}
      <header className="flex justify-between items-center h-16 w-full bg-white/10 z-10">
        <button
          onClick={onBack}
          aria-label="Back"
          className="p-2 -ml-2 text-primary hover:bg-surface-container rounded-full transition-colors active:scale-95 duration-200 cursor-pointer"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="font-semibold text-lg text-on-surface">发起求助</h1>
        <div className="w-10"></div>
      </header>

      {/* Main Recording Sandbox */}
      <main className="flex-grow flex flex-col items-center justify-center relative z-10 py-6">
        {/* Soft background ambient blur layers */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30 select-none">
          <div className="w-64 h-64 bg-primary-container rounded-full blur-3xl"></div>
          <div className="w-64 h-64 bg-secondary-container rounded-full blur-3xl absolute top-1/4 right-1/4 translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="relative z-10 w-full flex flex-col items-center">
          {/* Main squishy Voice input button with bouncing ripples */}
          <div className="relative flex items-center justify-center mb-10 mt-6">
            {/* Pulsing visual waves */}
            {isRecording && (
              <>
                <div className="absolute w-36 h-32 bg-primary-fixed rounded-full animate-ping pointer-events-none opacity-50"></div>
                <div className="absolute w-36 h-32 bg-primary-fixed rounded-full animate-ping pointer-events-none opacity-30" style={{ animationDelay: '0.8s' }}></div>
              </>
            )}
            
            <button
              onClick={handleStartSimulate}
              className={`relative w-40 h-40 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 active:scale-95 cursor-pointer ${
                isRecording 
                  ? 'bg-secondary text-white' 
                  : 'bg-primary text-on-primary hover:scale-[1.02]'
              }`}
              title="点击模拟录入语音"
            >
              <span className="material-symbols-outlined text-[48px] animate-pulse">
                {isRecording ? 'graphic_eq' : 'mic'}
              </span>
            </button>
          </div>

          <p className="text-sm font-semibold text-on-surface-variant mb-10 text-center animate-pulse">
            {isRecording ? '正在说...' : '点击麦克风，模拟说出你需要的小帮忙'}
          </p>

          {/* Transcript Panel card */}
          <div className="w-full bg-white/80 border border-outline-variant/50 rounded-2xl p-6 shadow-healing relative overflow-hidden transition-all duration-300 min-h-[120px] flex flex-col justify-center items-center">
            {/* quote icon watermark */}
            <span className="material-symbols-outlined absolute top-4 left-4 text-primary-fixed-dim/20 text-4xl pointer-events-none select-none">
              format_quote
            </span>
            
            <p className="text-sm text-on-surface font-semibold text-center leading-relaxed relative z-10">
              {transcript || '“ 点击上方麦克风按钮开始，模拟邻居发出借用求助语音录入。 ”'}
            </p>

            {isRecording && (
              <div className="flex justify-center items-center mt-3 space-x-1">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Action Tray at the bottom */}
      <div className="mt-auto pt-6 flex flex-col gap-4">
        <div className="flex gap-4 w-full">
          <button
            onClick={() => { setTranscript(''); setIsRecording(false); }}
            disabled={!transcript}
            className="flex-1 py-3 px-6 rounded-full bg-surface-container-high text-on-surface text-sm font-semibold hover:bg-surface-container-highest transition-colors active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            重新录入
          </button>
          <button
            onClick={() => {
              // Standard simulated transcript if empty
              const finalTranscript = transcript && transcript !== '正在倾听您的需要...'
                ? transcript.replace(/"/g, '').trim()
                : '我家书架装到一半，想借一个电钻用十分钟。';
              onNext(finalTranscript);
            }}
            className="flex-[2] py-3 px-6 rounded-full bg-primary text-on-primary text-sm font-semibold shadow-md hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>下一步确认</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
        <button
          onClick={onBack}
          className="py-1 text-xs text-outline font-semibold hover:text-on-surface transition-colors cursor-pointer text-center"
        >
          取消
        </button>
      </div>
    </div>
  );
}
