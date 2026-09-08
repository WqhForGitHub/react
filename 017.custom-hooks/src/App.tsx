import type { CSSProperties } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useToggle } from './hooks/useToggle';
import { useWindowSize } from './hooks/useWindowSize';

const NOTES = [
  '自定义 Hook 就是「内部用了 Hook 的普通函数」，名字以 use 开头',
  '它让有状态逻辑可以在多个组件之间复用',
  'useLocalStorage 把读写本地存储变成了一个 useState',
  'useToggle 把布尔开关逻辑收敛成一行',
];

const page: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  maxWidth: 720,
  margin: '40px auto',
  padding: 24,
};

const card: CSSProperties = {
  padding: 20,
  borderRadius: 12,
  border: '1px solid #e2e8f0',
  background: '#fff',
  marginTop: 14,
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

const muted: CSSProperties = { color: '#64748b', fontSize: 14 };

export default function App() {
  const [panelOpen, setPanelOpen] = useLocalStorage('demo-017-panel-open', true);
  const [fontSize, setFontSize] = useLocalStorage('demo-017-font-size', 14);
  const [compact, toggleCompact] = useToggle(false);
  const { width, height } = useWindowSize();

  return (
    <main style={page}>
      <h1>017 · 自定义 Hook</h1>
      <p style={muted}>
        把有状态逻辑封装成可复用的 Hook：useLocalStorage（刷新页面状态还在）、useToggle、useWindowSize
      </p>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '8px 16px',
          borderRadius: 10,
          background: '#0f172a',
          color: '#e2e8f0',
          fontSize: 13,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        视口 {width} × {height}
        {width < 640 && <span style={{ color: '#f59e0b' }}>（窄屏）</span>}
        <span style={{ marginLeft: 'auto', opacity: 0.6 }}>resize 窗口试试</span>
      </div>

      <section style={card}>
        <h2 style={{ margin: '0 0 8px', fontSize: 16 }}>可折叠面板（useLocalStorage）</h2>
        <button style={ghostBtn} onClick={() => setPanelOpen(!panelOpen)}>
          {panelOpen ? '收起' : '展开'}
        </button>
        {panelOpen && (
          <div style={{ marginTop: 12 }}>
            {NOTES.map((note, index) => (
              <p
                key={index}
                style={{
                  ...muted,
                  margin: 0,
                  marginBottom: compact ? 2 : 10,
                  fontSize,
                  lineHeight: compact ? 1.3 : 1.8,
                }}
              >
                {index + 1}. {note}
              </p>
            ))}
          </div>
        )}
      </section>

      <section style={card}>
        <h2 style={{ margin: '0 0 8px', fontSize: 16 }}>阅读设置</h2>
        <label style={{ ...muted, display: 'block', marginBottom: 10 }}>
          正文字号：{fontSize}px（持久化，刷新后依然生效）
          <input
            type="range"
            min={12}
            max={20}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            style={{ width: '100%', marginTop: 8 }}
          />
        </label>
        <button style={compact ? btn : ghostBtn} onClick={toggleCompact}>
          {compact ? '紧凑模式：开' : '紧凑模式：关'}
        </button>
      </section>
    </main>
  );
}
