import { useState, type CSSProperties } from 'react';

interface Fruit {
  id: number;
  name: string;
  color: string;
  price: number;
}

const initialFruits: Fruit[] = [
  { id: 1, name: '苹果', color: '#ef4444', price: 6 },
  { id: 2, name: '香蕉', color: '#eab308', price: 3 },
  { id: 3, name: '葡萄', color: '#8b5cf6', price: 12 },
  { id: 4, name: '牛油果', color: '#22c55e', price: 15 },
  { id: 5, name: '西瓜', color: '#f97316', price: 20 },
];

const page: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  maxWidth: 640,
  margin: '40px auto',
  padding: 24,
};

const row: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '10px 14px',
  borderRadius: 10,
  border: '1px solid #e2e8f0',
  marginBottom: 8,
};

const btn: CSSProperties = {
  padding: '8px 16px',
  border: 'none',
  borderRadius: 8,
  background: '#2563eb',
  color: '#fff',
  cursor: 'pointer',
};

const ghostBtn: CSSProperties = {
  ...btn,
  background: '#f1f5f9',
  color: '#334155',
  fontSize: 14,
};

const input: CSSProperties = {
  padding: '8px 10px',
  border: '1px solid #cbd5e1',
  borderRadius: 8,
};

const muted: CSSProperties = { color: '#64748b', fontSize: 14 };

export default function App() {
  const [fruits, setFruits] = useState(initialFruits);
  const [nextId, setNextId] = useState(6);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const total = fruits.reduce((sum, fruit) => sum + fruit.price, 0);
  const cheapest =
    fruits.length > 0
      ? fruits.reduce((min, fruit) => (fruit.price < min.price ? fruit : min))
      : null;

  const add = () => {
    const trimmed = name.trim();
    const parsed = Number(price);
    if (!trimmed || !parsed || parsed <= 0) return;
    setFruits([...fruits, { id: nextId, name: trimmed, color: '#0ea5e9', price: parsed }]);
    setNextId((id) => id + 1);
    setName('');
    setPrice('');
  };

  return (
    <main style={page}>
      <h1>004 · 列表渲染</h1>
      <p style={muted}>用 map 把数组变成 JSX，每一项都需要一个稳定唯一的 key</p>

      <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0' }}>
        {fruits.map((fruit, index) => (
          <li
            key={fruit.id}
            style={{ ...row, background: index % 2 === 0 ? '#fff' : '#f8fafc' }}
          >
            <span
              style={{ width: 14, height: 14, borderRadius: '50%', background: fruit.color }}
            />
            <strong style={{ flex: 1 }}>{fruit.name}</strong>
            <span style={muted}>¥{fruit.price}</span>
            <button
              style={ghostBtn}
              onClick={() => setFruits(fruits.filter((f) => f.id !== fruit.id))}
            >
              移除
            </button>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          style={input}
          placeholder="水果名"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          style={{ ...input, width: 80 }}
          placeholder="价格"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button style={btn} onClick={add}>
          添加
        </button>
      </div>

      <p style={muted}>
        共 {fruits.length} 项，合计 ¥{total}
        {cheapest ? `，最便宜的是${cheapest.name}` : ''}
      </p>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button
          style={ghostBtn}
          onClick={() => setFruits([...fruits].sort((a, b) => a.price - b.price))}
        >
          按价格升序
        </button>
        <button
          style={ghostBtn}
          onClick={() => setFruits([...fruits].sort((a, b) => b.price - a.price))}
        >
          按价格降序
        </button>
        <button style={ghostBtn} onClick={() => setFruits(initialFruits)}>
          恢复初始
        </button>
      </div>

      {fruits.length === 0 && (
        <p style={{ ...muted, marginTop: 16 }}>列表空了，点「恢复初始」找回数据</p>
      )}
    </main>
  );
}
