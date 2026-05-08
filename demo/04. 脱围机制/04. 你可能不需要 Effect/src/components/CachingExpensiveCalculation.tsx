import { useState, useMemo } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type FilterType = "all" | "active" | "completed";

// 模拟一个耗时的筛选函数
function getFilteredTodos(todos: Todo[], filter: FilterType): Todo[] {
  console.log("getFilteredTodos 执行了！");
  // 模拟耗时操作
  const start = performance.now();
  while (performance.now() - start < 2) {
    // 人为延迟 2ms 模拟昂贵计算
  }

  switch (filter) {
    case "all":
      return todos;
    case "active":
      return todos.filter((t) => !t.completed);
    case "completed":
      return todos.filter((t) => t.completed);
  }
}

const initialTodos: Todo[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  text: `待办事项 ${i + 1}`,
  completed: i % 3 === 0,
}));

// 🔴 避免：多余的 state 和不必要的 Effect
function TodoListBad() {
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(initialTodos);

  // 🔴 用 Effect 来筛选 —— 每次依赖变化都触发额外渲染
  // 实际代码：useEffect(() => { setVisibleTodos(getFilteredTodos(initialTodos, filter)); }, [filter]);
  // 这里我们模拟 Effect 的行为
  const handleFilterChange = (f: FilterType) => {
    setFilter(f);
    setTimeout(() => {
      setVisibleTodos(getFilteredTodos(initialTodos, f));
    }, 0);
  };

  return (
    <div className="demo-card bad">
      <h4>🔴 避免：用 Effect 缓存计算</h4>
      <div className="form-row">
        <input
          placeholder="添加新待办..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <select
          value={filter}
          onChange={(e) => handleFilterChange(e.target.value as FilterType)}
        >
          <option value="all">全部</option>
          <option value="active">未完成</option>
          <option value="completed">已完成</option>
        </select>
      </div>
      <p className="hint">
        问题：输入 newTodo 时不会触发筛选，但 filter 变化时会导致额外渲染
      </p>
      <ul className="todo-list">
        {visibleTodos.slice(0, 5).map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            {todo.text}
          </li>
        ))}
        {visibleTodos.length > 5 && <li>...还有 {visibleTodos.length - 5} 项</li>}
      </ul>
    </div>
  );
}

// ✅ 正确做法：使用 useMemo 缓存昂贵计算
function TodoListGood() {
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  // ✅ 除非 todos 或 filter 发生变化，否则不会重新执行
  const visibleTodos = useMemo(
    () => getFilteredTodos(initialTodos, filter),
    [filter]
  );

  return (
    <div className="demo-card good">
      <h4>✅ 正确：使用 useMemo 缓存计算</h4>
      <div className="form-row">
        <input
          placeholder="添加新待办..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as FilterType)}
        >
          <option value="all">全部</option>
          <option value="active">未完成</option>
          <option value="completed">已完成</option>
        </select>
      </div>
      <p className="hint">
        优势：输入 newTodo 时不会重新执行 getFilteredTodos，打开控制台可验证
      </p>
      <ul className="todo-list">
        {visibleTodos.slice(0, 5).map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            {todo.text}
          </li>
        ))}
        {visibleTodos.length > 5 && <li>...还有 {visibleTodos.length - 5} 项</li>}
      </ul>
    </div>
  );
}

export default function CachingExpensiveCalculation() {
  return (
    <div>
      <h3>2. 缓存昂贵的计算</h3>
      <p>
        不要使用 Effect 来缓存计算结果。使用 <code>useMemo</code>{" "}
        来避免在无关 state 变化时重新执行昂贵的计算。
      </p>
      <div className="comparison">
        <TodoListBad />
        <TodoListGood />
      </div>
    </div>
  );
}
