import React, { useState } from 'react';
import { Screen, SharedItem, BeaconHelp, WarmNote, Notice } from './types';
import { 
  INITIAL_ITEMS,
  INITIAL_BEACONS,
  INITIAL_NOTES,
  INITIAL_NOTICES 
} from './data';

import SplashView from './components/SplashView';
import LoginView from './components/LoginView';
import RadarView from './components/RadarView';
import ShelfView from './components/ShelfView';
import ItemDetailsView from './components/ItemDetailsView';
import NoticeBoardView from './components/NoticeBoardView';
import VoiceInputView from './components/VoiceInputView';
import ConfirmHelpView from './components/ConfirmHelpView';
import WaitingView from './components/WaitingView';
import MatchedView from './components/MatchedView';
import ChatView from './components/ChatView';
import MutualConfirmView from './components/MutualConfirmView';
import WriteThankYouView from './components/WriteThankYouView';
import MyProfileView from './components/MyProfileView';

export default function App() {
  // Screens state
  const [screen, setScreen] = useState<Screen>(Screen.SPLASH);
  
  // Data lists with state persistence in-memory
  const [items, setItems] = useState<SharedItem[]>(INITIAL_ITEMS);
  const [beacons, setBeacons] = useState<BeaconHelp[]>(INITIAL_BEACONS);
  const [notes, setNotes] = useState<WarmNote[]>(INITIAL_NOTES);
  const [notices] = useState<Notice[]>(INITIAL_NOTICES);

  // Transition parameters
  const [selectedItem, setSelectedItem] = useState<SharedItem | null>(null);
  
  // Active chat context
  const [activeChatOwner, setActiveChatOwner] = useState('工具箱小张');
  const [activeChatAvatar, setActiveChatAvatar] = useState('https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&w=400&h=400&q=80');
  const [activeChatContextTitle, setActiveChatContextTitle] = useState('电钻');

  // Input voice transcription
  const [transcriptionText, setTranscriptionText] = useState('我家书架装到一半，想借一个电钻用十分钟。');

  // Global user metrics
  const [creditScore, setCreditScore] = useState(98);
  const [completedCount, setCompletedCount] = useState(12);

  // Navigation handlers
  const handleNextFromSplash = () => setScreen(Screen.LOGIN);
  
  const handleLoginSuccess = (phone: string) => {
    // Navigate straight to active radar!
    setScreen(Screen.RADAR);
  };

  const handleSelectItem = (item: SharedItem) => {
    setSelectedItem(item);
    setScreen(Screen.ITEM_DETAILS);
  };

  const handleAddNewItem = (newItem: Omit<SharedItem, 'id' | 'ownerName' | 'avatarUrl' | 'distance' | 'certified'>) => {
    const itemWithId: SharedItem = {
      ...newItem,
      id: `item-${Date.now()}`,
      ownerName: '我 (邻里之友)',
      avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&h=400&q=80',
      distance: '同小区内',
      certified: true
    };
    setItems(prev => [itemWithId, ...prev]);

    // Also populate a beacon on the radar dynamically!
    const newBeacon: BeaconHelp = {
      id: `beacon-${Date.now()}`,
      title: newItem.title,
      category: newItem.category,
      x: Math.floor(15 + Math.random() * 70),
      y: Math.floor(15 + Math.random() * 70),
      description: newItem.description,
      ownerName: '我 (邻里之友)',
      avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&h=400&q=80'
    };
    setBeacons(prev => [newBeacon, ...prev]);
  };

  const handleAddHelpBroadcast = () => {
    setScreen(Screen.VOICE_INPUT);
  };

  const handleVoiceInputFinished = (transcription: string) => {
    setTranscriptionText(transcription);
    setScreen(Screen.CONFIRM_HELP);
  };

  const handleConfirmHelpBroadcast = (finalContent: string) => {
    setTranscriptionText(finalContent);
    setScreen(Screen.WAITING);
  };

  const handleWaitingMatchSuccess = () => {
    setScreen(Screen.MATCHED);
  };

  const handleMatchedEnterChat = (owner: string, avatar: string) => {
    setActiveChatOwner(owner);
    setActiveChatAvatar(avatar);
    setActiveChatContextTitle('借电钻');
    setScreen(Screen.CHAT);
  };

  const handleDirectChatStart = (owner: string, avatar: string, title: string) => {
    setActiveChatOwner(owner);
    setActiveChatAvatar(avatar);
    setActiveChatContextTitle(title);
    setScreen(Screen.CHAT);
  };

  const handleStartChatFromBeacon = (beacon: BeaconHelp) => {
    setActiveChatOwner(beacon.ownerName);
    setActiveChatAvatar(beacon.avatarUrl);
    setActiveChatContextTitle(beacon.title);
    setScreen(Screen.CHAT);
  };

  const handleChatMutualConfirm = () => {
    setScreen(Screen.MUTUAL_CONFIRM);
  };

  const handleMutualConfirmWriteThanks = () => {
    setScreen(Screen.WRITE_THANKYOU);
  };

  const handleSendThankYouAndPost = (text: string, type: 'yellow' | 'orange' | 'blue') => {
    const thankNote: WarmNote = {
      id: `note-${Date.now()}`,
      text: `“ ${text} ”`,
      timeAgo: '刚刚',
      type,
      icon: 'mood'
    };
    setNotes(prev => [thankNote, ...prev]);
    setCompletedCount(prev => prev + 1);
    setCreditScore(prev => Math.min(prev + 2, 100));
    setScreen(Screen.MY_PROFILE);
  };

  const handleGoHomeFromConfirm = () => {
    setScreen(Screen.RADAR);
  };

  // Sidebar Drawer trigger callbacks
  const handleAnnouncementTrigger = () => {
    setScreen(Screen.NOTICE_BOARD);
  };

  // Rendering matching views based on screen state
  const renderMainContent = () => {
    switch (screen) {
      case Screen.SPLASH:
        return <SplashView onEnter={handleNextFromSplash} />;
      case Screen.LOGIN:
        return <LoginView onLogin={handleLoginSuccess} />;
      case Screen.RADAR:
        return (
          <RadarView
            beacons={beacons}
            onAddHelp={handleAddHelpBroadcast}
            onBeaconChat={handleStartChatFromBeacon}
            onNavigate={(tgt) => {
              if (tgt === 'SHELF') setScreen(Screen.SHARING);
              if (tgt === 'PROFILE') setScreen(Screen.MY_PROFILE);
              if (tgt === 'CHAT') setScreen(Screen.CHAT);
            }}
          />
        );
      case Screen.SHARING:
        return (
          <ShelfView
            items={items}
            onSelectItem={handleSelectItem}
            onAddItem={handleAddNewItem}
          />
        );
      case Screen.ITEM_DETAILS:
        if (!selectedItem) {
          setScreen(Screen.SHARING);
          return null;
        }
        return (
          <ItemDetailsView
            item={selectedItem}
            onBack={() => setScreen(Screen.SHARING)}
            onStartChat={handleDirectChatStart}
          />
        );
      case Screen.NOTICE_BOARD:
        return (
          <NoticeBoardView
            notices={notices}
            onBack={() => setScreen(Screen.RADAR)}
          />
        );
      case Screen.VOICE_INPUT:
        return (
          <VoiceInputView
            onBack={() => setScreen(Screen.RADAR)}
            onNext={handleVoiceInputFinished}
          />
        );
      case Screen.CONFIRM_HELP:
        return (
          <ConfirmHelpView
            transcription={transcriptionText}
            onBack={() => setScreen(Screen.VOICE_INPUT)}
            onConfirm={handleConfirmHelpBroadcast}
          />
        );
      case Screen.WAITING:
        return (
          <WaitingView
            onSpeedUpMatch={handleWaitingMatchSuccess}
            onCancel={() => setScreen(Screen.RADAR)}
          />
        );
      case Screen.MATCHED:
        return (
          <MatchedView
            onEnterChat={handleMatchedEnterChat}
            onCancel={() => setScreen(Screen.RADAR)}
          />
        );
      case Screen.CHAT:
        return (
          <ChatView
            ownerName={activeChatOwner}
            avatarUrl={activeChatAvatar}
            contextTitle={activeChatContextTitle}
            onBack={() => setScreen(Screen.RADAR)}
            onMutualConfirm={handleChatMutualConfirm}
          />
        );
      case Screen.MUTUAL_CONFIRM:
        return (
          <MutualConfirmView
            onWriteThankYou={handleMutualConfirmWriteThanks}
            onGoHome={handleGoHomeFromConfirm}
          />
        );
      case Screen.WRITE_THANKYOU:
        return (
          <WriteThankYouView
            onSendThankYou={handleSendThankYouAndPost}
            onBack={() => setScreen(Screen.MY_PROFILE)}
          />
        );
      case Screen.MY_PROFILE:
        return (
          <MyProfileView
            notesList={notes}
            completedCount={completedCount}
            creditScore={creditScore}
          />
        );
      default:
        return <SplashView onEnter={handleNextFromSplash} />;
    }
  };

  // Avoid drawing top navigation or layouts during linear flows to align with Material guidelines
  const isLinearWorkflow = 
    screen === Screen.SPLASH || 
    screen === Screen.LOGIN || 
    screen === Screen.ITEM_DETAILS ||
    screen === Screen.VOICE_INPUT ||
    screen === Screen.CONFIRM_HELP ||
    screen === Screen.WAITING ||
    screen === Screen.MATCHED ||
    screen === Screen.CHAT ||
    screen === Screen.MUTUAL_CONFIRM ||
    screen === Screen.WRITE_THANKYOU;

  return (
    <div className="bg-[#ebd9c5]/30 text-[#1c1c17] antialiased min-h-screen flex flex-col items-center justify-center py-0 sm:py-6 selection:bg-primary/10 relative overflow-x-hidden">
      
      {/* Background soft lighting shapes for gorgeous desktop desktop aesthetics */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#a8c69f]/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#ffbc73]/10 blur-[120px] pointer-events-none"></div>

      {/* Top Device Sandbox Console Header - Desktop Only */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-[390px] mb-3 bg-white/85 backdrop-blur-md py-2.5 px-4 rounded-2xl border border-surface-container/55 shadow-[0_2px_12px_rgba(45,70,53,0.04)] z-50">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary text-base">phone_iphone</span>
          <span className="text-[11px] font-black tracking-wider text-slate-800">搭把手 · 智能邻里端</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10px] font-bold text-slate-500">亚洲华人沙盒</span>
        </div>
      </div>

      {/* Main High-Fidelity Smartphone Simulator */}
      <div className="relative w-full h-screen sm:w-[390px] sm:h-[844px] bg-[#fdf9f1] sm:rounded-[52px] sm:border-[11px] sm:border-[#1e293b] sm:shadow-[0_25px_60px_-15px_rgba(45,70,53,0.25)] flex flex-col overflow-hidden sm:ring-4 sm:ring-slate-800/10 shrink-0 select-none">
        
        {/* iOS-Style Device Bezel Speaker & Status Bar Container */}
        <div className="shrink-0 h-11 bg-[#fdf9f1] px-6 select-none flex items-center justify-between text-xs font-bold text-slate-800 z-50 relative">
          <div className="text-[13px] font-extrabold tracking-tight">09:41</div>
          
          {/* Dynamic Island Notch */}
          <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-26 h-5.5 bg-black rounded-full flex items-center justify-center gap-1.5 py-1 px-3 shadow-inner">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1c1c1f]"></div>
            <div className="w-1 h-1 bg-[#0b2149] rounded-full ml-auto"></div>
          </div>
          
          <div className="flex items-center gap-1.5 font-extrabold text-slate-700">
            <span className="material-symbols-outlined text-[13px] font-bold">wifi</span>
            <span className="text-[9px] tracking-tighter">5G</span>
            <span className="material-symbols-outlined text-[15px] font-bold text-emerald-600 rotate-90">battery_5_bar</span>
          </div>
        </div>

        {/* Outer scrolling slot containing the screens */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          
          {/* Top Header inside smartphone (Hide on linear pages) */}
          {!isLinearWorkflow && (
            <header className="bg-[#fdf9f1] shrink-0 z-40 transition-shadow duration-300 border-b border-surface-container/60">
              <div className="flex justify-between items-center px-4 h-14 w-full">
                <button 
                  onClick={handleAnnouncementTrigger}
                  className="text-[#4a6545] hover:bg-[#ece8e0] transition-colors p-2 rounded-full flex items-center justify-center cursor-pointer"
                  title="社区公告与凑单"
                >
                  <span className="material-symbols-outlined text-xl">menu_book</span>
                </button>
                <div className="flex-1 flex items-center justify-center gap-1.5 select-none font-bold">
                  <div className="w-5.5 h-5.5 rounded-md overflow-hidden shadow-xxs shrink-0">
                    <img src="/e2ac1cc73c8e8b5ba09a5875f769aef0.png" alt="搭把手 Logo" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-black text-[#d87532] text-base tracking-wider">搭把手</span>
                </div>
                <button 
                  onClick={() => setScreen(Screen.MY_PROFILE)}
                  className="text-[#4a6545] hover:bg-[#ece8e0] transition-colors w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-surface-container shadow-xs cursor-pointer border border-[#ece8e0]"
                  title="我的主页"
                >
                  <img
                    alt="Profile logo"
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&h=400&q=80"
                    referrerPolicy="no-referrer"
                  />
                </button>
              </div>
            </header>
          )}

          {/* Main View Area with inner flex scrolling */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col no-scrollbar">
            {renderMainContent()}
          </div>

          {/* Bottom Virtual Tab Navigation Bar (Hide on linear views) */}
          {!isLinearWorkflow && (
            <nav className="absolute bottom-0 left-0 right-0 z-50 flex justify-around items-center pt-2 pb-5 px-2 bg-white/95 backdrop-blur-md shadow-[0_-5px_20px_rgba(45,70,53,0.06)] border-t border-surface-container/50">
              {/* Tab 1: 雷达 */}
              <button
                onClick={() => setScreen(Screen.RADAR)}
                className={`flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all active:scale-95 cursor-pointer ${
                  screen === Screen.RADAR
                    ? 'text-primary font-black'
                    : 'text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: screen === Screen.RADAR ? "'FILL' 1" : "'FILL' 0" }}>explore</span>
                <span className="text-[10px] font-bold mt-0.5">邻里雷达</span>
              </button>

              {/* Tab 2: 货架 */}
              <button
                onClick={() => setScreen(Screen.SHARING)}
                className={`flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all active:scale-95 cursor-pointer ${
                  screen === Screen.SHARING || screen === Screen.ITEM_DETAILS
                    ? 'text-primary font-black'
                    : 'text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: screen === Screen.SHARING ? "'FILL' 1" : "'FILL' 0" }}>grid_view</span>
                <span className="text-[10px] font-bold mt-0.5">共享货架</span>
              </button>

              {/* Tab 3: 临时会话 */}
              <button
                onClick={() => setScreen(Screen.CHAT)}
                className={`flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all active:scale-95 cursor-pointer relative ${
                  screen === Screen.CHAT
                    ? 'text-primary font-black'
                    : 'text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: screen === Screen.CHAT ? "'FILL' 1" : "'FILL' 0" }}>chat_bubble</span>
                {screen !== Screen.CHAT && (
                  <span className="absolute top-1 right-3.5 w-2 h-2 bg-error rounded-full border border-white"></span>
                )}
                <span className="text-[10px] font-bold mt-0.5">临时会话</span>
              </button>

              {/* Tab 4: 暖心墙(我的) */}
              <button
                onClick={() => setScreen(Screen.MY_PROFILE)}
                className={`flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all active:scale-95 cursor-pointer ${
                  screen === Screen.MY_PROFILE
                    ? 'text-primary font-black'
                    : 'text-on-surface-variant'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: screen === Screen.MY_PROFILE ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                <span className="text-[10px] font-bold mt-0.5">暖心墙</span>
              </button>
            </nav>
          )}

        </div>

        {/* iOS physical Home Indicator bar bottom area */}
        <div className="shrink-0 h-4 bg-white/95 pb-1 flex items-center justify-center z-50 relative">
          <div className="w-28 h-1 bg-slate-900/40 rounded-full"></div>
        </div>

      </div>
    </div>
  );
}
