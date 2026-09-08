import { useState, type CSSProperties } from 'react';

const page: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  maxWidth: 560,
  margin: '40px auto',
  padding: 24,
  textAlign: 'center',
};

const board: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 32,
  padding: 32,
  margin: '24px 0',
  background: '#f8fafc',
  borderRadius: 16,
  border: '1px solid #e2e8f0',
};

const btn: CSSProperties = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: 10,
  background: '#2563eb',
  color: '#fff',
  fontSize: 16,
  cursor: 'pointer',
};

const ghostBtn: CSSProperties = {
  ...btn,
  background: '#fff',
  color: '#334155',
  border: '1px solid #cbd5e1',
  fontSize: 14,
};

const numInput: CSSProperties = {
  width: 64,
  marginLeft: 8,
  padding: '6px 8px',
  border: '1px solid #cbd5e1',
  borderRadius: 8,
};

const muted: CSSProperties = { color: '#64748b' };

export default function App() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const isEven = count % 2 === 0;

  return (
    <main style={page}>
      <h1>002 · 计数器</h1>
      <p style={muted}>useState 是最基础的 React Hook</p>

      <div style={board}>
        <button
          style={ghostBtn}
          onClick={() => setCount((c) => c - step)}
          disabled={count - step < 0}
        >
          -{step}
        </button>
        <span style={{ fontSize: 56, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
          {count}
        </span>
        <button style={btn} onClick={() => setCount((c) => c + step)}>
          +{step}
        </button>
      </div>

      <p style={muted}>
        当前是{isEven ? '偶' : '奇'}数{count >= 20 ? '，已经很大了' : ''}
      </p>

      <div style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'center' }}>
        <label style={muted}>
          步长
          <input
            style={numInput}
            type="number"
            min={1}
            max={10}
            value={step}
            onChange={(e) => setStep(Math.min(10, Math.max(1, Number(e.target.value) || 1)))}
          />
        </label>
        <button style={ghostBtn} onClick={() => setCount(0)} disabled={count === 0}>
          重置
        </button>
      </div>

      <p style={{ ...muted, fontSize: 12, marginTop: 24 }}>
        传入函数的写法 setCount((c) =&gt; c + step) 可以避免旧值闭包问题
      </p>
    </main>
  );
}
