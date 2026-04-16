export const REWARD_STAGES = Object.freeze({
  stamp: {
    threshold: 100,
    name: '打卡盖章',
  },
  prize1: {
    threshold: 180,
    name: '糖果 2 个',
  },
  prize2: {
    threshold: 240,
    name: '小黄鸭 1 个',
  },
})

export const GAME_CATALOG = Object.freeze([
  {
    id: 'guess-number',
    title: '二分答案',
    summary: '随机一个整数供用户猜测，猜错会提示猜大或猜小，步数越少得分越高。',
    route: '/games/guess-number',
  },
  {
    id: 'adjacent-swap',
    title: '冒泡排序',
    summary: '交换相邻的数字给一个序列排序，步数越少得分越高。',
    route: '/games/adjacent-swap',
  },
  {
    id: 'tower-of-hanoi',
    title: '四层汉诺塔',
    summary: '把四层圆盘移到目标柱，步数越少得分越高。',
    route: '/games/tower-of-hanoi',
  },
])
