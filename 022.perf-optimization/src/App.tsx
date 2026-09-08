import { memo, useCallback, useMemo, useRef, useState, type CSSProperties } from 'react';

interface City {
  id: number;
  name: string;
  population: number;
}

const CITIES: City[] = [
  { id: 1, name: '上海', population: 2487 },
  { id: 2, name: '北京', population: 2189 },
  { id: 3, name: '深圳', population: 1768 },
  { id: 4, name: '广州', population: 1874 },
  { id: 5, name: '成都', population: 2119 },
  { id: 6, name: '杭州', population: 1220 },
  { id: 7, name: '武汉', population: 1373 },
  { id: 8, name: '西安', population: 1295 },
  { id: 9, name: '南京', population: 942 },
  { id: 10, name: '长沙', population: 1004 },
  { id: 11, name: '郑州', population: 1260 },
  { id: 12, name: '苏州', population: 1275 },
];

interface ScoredCity extends City {
  score: number;
}

function expensiveScore(cities: City[], query: string): { list: ScoredCity[]; ms: number } {
  const start = performance.now();
  let total = 0;
  for (let i = 0; i < 1500000; i += 1) {
    total += Math.sqrt(i);
  }
  const q = query.trim().toLowerCase();
  const list = cities
    .filter((c) => (q ? c.name.toLowerCase().includes(q) : true))
    .map((c) => ({ ...c, score: Math.abs(Math.round((total / 1000000) % (c.id + 7))) }));
  return { list, ms: performance.now() - start };
}

const page: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  maxWidth: 1000,
  margin: '40px auto',
  padding: 24,
};

const panel: CSSProperties = {
  padding: 18,
  borderRadius: 12,
  border: '1px solid #e2e8f0',
  background: '#fff',
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

const chip: CSSProperties = {
  display: 'inline-block',
  padding: '2px 10px',
  borderRadius: 999,
  background: '#f1f5f9',
  color: '#475569',
  fontSize: 12,
  marginRight: 6,
};

const muted: CSSProperties = { color: '#64748b', fontSize: 13 };

function RenderChip({ label }: { label: string }) {
  const count = useRef(0);
  count.current += 1;
  return (
    <span style={chip}>
      {label} 渲染 {count.current} 次
    </span>
  );
}

interface ListProps {
  cities: City[];
  query: string;
  onDelete: (id: number) => void;
}

function PlainList({ cities, query, onDelete }: ListProps) {
  const runs = useRef(0);
  runs.current += 1;
  const { list, ms } = expensiveScore(cities, query);

  return (
    <section style={panel}>
      <h2 style={{ marginTop: 0 }}>未优化</h2>
      <p style={muted}>
        没有 memo：父组件任何状态变化都会让它重新渲染；过滤计算也每次重来（本次耗时{' '}
        {ms.toFixed(1)}ms）
      </p>
      <RenderChip label="PlainList" />
      <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0' }}>
        {list.map((city) => (
          <li
            key={city.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 10px',
              borderBottom: '1px solid #f1f5f9',
              fontSize: 14,
            }}
          >
            <strong style={{ width: 56 }}>{city.name}</strong>
            <span style={muted}>{city.population} 万人</span>
            <span style={{ ...muted, marginLeft: 'auto' }}>score {city.score}</span>
            <button style={ghostBtn} onClick={() => onDelete(city.id)}>
              删
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

const OptimizedList = memo(function OptimizedList({ cities, query, onDelete }: ListProps) {
  const runs = useRef(0);
  runs.current += 1;
  const { list, ms } = useMemo(() => expensiveScore(cities, query), [cities, query]);

  return (
    <section style={panel}>
      <h2 style={{ marginTop: 0 }}>已优化</h2>
      <p style={muted}>
        memo + 稳定回调：父组件的无关变化不会触发它；过滤结果用 useMemo 缓存（上次耗时{' '}
        {ms.toFixed(1)}ms）
      </p>
      <RenderChip label="OptimizedList" />
      <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0' }}>
        {list.map((city) => (
          <li
            key={city.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 10px',
              borderBottom: '1px solid #f1f5f9',
              fontSize: 14,
            }}
          >
            <strong style={{ width: 56 }}>{city.name}</strong>
            <span style={muted}>{city.population} 万人</span>
            <span style={{ ...muted, marginLeft: 'auto' }}>score {city.score}</span>
            <button style={ghostBtn} onClick={() => onDelete(city.id)}>
              删
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
});

export default function App() {
  const [cities, setCities] = useState(CITIES);
  const [query, setQuery] = useState('');
  const [tick, setTick] = useState(0);

  const handleDelete = useCallback((id: number) => {
    setCities((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return (
    <main style={page}>
      <h1>022 · 渲染优化</h1>
      <p style={{ ...muted, lineHeight: 1.7 }}>
        点「无关状态 +1」：左边的 PlainList 会重新渲染并重新做昂贵计算，右边的 OptimizedList
        因为 props 没变（cities 引用相同、query 相同字符串、onDelete 是 useCallback 的稳定引用）被 memo 拦下
      </p>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '16px 0', flexWrap: 'wrap' }}>
        <input
          style={{ padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: 8 }}
          placeholder="搜索城市…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button style={btn} onClick={() => setTick((t) => t + 1)}>
          无关状态 +1（当前 {tick}）
        </button>
        <span style={{ ...muted, marginLeft: 'auto' }}>
          剩余 {cities.length} / {CITIES.length} 个城市
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: 16,
        }}
      >
        <PlainList cities={cities} query={query} onDelete={handleDelete} />
        <OptimizedList cities={cities} query={query} onDelete={handleDelete} />
      </div>
    </main>
  );
}
