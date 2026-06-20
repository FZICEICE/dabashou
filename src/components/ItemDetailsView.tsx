import React, { useState } from 'react';
import { SharedItem } from '../types';

interface ItemDetailsViewProps {
  item: SharedItem;
  onBack: () => void;
  onStartChat: (ownerName: string, avatarUrl: string, itemTitle: string) => void;
}

export default function ItemDetailsView({ item, onBack, onStartChat }: ItemDetailsViewProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-white min-h-full relative antialiased w-full pb-36">
      {/* Header Bar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-surface-container-high h-14 w-full flex items-center justify-between px-4 shrink-0">
        <button
          onClick={onBack}
          aria-label="返回"
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-container transition-all text-on-surface cursor-pointer"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="font-semibold text-base text-on-surface">物品详情</div>
        <button
          aria-label="更多"
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-container transition-all text-on-surface cursor-pointer"
        >
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-grow pt-2 flex flex-col gap-6">
        {/* Cover Image Hero Section */}
        <section className="relative w-full aspect-square overflow-hidden rounded-b-[32px] shadow-sm">
          <img
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
            src={item.imgUrl}
          />
          {/* Pulsing Status Badge */}
          <div className="absolute top-4 right-4 bg-primary-container/90 backdrop-blur-xs text-on-primary-container font-semibold text-xs px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 border border-primary/10">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            {item.status === '可借用' ? '可借' : item.status}
          </div>
        </section>

        {/* Info detail content area */}
        <section className="px-5 flex flex-col gap-6">
          {/* Title and tags */}
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-on-surface leading-tight">
              {item.title}
            </h1>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="inline-flex items-center gap-1 bg-surface-container text-on-surface-variant text-xs font-semibold px-3 py-1 rounded-full border border-surface-container-highest">
                <span className="material-symbols-outlined text-[15px]">category</span> {item.category}
              </span>
              <span className="inline-flex items-center gap-1 bg-surface-container text-on-surface-variant text-xs font-semibold px-3 py-1 rounded-full border border-surface-container-highest">
                <span className="material-symbols-outlined text-[15px]">timer</span> 借用时间：{item.duration || '30分钟内'}
              </span>
              <span className="inline-flex items-center gap-1 bg-surface-container text-on-surface-variant text-xs font-semibold px-3 py-1 rounded-full border border-surface-container-highest">
                <span className="material-symbols-outlined text-[15px]">location_on</span> {item.distance}
              </span>
            </div>
          </div>

          <hr className="border-t border-surface-container-highest/60" />

          {/* Owner Info Card */}
          <div className="bg-[#fcfcfa] rounded-2xl p-4 shadow-sm border border-surface-container flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-variant border-2 border-surface shadow-sm">
                  <img
                    alt={item.ownerName}
                    className="w-full h-full object-cover"
                    src={item.avatarUrl}
                  />
                </div>
                {item.certified && (
                  <div
                    className="absolute -bottom-1 -right-1 bg-secondary text-on-secondary w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                    title="认证邻居"
                  >
                    <span className="material-symbols-outlined text-[11px] font-bold">verified</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-on-surface-variant font-medium">出借人</span>
                <span className="text-base font-bold text-on-surface leading-tight">{item.ownerName}</span>
              </div>
            </div>

            {/* Start direct chat button */}
            <button
              onClick={() => onStartChat(item.ownerName, item.avatarUrl, item.title)}
              aria-label="发消息"
              className="w-10 h-10 rounded-full bg-primary-container/20 text-primary flex items-center justify-center hover:bg-primary-container/40 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">chat</span>
            </button>
          </div>

          {/* Description Box */}
          <div className="bg-surface-container-low rounded-2xl p-5 border border-surface-container">
            <h3 className="font-semibold text-base text-on-surface mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">info</span> 物品说明
            </h3>
            <p className="text-sm text-on-surface-variant whitespace-pre-line leading-relaxed">
              {item.description}
            </p>
          </div>
        </section>
      </main>

      {/* Action footer */}
      <div className="absolute bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-surface-container shadow-[0_-4px_24px_rgba(0,0,0,0.05)] pb-6 pt-3 px-5 w-full">
        <div className="text-center mb-3">
          <span className="text-xs text-on-surface-variant flex items-center justify-center gap-1.5 opacity-80">
            <span className="material-symbols-outlined text-[14px]">security</span>
            请按约定时间归还，贵重物品不建议共享。
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className={`flex-1 border text-sm font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer shadow-sm ${
              isFavorited
                ? 'bg-secondary-container/20 text-secondary border-secondary-container'
                : 'bg-surface-container text-on-surface border-surface-container-highest hover:bg-surface-container-high'
            }`}
          >
            <span className={`material-symbols-outlined text-lg ${isFavorited ? 'text-secondary font-bold' : ''}`}>
              {isFavorited ? 'favorite' : 'favorite_border'}
            </span>
            {isFavorited ? '已收藏' : '收藏'}
          </button>
          <button
            onClick={() => onStartChat(item.ownerName, item.avatarUrl, item.title)}
            className="flex-[2] bg-primary text-on-primary text-sm font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-1.5 hover:opacity-90 active:scale-[0.98] transition-all shadow-md shadow-primary/10 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">handshake</span>
            申请借用
          </button>
        </div>
      </div>
    </div>
  );
}
