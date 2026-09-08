import { useMemo, useState, type CSSProperties } from 'react';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

type Filter = 'all' | 'active' | 'done';

let nextId = 4;

const initialTodos: Todo[] = [
  { id: 1, text: '学习 React 基础', done: true },
  { id: 2, text: '写一个 TodoList', done: false },
  { id: 3, text: '理解不可变更新', done: false },
];

const page: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  maxWidth: 560,
  margin: '40px auto',
  padding: 24,
};

const row: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px 14px',
  borderRadius: 10,
  border: '1px solid #e2e8f0',
  marginBottom: 8,
};

const btn: CSSProperties = {
  padding: '8px 14px',
  border: 'none',
  borderRadius: 8,
  background: '#2563eb',
  color: '#fff',
  cursor: 'pointer',
  fontSize: 14,
};

const ghostBtn: CSSProperties = {
  ...btn,
  background: '#f1f5f9',
  color: '#334155',
};

const input: CSSProperties = {
  padding: '8px 10px',
  border: '1px solid #cbd5e1',
  borderRadius: 8,
  flex: 1,
};

const muted: CSSProperties = { color: '#64748b', fontSize: 14 };

const filterLabel: Record<Filter, string> = {
  all: '全部',
  active: '未完成',
  done: '已完成',
};

export default function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.done);
    if (filter === 'done') return todos.filter((t) => t.done);
    return todos;
  }, [todos, filter]);

  const activeCount = todos.filter((t) => !t.done).length;

  const add = () => {
    const value = text.trim();
    if (!value) return;
    setTodos([...todos, { id: nextId, text: value, done: false }]);
    nextId += 1;
    setText('');
  };

  const toggle = (id: number) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const remove = (id: number) => setTodos(todos.filter((t) => t.id !== id));

  return (
    <main style={page}>
      <h1>005 · TodoList</h1>
      <p style={muted}>数组的增、删、改都要生成新数组，而不是原地修改</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          style={input}
          placeholder="要做点什么？回车添加"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') add();
          }}
        />
        <button style={btn} onClick={add}>
          添加
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px' }}>
        {filtered.map((todo) => (
          <li key={todo.id} style={row}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, cursor: 'pointer' }}>
              <input type="checkbox" checked={todo.done} onChange={() => toggle(todo.id)} />
              <span
                style={{
                  textDecoration: todo.done ? 'line-through' : 'none',
                  color: todo.done ? '#94a3b8' : '#0f172a',
                }}
              >
                {todo.text}
              </span>
            </label>
            <button style={ghostBtn} onClick={() => remove(todo.id)}>
              删除
            </button>
          </li>
        ))}
        {filtered.length === 0 && <li style={{ ...muted, padding: 12 }}>暂无任务</li>}
      </ul>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        {(['all', 'active', 'done'] as Filter[]).map((f) => (
          <button key={f} style={f === filter ? btn : ghostBtn} onClick={() => setFilter(f)}>
            {filterLabel[f]}
          </button>
        ))}
        <span style={{ ...muted, marginLeft: 'auto' }}>剩余 {activeCount} 项</span>
        <button
          style={ghostBtn}
          onClick={() => setTodos(todos.filter((t) => !t.done))}
          disabled={activeCount === todos.length}
        >
          清除已完成
        </button>
      </div>
    </main>
  );
}
