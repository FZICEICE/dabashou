import { SharedItem, BeaconHelp, WarmNote, Notice } from './types';

export const INITIAL_ITEMS: SharedItem[] = [
  {
    id: 'item-1',
    title: '电钻 (博世12V)',
    ownerName: '工具箱小张',
    avatarUrl: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&w=400&h=400&q=80',
    distance: '约100米内',
    status: '可借用',
    category: '工具',
    description: '博世家用手电钻，带各种常用钻头。打孔上螺丝很方便。借用前请确保了解基本操作。请爱惜使用，用完清理干净后归还。',
    imgUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&h=400&q=80',
    duration: '30分钟内',
    certified: true
  },
  {
    id: 'item-2',
    title: '大号长柄雨伞',
    ownerName: '王大伯',
    avatarUrl: 'https://images.unsplash.com/photo-1489980508314-941910ded1f4?auto=format&fit=crop&w=400&h=400&q=80',
    distance: '同小区 (3号楼)',
    status: '可借用',
    category: '生活',
    description: '一把结实的高强度双层防风长柄伞，非常适合暴雨大风天。放在玄关，有需要自取。',
    imgUrl: 'https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&w=600&h=400&q=80',
    duration: '2小时内',
    certified: true
  },
  {
    id: 'item-3',
    title: '折叠小推车 (搬快递神器)',
    ownerName: '王阿姨',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=400&q=80',
    distance: '附近楼栋 (5号楼)',
    status: '可借用',
    category: '出行',
    description: '非常结实便携的折叠两轮小拉车。承重好，适合搬运大件快递、猫砂或者超重货物，省力又稳重。用完请擦拭干净哦。',
    imgUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&h=400&q=80',
    duration: '1小时内',
    certified: false
  }
];

export const INITIAL_BEACONS: BeaconHelp[] = [
  {
    id: 'beacon-1',
    title: '闲置工具',
    category: '工具',
    x: 65,
    y: 25,
    description: '家里有闲置不用的手套 and 园艺剪刀，有需要的邻居可以直接来取。',
    ownerName: '草莓农友',
    avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&h=400&q=80'
  },
  {
    id: 'beacon-2',
    title: '需要梯子',
    category: '生活',
    x: 25,
    y: 65,
    description: '想借用一下超过2.5米的折叠人字梯，用来换吊灯的灯油 and 灯泡。',
    ownerName: '小李',
    avatarUrl: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&w=400&h=400&q=80'
  },
  {
    id: 'beacon-3',
    title: '草莓拼单',
    category: '出行',
    x: 70,
    y: 75,
    description: '生态农场有机牛奶草莓拼单，5斤包邮。已满3人，再来2个顺风车拼一箱。',
    ownerName: '草莓派对',
    avatarUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&h=400&q=80'
  }
];

export const INITIAL_NOTES: WarmNote[] = [
  {
    id: 'note-1',
    text: '“ 谢谢邻居帮我把快递搬上楼。太感谢了！ ”',
    timeAgo: '2天前',
    type: 'yellow',
    icon: 'mood'
  },
  {
    id: 'note-2',
    text: '“ 谢谢王阿姨借给我雨伞。昨天下大暴雨多亏了您！ ”',
    timeAgo: '上周',
    type: 'orange',
    icon: 'umbrella'
  },
  {
    id: 'note-3',
    text: '“ 谢谢小张借我电钻，书架终于装好了。手艺真棒！ ”',
    timeAgo: '1个月前',
    type: 'blue',
    icon: 'build'
  }
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'notice-1',
    title: '关于本周末社区爱心义卖的通知',
    category: '官方通知',
    time: '今天',
    content: '各位居民，本周末将在社区中心广场举办爱心义卖活动，所得款项将全部用于社区绿化基金。欢迎大家踊跃捐赠家中闲置的旧书、玩具或手工艺品，并在周日过来逛逛买买，共建和谐美好的绿色社区！',
    important: true
  },
  {
    id: 'notice-2',
    title: '邻里活动：周六下午草坪读书会',
    category: '邻里活动',
    time: '明天',
    content: '周六下午15:00在社区中心大草坪举办亲子自然读书会，本期分享书籍为《森林的奥秘》。现场备有免费的手作柠檬红茶、软垫和驱蚊香包。请大家带上一本自己喜欢的书，分享您与风、森林或河流的故事。',
    location: '社区中心草坪'
  },
  {
    id: 'notice-3',
    title: '温馨提醒：雨季来临，请记得关好窗户',
    category: '温馨提醒',
    time: '2天前',
    content: '气象台发布黄色暴雨预警。近期我市将进入连绵阴雨期，多伴有阵雨和大风，请一楼和靠近顶层露台的住户记得及时关好窗户，清理阳台地漏，收回晾晒衣物。出行请备好雨具，减速慢行。',
    important: false
  },
  {
    id: 'notice-4',
    title: '社区凑单：优质有机蔬菜团购',
    category: '社区凑单',
    time: '3天前',
    content: '直供基地直达，满50人自动发车！纯绿色无公害蔬菜礼包：含春卷白菜、水果黄瓜、红薯叶及高山土豆，共计10斤仅需29.9元。新鲜无添加，本周五统一派发至各楼栋管家岗，快来报数！'
  }
];
