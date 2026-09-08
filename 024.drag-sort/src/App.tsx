import { useRef, useState, type CSSProperties, type DragEvent } from 'react';

interface Task {
  id: string;
  title: string;
  priority: 'low' | 'mid' | 'high';
}

const initialTasks: Task[] = [
  { id: 't1', title: '画原型图', priority: 'high' },
  { id: 't2', title: '写接口文档', priority: 'mid' },
  { id: 't3', title: '联调支付流程', priority: 'high' },
  { id: 't4', title: '整理需求池', priority: 'low' },
  { id: 't5', title: '优化首屏加载', priority: 'mid' },
  { id: 't6', title: '约评审会议', priority: 'low' },
];

const priorityBadge: Record<Task['priority'], { text: string; color: string }> = {
  low: { text: '低', color: '#22c55e' },
  mid: { text: '中', color: '#f59e0b' },
  high: { text: '高', color: '#ef4444' },
};

const page: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  maxWidth: 560,
  margin: '40px auto',
  padding: 24,
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

const muted: CSSProperties = { color: '#64748b', fontSize: 14, lineHeight: 1.7 };

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [dragging, setDragging] = useState<string | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const draggingIndex = tasks.findIndex((t) => t.id === dragging);

  const move = (from: number, to: number) => {
    setTasks((prev) => {
      if (from === to || from < 0 || from >= prev.length || to < 0 || to >= prev.length) {
        return prev;
      }
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  };

  const reset = () => {
    setDragging(null);
    setOverIndex(null);
    setTasks(initialTasks);
  };

  const handleDrop = (e: DragEvent<HTMLLIElement>, targetIndex: number) => {
    e.preventDefault();
    if (draggingIndex !== -1) {
      move(draggingIndex, targetIndex);
    }
    setDragging(null);
    setOverIndex(null);
  };

  return (
    <main style={page}>
      <h1>024 · 拖拽排序</h1>
      <p style={muted}>
        原生 HTML5 拖放：onDragStart 记住拖的是谁，onDragEnter 更新插入位置，onDrop 时用 splice 完成移动
      </p>

      <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0' }}>
        {tasks.map((task, index) => {
          const isDragging = index === draggingIndex;
          const isOver = index === overIndex && !isDragging;
          const badge = priorityBadge[task.priority];
          return (
            <li
              key={task.id}
              draggable
              onDragStart={(e) => {
                setDragging(task.id);
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', task.id);
              }}
              onDragEnter={() => setOverIndex(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={() => {
                setDragging(null);
                setOverIndex(null);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 14px',
                marginBottom: 8,
                borderRadius: 10,
                border: '1px solid #e2e8f0',
                background: isOver ? '#eff6ff' : '#fff',
                boxShadow: isOver ? 'inset 0 3px 0 #2563eb' : 'none',
                opacity: isDragging ? 0.35 : 1,
                cursor: 'grab',
                userSelect: 'none',
              }}
            >
              <span style={{ color: '#94a3b8', fontSize: 18 }}>⋮⋮</span>
              <span
                style={{
                  padding: '2px 10px',
                  borderRadius: 999,
                  background: badge.color,
                  color: '#fff',
                  fontSize: 12,
                }}
              >
                {badge.text}
              </span>
              <strong>{task.title}</strong>
              <span style={{ ...muted, marginLeft: 'auto', fontSize: 12 }}>第 {index + 1} 位</span>
            </li>
          );
        })}
      </ul>

      <button style={ghostBtn} onClick={reset}>
        恢复初始顺序
      </button>
    </main>
  );
}
