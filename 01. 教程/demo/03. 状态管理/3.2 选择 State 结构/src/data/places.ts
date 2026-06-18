/**
 * 原则5：避免深度嵌套的 state
 * 将树状结构扁平化为"表"结构：每个节点存储其子节点的 ID 列表，
 * 而不是存储子节点对象本身。这样更新时只需修改两个层级：
 * 1. 父级节点的 childIds
 * 2. 根级"表"对象
 */

export interface Place {
  id: number;
  title: string;
  childIds: number[];
}

export type TravelPlan = Record<number, Place>;

export const initialTravelPlan: TravelPlan = {
  0: {
    id: 0,
    title: '(根)',
    childIds: [1, 42, 46],
  },
  1: {
    id: 1,
    title: '地球',
    childIds: [2, 10, 19, 26, 34],
  },
  2: {
    id: 2,
    title: '非洲',
    childIds: [3, 4, 5, 6, 7, 8, 9],
  },
  3: {
    id: 3,
    title: '博茨瓦纳',
    childIds: [],
  },
  4: {
    id: 4,
    title: '埃及',
    childIds: [],
  },
  5: {
    id: 5,
    title: '肯尼亚',
    childIds: [],
  },
  6: {
    id: 6,
    title: '马达加斯加',
    childIds: [],
  },
  7: {
    id: 7,
    title: '摩洛哥',
    childIds: [],
  },
  8: {
    id: 8,
    title: '尼日利亚',
    childIds: [],
  },
  9: {
    id: 9,
    title: '南非',
    childIds: [],
  },
  10: {
    id: 10,
    title: '美洲',
    childIds: [11, 12, 13, 14, 15, 16, 17, 18],
  },
  11: {
    id: 11,
    title: '阿根廷',
    childIds: [],
  },
  12: {
    id: 12,
    title: '巴西',
    childIds: [],
  },
  13: {
    id: 13,
    title: '巴巴多斯',
    childIds: [],
  },
  14: {
    id: 14,
    title: '加拿大',
    childIds: [],
  },
  15: {
    id: 15,
    title: '牙买加',
    childIds: [],
  },
  16: {
    id: 16,
    title: '墨西哥',
    childIds: [],
  },
  17: {
    id: 17,
    title: '特立尼达和多巴哥',
    childIds: [],
  },
  18: {
    id: 18,
    title: '委内瑞拉',
    childIds: [],
  },
  19: {
    id: 19,
    title: '亚洲',
    childIds: [20, 21, 22, 23, 24, 25],
  },
  20: {
    id: 20,
    title: '中国',
    childIds: [],
  },
  21: {
    id: 21,
    title: '印度',
    childIds: [],
  },
  22: {
    id: 22,
    title: '新加坡',
    childIds: [],
  },
  23: {
    id: 23,
    title: '韩国',
    childIds: [],
  },
  24: {
    id: 24,
    title: '泰国',
    childIds: [],
  },
  25: {
    id: 25,
    title: '越南',
    childIds: [],
  },
  26: {
    id: 26,
    title: '欧洲',
    childIds: [27, 28, 29, 30, 31, 32, 33],
  },
  27: {
    id: 27,
    title: '克罗地亚',
    childIds: [],
  },
  28: {
    id: 28,
    title: '法国',
    childIds: [],
  },
  29: {
    id: 29,
    title: '德国',
    childIds: [],
  },
  30: {
    id: 30,
    title: '意大利',
    childIds: [],
  },
  31: {
    id: 31,
    title: '葡萄牙',
    childIds: [],
  },
  32: {
    id: 32,
    title: '西班牙',
    childIds: [],
  },
  33: {
    id: 33,
    title: '土耳其',
    childIds: [],
  },
  34: {
    id: 34,
    title: '大洋洲',
    childIds: [35, 36, 37, 38, 39, 40, 41],
  },
  35: {
    id: 35,
    title: '澳大利亚',
    childIds: [],
  },
  36: {
    id: 36,
    title: '波拉波拉岛（法属波利尼西亚）',
    childIds: [],
  },
  37: {
    id: 37,
    title: '复活节岛（智利）',
    childIds: [],
  },
  38: {
    id: 38,
    title: '斐济',
    childIds: [],
  },
  39: {
    id: 39,
    title: '夏威夷（美国）',
    childIds: [],
  },
  40: {
    id: 40,
    title: '新西兰',
    childIds: [],
  },
  41: {
    id: 41,
    title: '瓦努阿图',
    childIds: [],
  },
  42: {
    id: 42,
    title: '月球',
    childIds: [43, 44, 45],
  },
  43: {
    id: 43,
    title: '里塔环形山',
    childIds: [],
  },
  44: {
    id: 44,
    title: '皮科洛米尼环形山',
    childIds: [],
  },
  45: {
    id: 45,
    title: '第谷环形山',
    childIds: [],
  },
  46: {
    id: 46,
    title: '火星',
    childIds: [47, 48],
  },
  47: {
    id: 47,
    title: '玉米镇',
    childIds: [],
  },
  48: {
    id: 48,
    title: '绿丘',
    childIds: [],
  },
};
