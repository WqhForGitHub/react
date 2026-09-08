import { useReducer, useState, type CSSProperties } from 'react';
import { createTodoState, todoReducer } from './store/todoReducer';

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

const muted: CSSProperties = { color: '#64748b', fontSize: 13 };

export default function App() {
  const [state, dispatch] = useReducer(todoReducer, undefined, createTodoState);
  const [text, setText] = useState('');

  const add = () => {
    dispatch({ type: 'add', text });
    setText('');
  };

  const doneCount = state.items.filter((t) => t.done).length;

  return (
    <main style={page}>
      <h1>015 · useReducer 重构 Todo</h1>
      <p style={muted}>
        所有状态修改都变成 dispatch(action)，由同一个 reducer 纯函数处理；每次修改前把旧状态压入
        past，就能实现撤销
      </p>

      <div style={{ display: 'flex', gap: 8, margin: '16px 0' }}>
        <input
          style={input}
          placeholder="新的待办，回车添加"
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
        {state.items.map((todo) => (
          <li key={todo.id} style={row}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => dispatch({ type: 'toggle', id: todo.id })}
              />
              <span
                style={{
                  textDecoration: todo.done ? 'line-through' : 'none',
                  color: todo.done ? '#94a3b8' : '#0f172a',
                }}
              >
                {todo.text}
              </span>
            </label>
            <button style={ghostBtn} onClick={() => dispatch({ type: 'remove', id: todo.id })}>
              删除
            </button>
          </li>
        ))}
        {state.items.length === 0 && <li style={{ ...muted, padding: 12 }}>暂无待办</li>}
      </ul>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <button style={ghostBtn} onClick={() => dispatch({ type: 'toggleAll' })}>
          全选 / 全不选
        </button>
        <button style={ghostBtn} onClick={() => dispatch({ type: 'clearDone' })}>
          清除已完成
        </button>
        <button
          style={btn}
          disabled={state.past.length === 0}
          onClick={() => dispatch({ type: 'undo' })}
        >
          撤销（{state.past.length} 步）
        </button>
        <span style={{ ...muted, marginLeft: 'auto' }}>
          {doneCount} / {state.items.length} 完成
        </span>
      </div>
    </main>
  );
}
