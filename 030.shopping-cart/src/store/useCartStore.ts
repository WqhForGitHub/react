import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartLine {
  id: string;
  qty: number;
}

interface CartState {
  lines: CartLine[];
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      add: (id) =>
        set((state) => {
          const line = state.lines.find((l) => l.id === id);
          return {
            lines: line
              ? state.lines.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l))
              : [...state.lines, { id, qty: 1 }],
          };
        }),
      setQty: (id, qty) =>
        set((state) =>
          qty <= 0
            ? { lines: state.lines.filter((l) => l.id !== id) }
            : { lines: state.lines.map((l) => (l.id === id ? { ...l, qty } : l)) }
        ),
      remove: (id) => set((state) => ({ lines: state.lines.filter((l) => l.id !== id) })),
      clear: () => set({ lines: [] }),
    }),
    { name: 'demo-030-cart' }
  )
);

export const selectCartCount = (state: CartState) =>
  state.lines.reduce((sum, line) => sum + line.qty, 0);
