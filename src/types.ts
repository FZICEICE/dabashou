export enum Screen {
  SPLASH = 'SPLASH',
  LOGIN = 'LOGIN',
  RADAR = 'RADAR',
  SHARING = 'SHARING',
  ITEM_DETAILS = 'ITEM_DETAILS',
  NOTICE_BOARD = 'NOTICE_BOARD',
  VOICE_INPUT = 'VOICE_INPUT',
  CONFIRM_HELP = 'CONFIRM_HELP',
  WAITING = 'WAITING',
  MATCHED = 'MATCHED',
  CHAT = 'CHAT',
  MUTUAL_CONFIRM = 'MUTUAL_CONFIRM',
  WRITE_THANKYOU = 'WRITE_THANKYOU',
  MY_PROFILE = 'MY_PROFILE'
}

export interface SharedItem {
  id: string;
  title: string;
  ownerName: string;
  avatarUrl: string;
  distance: string;
  status: '可借用' | '已借出' | '共享中';
  category: '工具' | '生活' | '出行';
  description: string;
  imgUrl: string;
  duration?: string;
  certified?: boolean;
}

export interface BeaconHelp {
  id: string;
  title: string;
  category: '工具' | '生活' | '出行';
  x: number; // percentage coordinate top-left
  y: number; // percentage coordinate top-left
  description: string;
  ownerName: string;
  avatarUrl: string;
}

export interface ChatMessage {
  id: string;
  sender: 'me' | 'neighbor' | 'system';
  text: string;
  time: string;
  status?: '已读' | '未读';
}

export interface WarmNote {
  id: string;
  text: string;
  timeAgo: string;
  type: 'yellow' | 'orange' | 'blue';
  icon: string;
}

export interface Notice {
  id: string;
  title: string;
  category: '官方通知' | '邻里活动' | '温馨提醒' | '社区凑单';
  time: string;
  content: string;
  location?: string;
  important?: boolean;
}
