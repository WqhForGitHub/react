import { useMemo, useState, type CSSProperties } from 'react';
import { VirtualList } from './components/VirtualList';

interface Row {
  id: number;
  name: string;
  score: number;
}

const ALL_ROWS: Row[] = Array.from({ length: 100000 }, (_, i) => ({
  id: i,
  name: `条目 ${String(i + 1).padStart(6, '0')}`,
  score: (i * 37) % 100,
}));

const page: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  maxWidth: 720,
  margin: '40px auto',
  padding: 24,
};

const input: CSSProperties = {
  width: '100%',
  padding: '9px 11px',
  border: '1px solid #cbd5e1',
  borderRadius: 8,
  boxSizing: 'border-box',
  fontSize: 14,
};

const muted: CSSProperties = { color: '#64748b', fontSize: 14, lineHeight: 1.7 };

export default function App() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_ROWS;
    return ALL_ROWS.filter((row) => row.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <main style={page}>
      <h1>025 · 虚拟滚动</h1>
      <p style={muted}>
        10 万条数据不可能全部渲染：外层容器撑起总高度（条数 × 行高），
        只渲染可视窗口附近的少量行，滚动时用绝对定位把行放到正确的位置
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '16px 0' }}>
        <input
          style={input}
          placeholder="过滤 100000 条数据，如输入 003…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span style={{ ...muted, flexShrink: 0 }}>
          命中 {filtered.length.toLocaleString('zh-CN')} 条
        </span>
      </div>

      <VirtualList
        items={filtered}
        itemHeight={44}
        height={420}
        keyOf={(row) => row.id}
        renderItem={(row, index) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              height: '100%',
              padding: '0 14px',
              borderBottom: '1px solid #f1f5f9',
              background: index % 2 === 0 ? '#fff' : '#f8fafc',
              boxSizing: 'border-box',
            }}
          >
            <span
              style={{
                width: 30,
                height: 22,
                borderRadius: 6,
                background: '#e0e7ff',
                color: '#3730a3',
                fontSize: 12,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {index + 1}
            </span>
            <strong style={{ fontSize: 14 }}>{row.name}</strong>
            <div style={{ flex: 1, height: 6, borderRadius: 999, background: '#e2e8f0', overflow: 'hidden' }}>
              <div style={{ width: `${row.score}%`, height: '100%', background: '#2563eb' }} />
            </div>
            <span style={{ ...muted, fontSize: 12, width: 32, textAlign: 'right' }}>{row.score}</span>
          </div>
        )}
      />
    </main>
  );
}
