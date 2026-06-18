import { useState, useRef } from 'react';
import { flushSync } from 'react-dom';

interface TodoItem {
  id: number;
  text: string;
}

let nextId = 0;
const initialTodos: TodoItem[] = [];
for (let i = 0; i < 20; i++) {
  initialTodos.push({
    id: nextId++,
    text: '待办 #' + (i + 1),
  });
}

/**
 * 示例：用 flushSync 同步更新 state
 * 演示为什么需要 flushSync —— 在 state 更新后立即访问 DOM 时，
 * 普通 setState 不会立即更新 DOM，而 flushSync 可以强制同步更新
 */
export default function FlushSyncDemo() {
  const listRef = useRef<HTMLUListElement>(null);
  const [text, setText] = useState('');
  const [todos, setTodos] = useState(initialTodos);

  function handleAdd() {
    const newTodo = { id: nextId++, text: text || '新待办' };
    flushSync(() => {
      setText('');
      setTodos([...todos, newTodo]);
    });
    listRef.current?.lastElementChild?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }

  return (
    <div className="demo-card">
      <h3>用 flushSync 同步更新 state</h3>
      <p>
        在 React 中，state 更新是排队进行的。如果你需要在 state 更新后立即访问 DOM，
        可以使用 <code>flushSync</code> 强制同步更新。
      </p>
      <div className="demo-area">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="输入新的待办事项"
        />
        <button onClick={handleAdd}>添加并滚动到底部</button>
      </div>
      <ul className="todo-list" ref={listRef}>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
      <div className="code-hint">
        <code>{`flushSync(() => { setTodos([...todos, newTodo]); }); listRef.current.lastChild.scrollIntoView();`}</code>
      </div>
    </div>
  );
}
