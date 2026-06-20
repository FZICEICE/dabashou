import React, { useState, useMemo } from 'react';
import { SharedItem } from '../types';

interface ShelfViewProps {
  items: SharedItem[];
  onSelectItem: (item: SharedItem) => void;
  onAddItem: (newItem: Omit<SharedItem, 'id' | 'ownerName' | 'avatarUrl' | 'distance' | 'certified'>) => void;
}

type CategoryFilter = '全部' | '工具' | '生活' | '出行';

export default function ShelfView({ items, onSelectItem, onAddItem }: ShelfViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'borrow' | 'share'>('borrow');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('全部');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states for new item addition
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<'工具' | '生活' | '出行'>('生活');
  const [newDuration, setNewDuration] = useState('1小时内');

  // Filter items dynamically
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Category filter
      if (selectedCategory !== '全部' && item.category !== selectedCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCat) {
          return false;
        }
      }
      return true;
    });
  }, [items, selectedCategory, searchQuery]);

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddItem({
      title: newTitle,
      description: newDesc || '这是一个好心的社区邻居发起的共享物品。',
      category: newCategory,
      status: '可借用',
      duration: newDuration,
      imgUrl: newCategory === '工具'
        ? 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&h=400&q=80'
        : newCategory === '出行'
        ? 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&h=400&q=80'
        : 'https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&w=600&h=400&q=80'
    });

    // Reset fields
    setNewTitle('');
    setNewDesc('');
    setNewCategory('生活');
    setNewDuration('1小时内');
    setShowAddModal(false);
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-6 px-4 pt-2 pb-32 relative">
      {/* Page Header & Search */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-on-surface">共享货架</h2>

        {/* Search Bar */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-outline text-xl">search</span>
          </div>
          <input
            type="text"
            className="w-full bg-surface-container-low text-on-surface placeholder-on-surface-variant/70 rounded-full py-4 pl-11 pr-4 border-none focus:ring-1 focus:ring-primary focus:bg-white transition-all duration-300 shadow-sm text-sm outline-none"
            placeholder="搜索雨伞、电钻、推车..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Type Tabs */}
        <div className="flex bg-surface-container-low p-1 rounded-full w-full max-w-xs self-start">
          <button
            onClick={() => setActiveTab('borrow')}
            className={`flex-1 py-2 px-4 rounded-full text-xs font-semibold transition-all duration-200 text-center cursor-pointer ${
              activeTab === 'borrow'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            我想借
          </button>
          <button
            onClick={() => {
              setActiveTab('share');
              // Let's open creation directly for delight or guide them to add list
              setShowAddModal(true);
            }}
            className={`flex-1 py-2 px-4 rounded-full text-xs font-semibold transition-all duration-200 text-center cursor-pointer ${
              activeTab === 'share'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            我可共享
          </button>
        </div>
      </section>

      {/* Categories Chips */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 pt-1 scroll-smooth">
        {(['全部', '工具', '生活', '出行'] as CategoryFilter[]).map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-secondary-container/40 text-on-secondary-container border-secondary-container/55 shadow-sm'
                  : 'bg-surface-container text-on-surface-variant border-transparent hover:bg-surface-container-high'
              }`}
            >
              {cat === '全部' ? '全部' : cat === '工具' ? '工具用具' : cat === '生活' ? '生活用品' : '出行工具'}
            </button>
          );
        })}
      </div>

      {/* Item List */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-white/40 border border-dashed border-outline-variant/50 rounded-2xl p-6">
          <span className="material-symbols-outlined text-4xl text-outline/65 mb-2">inventory_2</span>
          <p className="text-sm text-on-surface-variant">在此类别下暂无邻居发布的共享物品</p>
          <button
            onClick={() => {
              setSelectedCategory('全部');
              setSearchQuery('');
            }}
            className="mt-3 text-xs text-primary font-bold hover:underline cursor-pointer"
          >
            清除搜索与筛选
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 shadow-healing hover:shadow-[0_8px_24px_rgba(168,198,159,0.18)] hover:-translate-y-[1px] transition-all duration-300 flex flex-col gap-3 border border-surface-container-highest/60 relative overflow-hidden group"
            >
              <div className="flex items-start gap-4">
                {/* Product thumbnail */}
                <div className="w-20 h-20 rounded-xl bg-surface-container-high overflow-hidden flex-shrink-0 relative shadow-sm">
                  <img
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={item.imgUrl}
                  />
                </div>

                {/* Details text */}
                <div className="flex flex-col flex-1 gap-1 min-w-0">
                  <h3 className="font-bold text-base text-on-surface truncate group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1 text-on-surface-variant">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    <span className="text-xs truncate">{item.distance}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary-container/30 text-on-primary-container text-[11px] font-bold">
                      {item.status}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface-variant text-[11px] font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer detail trigger */}
              <div className="mt-1 pt-2.5 border-t border-surface-container-high/40 flex justify-between items-center">
                <span className="text-[11px] text-on-surface-variant font-medium">
                  借用：{item.duration || '不限时'}
                </span>
                <button
                  onClick={() => onSelectItem(item)}
                  className="text-xs font-bold text-primary hover:text-primary-container transition-colors flex items-center gap-1 cursor-pointer"
                >
                  查看详情
                  <span className="material-symbols-outlined text-sm font-semibold">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Plus button for listing product */}
      <button
        onClick={() => setShowAddModal(true)}
        className="absolute bottom-20 right-4 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 z-40 cursor-pointer"
        title="上传共享物品"
      >
        <span className="material-symbols-outlined text-3xl font-bold">add</span>
      </button>

      {/* Modal Overlay for Adding Shared Item */}
      {showAddModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl border border-surface-container-highest animate-[scaleIn_0.2s_ease-out]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary">volunteer_activism</span>
                新增共享物品
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setActiveTab('borrow');
                }}
                className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center cursor-pointer text-outline"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateItem} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">物品名称</label>
                <input
                  type="text"
                  required
                  placeholder="如：双铝防风人字楼梯、双人防潮垫"
                  className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 h-11"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">详情介绍</label>
                <textarea
                  rows={2}
                  placeholder="物品的使用注意事项，例如：载重最大300斤，用后请放回箱子里。"
                  className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                ></textarea>
              </div>

              {/* Row: Category and Duration */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">分类</label>
                  <select
                    className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl px-3 py-2 text-sm h-11 focus:border-primary focus:ring-0"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                  >
                    <option value="工具">工具/用具</option>
                    <option value="生活">生活用品</option>
                    <option value="出行">出行工具</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">借用期限</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl px-3 py-2 text-sm h-11 focus:border-primary focus:ring-0"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setActiveTab('borrow');
                  }}
                  className="flex-1 py-3 border border-outline-variant text-on-surface-variant bg-white text-xs font-bold rounded-full hover:bg-surface-container-low cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#4a6545] text-white text-xs font-bold rounded-full hover:opacity-90 shadow-md cursor-pointer"
                >
                  确认发布到货架
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
