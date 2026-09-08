import { create } from 'zustand';

export type Priority = 'low' | 'mid' | 'high';

export interface Card {
  id: string;
  title: string;
  assignee: string;
  priority: Priority;
}

export interface Column {
  id: string;
  title: string;
  cardIds: string[];
}

interface KanbanState {
  cards: Record<string, Card>;
  columns: Column[];
  addCard: (columnId: string, title: string, priority: Priority) => void;
  removeCard: (cardId: string) => void;
  moveCard: (cardId: string, toColumnId: string, toIndex?: number) => void;
}

let seq = 100;
const uid = () => `c${(seq += 1)}`;

const initialCards: Record<string, Card> = {
  c1: { id: 'c1', title: '登录页开发', assignee: '陈晨', priority: 'high' },
  c2: { id: 'c2', title: '首页视觉稿', assignee: '韩梅', priority: 'mid' },
  c3: { id: 'c3', title: '接口联调', assignee: '李雷', priority: 'mid' },
  c4: { id: 'c4', title: '埋点方案评审', assignee: '王浩', priority: 'low' },
  c5: { id: 'c5', title: '性能压测', assignee: '赵琳', priority: 'high' },
};

const initialColumns: Column[] = [
  { id: 'todo', title: '待办', cardIds: ['c1', 'c2'] },
  { id: 'doing', title: '进行中', cardIds: ['c3'] },
  { id: 'done', title: '已完成', cardIds: ['c4', 'c5'] },
];

export const useKanbanStore = create<KanbanState>()((set) => ({
  cards: initialCards,
  columns: initialColumns,
  addCard: (columnId, title, priority) =>
    set((state) => {
      const trimmed = title.trim();
      if (!trimmed) return state;
      const id = uid();
      const card: Card = { id, title: trimmed, assignee: '我', priority };
      const columns = state.columns.map((col) =>
        col.id === columnId ? { ...col, cardIds: [...col.cardIds, id] } : col
      );
      return { cards: { ...state.cards, [id]: card }, columns };
    }),
  removeCard: (cardId) =>
    set((state) => {
      const cards = { ...state.cards };
      delete cards[cardId];
      return {
        cards,
        columns: state.columns.map((col) => ({
          ...col,
          cardIds: col.cardIds.filter((id) => id !== cardId),
        })),
      };
    }),
  moveCard: (cardId, toColumnId, toIndex) =>
    set((state) => {
      const source = state.columns.find((col) => col.cardIds.includes(cardId));
      if (!source) return state;
      const columns = state.columns.map((col) => ({
        ...col,
        cardIds: col.cardIds.filter((id) => id !== cardId),
      }));
      const target = columns.find((col) => col.id === toColumnId);
      if (!target) return state;
      const index =
        toIndex === undefined
          ? target.cardIds.length
          : Math.max(0, Math.min(toIndex, target.cardIds.length));
      target.cardIds = [...target.cardIds.slice(0, index), cardId, ...target.cardIds.slice(index)];
      return { columns };
    }),
}));
