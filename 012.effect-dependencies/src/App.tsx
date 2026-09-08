import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

const page: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  maxWidth: 860,
  margin: '40px auto',
  padding: 24,
};

const card: CSSProperties = {
  padding: 18,
  borderRadius: 12,
  border: '1px solid',
  transition: 'background 200ms, color 200ms',
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

const mono: CSSProperties = { fontVariantNumeric: 'tabular-nums' };

function CardShell({
  title,
  desc,
  dark,
  children,
}: {
  title: string;
  desc: string;
  dark: boolean;
  children: ReactNode;
}) {
  return (
    <section
      style={{
        ...card,
        background: dark ? '#0f172a' : '#fff',
        color: dark ? '#e2e8f0' : '#0f172a',
        borderColor: dark ? '#334155' : '#e2e8f0',
      }}
    >
      <h2 style={{ fontSize: 15, margin: '0 0 4px' }}>{title}</h2>
      <p
        style={{
          fontSize: 13,
          margin: '0 0 12px',
          color: dark ? '#94a3b8' : '#64748b',
        }}
      >
        {desc}
      </p>
      <div style={{ fontSize: 14 }}>
        {children}
      </div>
    </section>
  );
}

function NoDepsCard({ dark }: { dark: boolean }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const runsRef = useRef(0);
  const rendersRef = useRef(0);
  rendersRef.current += 1;

  useEffect(() => {
    runsRef.current += 1;
    if (spanRef.current) {
      spanRef.current.textContent = String(runsRef.current);
    }
  });

  return (
    <CardShell title="1. 不写依赖数组" desc="每次渲染之后都会执行" dark={dark}>
      渲染 <span style={mono}>{rendersRef.current}</span> 次，副作用执行{' '}
      <span ref={spanRef} style={mono}>
        0
      </span>{' '}
      次
    </CardShell>
  );
}

function EmptyDepsCard({ dark }: { dark: boolean }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const runsRef = useRef(0);
  const rendersRef = useRef(0);
  rendersRef.current += 1;

  useEffect(() => {
    runsRef.current += 1;
    if (spanRef.current) {
      spanRef.current.textContent = String(runsRef.current);
    }
  }, []);

  return (
    <CardShell title="2. 依赖数组为空 []" desc="只在挂载后执行一次" dark={dark}>
      渲染 <span style={mono}>{rendersRef.current}</span> 次，副作用执行{' '}
      <span ref={spanRef} style={mono}>
        0
      </span>{' '}
      次
    </CardShell>
  );
}

function WithDepsCard({ dark, trigger }: { dark: boolean; trigger: number }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const runsRef = useRef(0);
  const rendersRef = useRef(0);
  rendersRef.current += 1;

  useEffect(() => {
    runsRef.current += 1;
    if (spanRef.current) {
      spanRef.current.textContent = String(runsRef.current);
    }
  }, [trigger]);

  return (
    <CardShell title={`3. 依赖数组为 [trigger]（当前 trigger=${trigger}）`} desc="挂载后执行 + trigger 变化时执行" dark={dark}>
      渲染 <span style={mono}>{rendersRef.current}</span> 次，副作用执行{' '}
      <span ref={spanRef} style={mono}>
        0
      </span>{' '}
      次
    </CardShell>
  );
}

function LifetimeCard({ dark, onUnmount }: { dark: boolean; onUnmount: () => void }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => {
      clearInterval(id);
      onUnmount();
    };
  }, [onUnmount]);

  return (
    <CardShell title="4. 清理函数" desc="卸载时执行 return 的清理逻辑" dark={dark}>
      挂载中，已存活 <span style={mono}>{seconds}</span> 秒（每秒由定时器更新一次）
    </CardShell>
  );
}

export default function App() {
  const [trigger, setTrigger] = useState(0);
  const [dark, setDark] = useState(false);
  const [alive, setAlive] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);

  const log = useCallback((message: string) => {
    setLogs((prev) => [
      ...prev.slice(-7),
      `${new Date().toLocaleTimeString('zh-CN')} ${message}`,
    ]);
  }, []);

  return (
    <main style={page}>
      <h1>012 · useEffect 依赖对比</h1>
      <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.7 }}>
        点「trigger +1」：三张卡的渲染次数都增加，但只有第 1、3 张卡的副作用执行次数增加；
        点「切换深色」：三张卡都会重新渲染，但只有第 1 张卡的副作用会执行
      </p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '16px 0' }}>
        <button style={btn} onClick={() => setTrigger((t) => t + 1)}>
          trigger +1（相关状态）
        </button>
        <button style={ghostBtn} onClick={() => setDark((d) => !d)}>
          切换深色（无关状态）
        </button>
        <button style={ghostBtn} onClick={() => setAlive((a) => !a)}>
          {alive ? '卸载第 4 张卡' : '重新挂载第 4 张卡'}
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 12,
        }}
      >
        <NoDepsCard dark={dark} />
        <EmptyDepsCard dark={dark} />
        <WithDepsCard dark={dark} trigger={trigger} />
        {alive && <LifetimeCard dark={dark} onUnmount={() => log('清理函数执行：定时器已清除，组件已卸载')} />}
      </div>

      <section
        style={{
          marginTop: 16,
          padding: 14,
          borderRadius: 12,
          border: '1px dashed #cbd5e1',
          minHeight: 60,
        }}
      >
        <strong style={{ fontSize: 14 }}>事件日志</strong>
        <ul style={{ margin: '8px 0 0', paddingLeft: 18, fontSize: 13, color: '#64748b' }}>
          {logs.length === 0 && <li>挂载/卸载第 4 张卡试试，事件会记录在这里</li>}
          {logs.map((entry, index) => (
            <li key={`${entry}-${index}`}>{entry}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
