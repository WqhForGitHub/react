export interface TodoItem {
  id: number;
  text: string;
  done: boolean;
  createdAt: number;
}

export type TodoAction =
  | { type: 'add'; text: string }
  | { type: 'toggle'; id: number }
  | { type: 'remove'; id: number }
  | { type: 'toggleAll' }
  | { type: 'clearDone' }
  | { type: 'undo' };

export interface TodoState {
  items: TodoItem[];
  past: TodoItem[][];
}

let nextId = 1;

export function createTodoState(): TodoState {
  const seed = ['理解 action 与 dispatch', '把状态修改集中到 reducer', '试试点「撤销」'];
  return {
    items: seed.map((text) => ({ id: nextId++, text, done: false, createdAt: Date.now() })),
    past: [],
  };
}

const commit = (state: TodoState, items: TodoItem[]): TodoState => ({
  items,
  past: [...state.past, state.items].slice(-10),
});

export function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'add': {
      const text = action.text.trim();
      if (!text) return state;
      return commit(state, [
        ...state.items,
        { id: nextId++, text, done: false, createdAt: Date.now() },
      ]);
    }
    case 'toggle':
      return commit(
        state,
        state.items.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t))
      );
    case 'remove':
      return commit(state, state.items.filter((t) => t.id !== action.id));
    case 'toggleAll': {
      const allDone = state.items.length > 0 && state.items.every((t) => t.done);
      return commit(state, state.items.map((t) => ({ ...t, done: !allDone })));
    }
    case 'clearDone':
      return commit(state, state.items.filter((t) => !t.done));
    case 'undo': {
      const past = [...state.past];
      const items = past.pop();
      if (items === undefined) return state;
      return { items, past };
    }
    default:
      return state;
  }
}
