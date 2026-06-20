import React from 'react';
import { WarmNote } from '../types';

interface MyProfileViewProps {
  notesList: WarmNote[];
  completedCount: number;
  creditScore: number;
}

export default function MyProfileView({ notesList, completedCount, creditScore }: MyProfileViewProps) {
  return (
    <div className="flex-1 w-full max-w-xl mx-auto px-4 py-4 flex flex-col gap-6 pb-32">
      {/* Top Profile Premium card */}
      <section className="bg-surface-container-low border border-surface-variant rounded-2xl p-5 shadow-sm relative overflow-hidden group">
        {/* Glow ambient circle blob */}
        <div className="absolute -right-16 -top-16 w-48 h-48 bg-primary-container/20 rounded-full blur-2xl group-hover:bg-primary-container/25 transition-colors duration-700"></div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          {/* Avatar holding profile frame */}
          <div className="w-20 h-20 shrink-0 rounded-full overflow-hidden border-2 border-white shadow-sm relative">
            <img
              alt="User avatar"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&h=400&q=80"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex-1 flex flex-col items-center sm:items-start">
            <h2 className="text-xl font-bold text-on-surface flex items-center gap-1.5 justify-center sm:justify-start">
              邻里之友
              <span
                className="material-symbols-outlined text-secondary text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
                title="认证用户"
              >
                verified
              </span>
            </h2>

            {/* Quick status stats badges */}
            <div className="mt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 bg-tertiary-container/30 text-on-tertiary-container rounded-full">
                <span className="material-symbols-outlined text-[14px]">volunteer_activism</span>
                已帮助 {completedCount} 次
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 bg-primary-container/30 text-on-primary-container rounded-full">
                <span className="material-symbols-outlined text-[14px]">star</span>
                信誉积分 {creditScore}
              </span>
            </div>

            <span className="mt-3 inline-flex items-center gap-1 text-xs text-primary font-bold hover:underline cursor-pointer group/link">
              查看邻居留下的感言
              <span className="material-symbols-outlined text-xs group-hover/link:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Menu Actions Bento Grid */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Box 1 */}
        <div
          onClick={() => alert('我的求助记录：2条历史请求已圆满自闭，感谢好心邻居！')}
          className="bg-surface-container border border-surface-variant/40 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-surface-container-high transition-transform duration-200 hover:-translate-y-0.5 shadow-xxs"
        >
          <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-lg">live_help</span>
          </div>
          <span className="text-xs font-bold text-on-surface">我的求助</span>
        </div>

        {/* Box 2 */}
        <div
          onClick={() => alert('我的共享：已上传：[博世手电钻] 正在共享中。共借出过5次。')}
          className="bg-surface-container border border-surface-variant/40 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-surface-container-high transition-transform duration-200 hover:-translate-y-0.5 shadow-xxs"
        >
          <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-lg">inventory_2</span>
          </div>
          <span className="text-xs font-bold text-on-surface">我的共享</span>
        </div>

        {/* Box 3 */}
        <div
          onClick={() => alert('隐私设置：系统已经自动对具体门牌地址、私人手机号进行脱敏，请放心使用。')}
          className="bg-surface-container border border-surface-variant/40 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-surface-container-high transition-transform duration-200 hover:-translate-y-0.5 shadow-xxs"
        >
          <div className="w-10 h-10 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-lg">security</span>
          </div>
          <span className="text-xs font-bold text-on-surface">隐私设置</span>
        </div>

        {/* Box 4 */}
        <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
          <a
            onClick={() => alert('已载入举报与防打扰拉黑面板')}
            className="flex-1 bg-surface-container border border-surface-variant/40 hover:bg-surface-container-high transition-colors rounded-xl p-2.5 flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-error text-base">block</span>
            <span className="text-xs font-bold text-on-surface">举报与拉黑</span>
          </a>
          <a
            onClick={() => {
              const feedback = prompt('请输入您的意见：');
              if (feedback) alert('感谢您的支持与反馈，搭把手团队将不断优化用户体验！');
            }}
            className="flex-1 bg-surface-container border border-surface-variant/40 hover:bg-surface-container-high transition-colors rounded-xl p-2.5 flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-outline text-base">help_outline</span>
            <span className="text-xs font-bold text-on-surface">意见反馈</span>
          </a>
        </div>
      </section>

      {/* Wall of Gratitude (暖心墙) */}
      <section className="mt-2 text-center sm:text-left">
        <div className="flex items-center justify-between mb-4 border-b border-surface-container pb-2">
          <h3 className="text-base font-extrabold text-on-surface flex items-center gap-1.5 justify-center sm:justify-start">
            <span className="material-symbols-outlined text-secondary animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            <span>暖心墙</span>
          </h3>
          <span className="text-[11px] text-on-surface-variant font-bold">来自社区的爱心接力</span>
        </div>

        {/* Post-it Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {notesList.map((note) => {
            let colorClass = 'bg-[#FFF9C4] text-[#5D4037] border-[#F3E5AB]/60 rotate-[-1deg]';
            if (note.type === 'orange') {
              colorClass = 'bg-secondary-fixed text-on-secondary-container border-secondary-container/30 rotate-[1deg]';
            } else if (note.type === 'blue') {
              colorClass = 'bg-tertiary-fixed text-on-tertiary-fixed-variant border-tertiary-container/30 rotate-[-2deg]';
            }

            let mIcon = note.icon;

            return (
              <div
                key={note.id}
                className={`rounded-xl p-5 shadow-sm hover:shadow-md hover:rotate-0 transition-all duration-300 relative border ${colorClass}`}
              >
                <span className="material-symbols-outlined absolute top-3 left-4 text-xs font-semibold opacity-30 select-none">
                  format_quote
                </span>
                <p className="text-xs font-bold leading-relaxed mb-3 text-center px-1 break-words">
                  {note.text}
                </p>
                <div className="flex items-center justify-between gap-2 opacity-65 text-[10px] font-bold border-t border-black/10 pt-2">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">{mIcon || 'mood'}</span>
                    <span>{note.timeAgo || '刚刚'}</span>
                  </div>
                  <span className="opacity-80">To: 邻居</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
