import React, { useState } from 'react';

interface WriteThankYouViewProps {
  onSendThankYou: (text: string, type: 'yellow' | 'orange' | 'blue') => void;
  onBack: () => void;
}

const TEMPLATES = [
  '谢谢你帮我解决了小麻烦！',
  '谢谢你愿意搭把手！',
  '今天因为你轻松了很多！'
];

export default function WriteThankYouView({ onSendThankYou, onBack }: WriteThankYouViewProps) {
  const [noteText, setNoteText] = useState('');
  const [noteType, setNoteType] = useState<'yellow' | 'orange' | 'blue'>('orange');

  const handleSelectTemplate = (tpl: string) => {
    setNoteText(tpl);
  };

  return (
    <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full px-4 pt-2 pb-8 overflow-y-auto">
      {/* Header */}
      <header className="flex justify-between items-center h-16 w-full mb-4 shrink-0">
        <button
          onClick={onBack}
          aria-label="关闭"
          className="text-on-surface-variant hover:bg-surface-container-high transition-colors p-2 rounded-full cursor-pointer flex items-center justify-center"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <h1 className="text-base font-bold text-on-surface">给邻居一句感谢</h1>
        <div className="w-10"></div>
      </header>

      {/* Main Form content */}
      <div className="flex-grow flex flex-col gap-6">
        <div className="text-center">
          <p className="text-xs text-on-surface-variant font-medium">挑选或自己写下一句你想对邻居说的话：</p>
        </div>

        {/* Templates Chips grid */}
        <div className="flex flex-wrap gap-2 justify-center">
          {TEMPLATES.map((tpl, idx) => {
            let bgStyle = 'bg-primary-container/60 text-on-primary-container';
            if (idx === 1) bgStyle = 'bg-secondary-container/60 text-on-secondary-container';
            if (idx === 2) bgStyle = 'bg-tertiary-container/60 text-on-tertiary-container';

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectTemplate(tpl)}
                className={`text-xs px-4 py-2.5 rounded-full hover:scale-102 hover:shadow-xs active:scale-95 transition-all cursor-pointer font-bold ${bgStyle}`}
              >
                {tpl}
              </button>
            );
          })}
        </div>

        {/* Inline custom textarea */}
        <div className="relative mt-2">
          <textarea
            className="w-full bg-surface-container-low text-on-surface border border-outline-variant/50 focus:border-primary focus:ring-0 rounded-xl p-4 text-xs font-semibold resize-none shadow-inner outline-none"
            placeholder="写下温情流动的一两句话，您的感谢会呈现在社区的暖心墙上..."
            rows={3}
            maxLength={100}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
          <div className="absolute bottom-2.5 right-4 text-[10px] text-on-surface-variant font-bold">
            {noteText.length}/100
          </div>
        </div>

        {/* Color picker for sticky note */}
        <div className="flex flex-col items-center gap-2 mt-2">
          <p className="text-xs font-bold text-on-surface-variant">选择便利贴背景色：</p>
          <div className="flex gap-4">
            <button
              onClick={() => setNoteType('yellow')}
              className={`w-7 h-7 rounded-full bg-[#FFF9C4] border-2 cursor-pointer shadow-xs transition-transform hover:scale-105 ${noteType === 'yellow' ? 'border-primary' : 'border-transparent'}`}
              title="温暖浅黄"
            />
            <button
              onClick={() => setNoteType('orange')}
              className={`w-7 h-7 rounded-full bg-[#ffdcc5] border-2 cursor-pointer shadow-xs transition-transform hover:scale-105 ${noteType === 'orange' ? 'border-primary' : 'border-transparent'}`}
              title="夕阳柔橙"
            />
            <button
              onClick={() => setNoteType('blue')}
              className={`w-7 h-7 rounded-full bg-[#c8e7fd] border-2 cursor-pointer shadow-xs transition-transform hover:scale-105 ${noteType === 'blue' ? 'border-primary' : 'border-transparent'}`}
              title="治愈晴蓝"
            />
          </div>
        </div>

        {/* Live Preview rotate Sticker Note Card */}
        <div className="mt-4 flex justify-center">
          <div className={`w-52 h-52 p-5 rounded-lg flex flex-col justify-center items-center text-center relative shadow-md transition-all duration-300 hover:scale-102 hover:shadow-lg ${
            noteType === 'yellow'
              ? 'bg-[#FFF9C4] text-[#5D4037] border border-[#F3E5AB]/60 rotate-[-1deg]'
              : noteType === 'blue'
              ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant border border-tertiary-container/30 rotate-[-2deg]'
              : 'bg-[#ffdcc5] text-[#794315] border border-secondary-container/30 rotate-[1.5deg]'
          }`}>
            <span className="material-symbols-outlined absolute top-3 left-4 text-xs font-semibold opacity-30 select-none">
              format_quote
            </span>
            <p className="text-xs font-extrabold max-h-[120px] overflow-y-auto leading-relaxed px-1">
              {noteText ? `“ ${noteText} ”` : '“ 谢谢你帮我解决了小麻烦！ ”'}
            </p>
            <div className="absolute bottom-3 right-4 flex items-center gap-1 opacity-70">
              <span className="text-[9px] font-bold">To: 邻居</span>
              <span className="material-symbols-outlined text-[11px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            </div>
          </div>
        </div>
      </div>

      {/* Button footer wrapper */}
      <div className="px-1 pb-2 pt-6 shrink-0 mt-8">
        <button
          onClick={() => {
            const final = noteText.trim() || '谢谢你帮我解决了小麻烦！';
            onSendThankYou(final, noteType);
          }}
          className="w-full bg-primary text-on-primary font-bold text-sm py-4 rounded-xl shadow-lg hover:opacity-95 active:scale-95 transition-all flex justify-center items-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">send</span>
          发送感谢，登上班墙
        </button>
      </div>
    </div>
  );
}
