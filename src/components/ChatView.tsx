import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';

interface ChatViewProps {
  ownerName: string;
  avatarUrl: string;
  contextTitle: string;
  onBack: () => void;
  onMutualConfirm: () => void;
}

export default function ChatView({ ownerName, avatarUrl, contextTitle, onBack, onMutualConfirm }: ChatViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'system-msg',
      sender: 'system',
      text: `互助任务已接单，已与 ${ownerName} 成功匹配。本次会话开启守护中。`,
      time: '14:30'
    },
    {
      id: 'msg-1',
      sender: 'me',
      text: `你好！请问您的 [${contextTitle}] 现在方便借用一下吗？`,
      time: '14:32',
      status: '已读'
    },
    {
      id: 'msg-2',
      sender: 'neighbor',
      text: '可以的！我正好在家呢。随时可以过来，或者我放在一楼大厅快递柜旁边的白色置物架上，密码是8866，你可以直接去拿哈。',
      time: '14:35'
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scrolling on messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!inputVal.trim()) return;

    const myMessage: ChatMessage = {
      id: `msg-me-${Date.now()}`,
      sender: 'me',
      text: inputVal,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      status: '已读'
    };

    setMessages(prev => [...prev, myMessage]);
    const typedText = inputVal;
    setInputVal('');

    // Trigger automated simulated response with neighborly warmth!
    setIsTyping(true);
    setTimeout(() => {
      let botResponse = '好的呢！如果有任何使用上的问题随时呼唤我。用完直接放还原处就可以啦，邻居。';
      
      const lowerText = typedText.toLowerCase();
      if (lowerText.includes('谢谢') || lowerText.includes('感谢') || lowerText.includes('多谢')) {
        botResponse = '客气啦，邻里之间互相搭把手是应该的！有需要随时说哈，祝你今天开心！🌸';
      } else if (lowerText.includes('拿') || lowerText.includes('到') || lowerText.includes('去了')) {
        botResponse = '太棒了，取到了就好。使用博世电钻时注意握持稳当哈，借给你用得顺手就最好了。';
      } else if (lowerText.includes('完') || lowerText.includes('还') || lowerText.includes('好了')) {
        botResponse = '好嘞！我已经看到你原样放回去了，收拾得很干净，非常感谢你的爱惜！我们可以直接点击左下角[确认已完成]来进行互助记录啦～';
      }

      const neighborMessage: ChatMessage = {
        id: `msg-bot-${Date.now()}`,
        sender: 'neighbor',
        text: botResponse,
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, neighborMessage]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full w-full relative overflow-hidden bg-surface-container-lowest">
      {/* Top sticky Navigation */}
      <header className="flex items-center justify-between px-4 h-16 w-full bg-white z-10 sticky top-0 border-b border-surface-container-high shrink-0 mx-auto">
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors active:scale-95 duration-150 flex items-center justify-center cursor-pointer"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-sm font-bold text-on-surface leading-snug">{ownerName} 的会话</h1>
          <span className="text-[10px] text-on-surface-variant/90 leading-tight">50米内 • 在线</span>
        </div>
        <button className="p-2 -mr-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors active:scale-95 duration-150 flex items-center justify-center">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </header>

      {/* Top Banner warning alert */}
      <div className="bg-secondary-container/45 text-on-secondary-container px-4 py-3 flex items-start gap-2.5 shadow-xs z-10 shrink-0">
        <span className="material-symbols-outlined shrink-0 text-sm mt-0.5 text-secondary">info</span>
        <p className="text-[11px] font-semibold leading-relaxed">
          本次会话仅用于这次互助，完成后自动关闭。为保护私密，系统不显示双方的真实手机号或具体门牌地址。
        </p>
      </div>

      {/* Chat scrollable canvas list */}
      <main className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-5 bg-surface-container-low/60 no-scrollbar">
        {/* Date header */}
        <div className="flex justify-center">
          <span className="bg-surface-container text-on-surface-variant text-[10px] font-bold px-3 py-1 rounded-full border border-surface-container-highest/20 shadow-xxs">
            今天 14:30
          </span>
        </div>

        {/* Mapped Messages */}
        {messages.map((msg) => {
          if (msg.sender === 'system') {
            return (
              <div key={msg.id} className="flex justify-center w-full animate-[fadeIn_0.3s]">
                <div className="bg-white border border-outline-variant/60 rounded-2xl p-4 w-full max-w-xs shadow-[0_2px_8px_rgba(168,198,159,0.08)]">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="bg-primary-container text-on-primary-container p-1 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-[14px]">handyman</span>
                    </div>
                    <span className="text-xs text-on-surface font-bold">借用请求：{contextTitle}</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant font-medium leading-relaxed">
                    {msg.text}
                  </p>
                </div>
              </div>
            );
          }

          const isMe = msg.sender === 'me';
          return (
            <div
              key={msg.id}
              className={`flex flex-col gap-1 animate-[fadeInUp_0.25s_ease-out] ${
                isMe ? 'items-end' : 'items-start'
              }`}
            >
              <div className={`flex items-end gap-2 max-w-[85%] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                <img
                  src={isMe ? 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&h=400&q=80' : avatarUrl}
                  alt={isMe ? '我' : ownerName}
                  className="w-8 h-8 rounded-full object-cover border border-outline-variant/40 shrink-0 shadow-xxs"
                  referrerPolicy="no-referrer"
                />
                <div
                  className={`rounded-2xl px-4 py-2.5 shadow-sm text-xs leading-relaxed relative ${
                    isMe
                      ? 'bg-primary text-on-primary rounded-br-xxs shadow-primary/10'
                      : 'bg-white text-on-surface border border-surface-container-high rounded-bl-xxs'
                  }`}
                >
                  <p className="font-semibold">{msg.text}</p>
                </div>
              </div>
              <span className={`text-[9px] text-on-surface-variant/70 block ${isMe ? 'mr-10' : 'ml-10'}`}>
                {msg.time} {isMe && msg.status && `• ${msg.status}`}
              </span>
            </div>
          );
        })}

        {/* Thinking status animated indicator */}
        {isTyping && (
          <div className="flex items-end gap-2 animate-[fadeIn_0.2s]">
            <img
              src={avatarUrl}
              alt={ownerName}
              className="w-8 h-8 rounded-full object-cover border shrink-0"
            />
            <div className="bg-white border rounded-2xl rounded-bl-xxs px-4 py-2.5 shadow-xxs flex items-center justify-center gap-1.5 h-10">
              <span className="w-1.5 h-1.5 bg-outline rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-1.5 h-1.5 bg-outline rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-1.5 h-1.5 bg-outline rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}

        <div ref={scrollRef}></div>
      </main>

      {/* Footer quick tools panel */}
      <footer className="bg-white border-t border-surface-container-high flex flex-col z-10 shadow-[0_-4px_16px_rgba(0,0,0,0.03)] shrink-0 max-w-md mx-auto w-full">
        {/* Shortcuts / Confirmation controls */}
        <div className="flex justify-around items-center py-2.5 px-4 bg-surface-bright border-b border-surface-container-high/60">
          <button
            onClick={onMutualConfirm}
            className="flex flex-col items-center gap-1 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-primary-container/40 text-primary flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all duration-200">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <span className="text-[10px] text-on-surface font-semibold">确认已完成</span>
          </button>
          
          <button
            onClick={() => alert('感谢邻居，投诉内容已收悉，运营部门将介入核查。')}
            className="flex flex-col items-center gap-1 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center hover:bg-surface-container-highest transition-all duration-200">
              <span className="material-symbols-outlined text-lg">report</span>
            </div>
            <span className="text-[10px] text-on-surface-variant font-medium">举报</span>
          </button>

          <button
            onClick={() => alert(`拉黑操作已生效。之后系统将屏蔽来自 ${ownerName} 的任何广播信号。`)}
            className="flex flex-col items-center gap-1 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-surface-container-high text-error flex items-center justify-center hover:bg-error-container transition-all duration-200">
              <span className="material-symbols-outlined text-lg">block</span>
            </div>
            <span className="text-[10px] text-on-surface-variant font-medium">拉黑</span>
          </button>
        </div>

        {/* Input Bar */}
        <div className="px-4 py-3 flex items-center gap-3 bg-white pb-6 h-18">
          <button className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center rounded-full p-1 cursor-pointer">
            <span className="material-symbols-outlined text-2xl font-bold">add_circle</span>
          </button>
          
          <div className="flex-1 bg-surface-container-low rounded-full flex items-center border border-transparent focus-within:border-primary transition-colors duration-200 overflow-hidden px-4 h-11 shadow-inner">
            <input
              type="text"
              className="w-full bg-transparent border-none outline-none focus:ring-0 text-xs text-on-surface font-semibold placeholder-on-surface-variant/40"
              placeholder="回复消息..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
            />
          </div>

          <button
            onClick={handleSendMessage}
            className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md active:scale-95 transition-all duration-200 shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">send</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
