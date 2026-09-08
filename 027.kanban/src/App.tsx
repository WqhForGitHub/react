import type { CSSProperties } from 'react';
import { BoardColumn } from './components/BoardColumn';
import { useKanbanStore } from './store/useKanbanStore';

const page: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  maxWidth: 1080,
  margin: '40px auto',
  padding: 24,
};

const muted: CSSProperties = { color: '#64748b', fontSize: 14, lineHeight: 1.7 };

export default function App() {
  const columns = useKanbanStore((s) => s.columns);

  return (
    <main style={page}>
      <h1>027 · 看板</h1>
      <p style={muted}>
        zustand 管理卡片与列；拖拽到卡片上表示插入到它前面，拖到列的空白处表示追加到末尾，回车快捷添加卡片
      </p>

      <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
        {columns.map((column) => (
          <BoardColumn key={column.id} column={column} />
        ))}
      </div>
    </main>
  );
}
