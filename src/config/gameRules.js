export const REWARD_STAGES = Object.freeze({
  stamp: {
    threshold: 100,
    name: 'qwq',
  },
  prize1: {
    threshold: 180,
    name: 'abc',
  },
  prize2: {
    threshold: 240,
    name: 'awa',
  },
})

export const GAME_CATALOG = Object.freeze([
  {
    id: 'guess-number',
    title: '二分答案',
    summary: '随机整数，高低提示，步数越接近理论最优越好。',
    route: '/games/guess-number',
  },
  {
    id: 'adjacent-swap',
    title: '冒泡排序',
    summary: '只能交换相邻两个数字，越接近逆序对下界越高分。',
    route: '/games/adjacent-swap',
  },
  {
    id: 'tower-of-hanoi',
    title: '四层汉诺塔',
    summary: '把四层圆盘移到目标柱，越接近 15 步满分越高。',
    route: '/games/tower-of-hanoi',
  },
])
