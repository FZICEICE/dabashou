import React, { useState, useMemo } from 'react';
import { Notice } from '../types';

interface NoticeBoardViewProps {
  notices: Notice[];
  onBack: () => void;
}

type NoticeCategory = '全部' | '官方通知' | '邻里活动' | '温馨提醒' | '社区凑单';

export default function NoticeBoardView({ notices, onBack }: NoticeBoardViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<NoticeCategory>('全部');
  const [expandedNoticeId, setExpandedNoticeId] = useState<string | null>(null);

  // Filter notices
  const filteredNotices = useMemo(() => {
    return notices.filter((notice) => {
      // Category filter
      if (selectedCategory !== '全部' && notice.category !== selectedCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = notice.title.toLowerCase().includes(query);
        const matchesCont = notice.content.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCont) {
          return false;
        }
      }
      return true;
    });
  }, [notices, selectedCategory, searchQuery]);

  return (
    <div className="flex-1 w-full max-w-xl mx-auto px-4 pt-4 pb-32">
      {/* Header */}
      <header className="flex justify-between items-center h-16 mb-2">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center text-primary hover:bg-surface-container rounded-full transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold text-primary tracking-tight">社区公告栏</h1>
        <button className="w-10 h-10 flex items-center justify-center text-primary hover:bg-surface-container rounded-full transition-colors">
          <span className="material-symbols-outlined">filter_list</span>
        </button>
      </header>

      {/* Main Container */}
      <div className="space-y-5">
        {/* Search */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-xl">search</span>
          <input
            className="w-full h-14 pl-12 pr-4 bg-surface-container-low border border-transparent focus:border-primary focus:ring-0 rounded-full text-sm placeholder-on-surface-variant/60 shadow-sm text-on-surface transition-colors"
            placeholder="搜索公告或活动..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category horizontal scrolling bar */}
        <div className="flex overflow-x-auto no-scrollbar gap-2.5 pb-2">
          {(['全部', '官方通知', '邻里活动', '温馨提醒', '社区凑单'] as NoticeCategory[]).map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Notice List rendering */}
        {filteredNotices.length === 0 ? (
          <div className="text-center py-10 bg-white/40 rounded-2xl border border-dashed border-outline-variant/60">
            <span className="material-symbols-outlined text-4xl text-outline mb-2">campaign</span>
            <p className="text-sm text-on-surface-variant">暂无相关公告或活动</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredNotices.map((notice) => {
              let icon = 'campaign';
              let iconBg = 'bg-error-container text-on-error-container';
              let tagColor = 'text-error bg-error-container/40';

              if (notice.category === '邻里活动') {
                icon = 'local_florist';
                iconBg = 'bg-secondary-container text-on-secondary-container';
                tagColor = 'text-secondary bg-secondary-container/30';
              } else if (notice.category === '温馨提醒') {
                icon = 'water_drop';
                iconBg = 'bg-tertiary-container text-on-tertiary-container';
                tagColor = 'text-tertiary bg-tertiary-container/30';
              } else if (notice.category === '社区凑单') {
                icon = 'shopping_basket';
                iconBg = 'bg-primary-container text-on-primary-container';
                tagColor = 'text-primary bg-primary-container/30';
              }

              const isExpanded = expandedNoticeId === notice.id;

              return (
                <article
                  key={notice.id}
                  onClick={() => setExpandedNoticeId(isExpanded ? null : notice.id)}
                  className="bg-white rounded-xl p-5 shadow-healing hover:shadow-[0_8px_20px_rgba(168,198,159,0.15)] border border-surface-variant/40 cursor-pointer group transition-all duration-300 relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${iconBg}`}>
                        <span className="material-symbols-outlined text-sm font-semibold">{icon}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${tagColor}`}>
                        {notice.category}
                      </span>
                    </div>
                    <span className="text-[11px] text-on-surface-variant/75">{notice.time}</span>
                  </div>

                  <h3 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors mb-1.5 leading-snug">
                    {notice.title}
                  </h3>

                  {notice.location && (
                    <div className="flex items-center gap-1 text-[11px] text-on-surface-variant mb-2">
                      <span className="material-symbols-outlined text-xs">location_on</span>
                      <span>{notice.location}</span>
                    </div>
                  )}

                  <p className={`text-xs text-on-surface-variant leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                    {notice.content}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-dashed border-outline-variant/30 flex justify-end text-[11px] font-bold text-primary mr-1">
                    {isExpanded ? '点击折叠' : '展开阅读全文'}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
