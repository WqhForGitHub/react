import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  color: string;
}

export const products: Product[] = [
  { id: 'p1', name: '机械键盘', price: 399, color: '#6366f1' },
  { id: 'p2', name: '无线鼠标', price: 199, color: '#0ea5e9' },
  { id: 'p3', name: '显示器', price: 1299, color: '#22c55e' },
  { id: 'p4', name: '降噪耳机', price: 599, color: '#f59e0b' },
  { id: 'p5', name: '摄像头', price: 449, color: '#ec4899' },
  { id: 'p6', name: '桌面支架', price: 129, color: '#8b5cf6' },
];

interface ShopState {
  quantities: Record<string, number>;
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export const useShopStore = create<ShopState>()(
  persist(
    (set) => ({
      quantities: {},
      add: (id) =>
        set((state) => ({
          quantities: { ...state.quantities, [id]: (state.quantities[id] ?? 0) + 1 },
        })),
      remove: (id) =>
        set((state) => {
          const next = { ...state.quantities };
          const qty = (next[id] ?? 0) - 1;
          if (qty <= 0) delete next[id];
          else next[id] = qty;
          return { quantities: next };
        }),
      clear: () => set({ quantities: {} }),
    }),
    { name: 'demo-018-shop' }
  )
);

export const selectTotalCount = (state: ShopState) =>
  Object.values(state.quantities).reduce((sum, qty) => sum + qty, 0);

export const selectTotalPrice = (state: ShopState) =>
  Object.entries(state.quantities).reduce((sum, [id, qty]) => {
    const product = products.find((p) => p.id === id);
    return sum + (product ? product.price * qty : 0);
  }, 0);
