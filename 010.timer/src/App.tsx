import { useEffect, useState, type CSSProperties } from 'react';

const page: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  maxWidth: 560,
  margin: '40px auto',
  padding: 24,
};

const card: CSSProperties = {
  padding: 28,
  borderRadius: 14,
  border: '1px solid #e2e8f0',
  textAlign: 'center',
};

const btn: CSSProperties = {
  padding: '10px 18px',
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
};

const muted: CSSProperties = { color: '#64748b', fontSize: 14 };

function format(ms: number): string {
  const total = Math.floor(ms / 100);
  const m = String(Math.floor(total / 600)).padStart(2, '0');
  const s = String(Math.floor(total / 10) % 60).padStart(2, '0');
  const d = total % 10;
  return `${m}:${s}.${d}`;
}

export default function App() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setElapsed((t) => t + 100);
    }, 100);
    return () => clearInterval(id);
  }, [running]);

  const lastLap = laps.length > 0 ? laps[laps.length - 1] : 0;

  return (
    <main style={page}>
      <h1>010 · 秒表</h1>
      <p style={muted}>
        running 变化时 effect 重新执行；重新执行前，上一次 return 的清理函数会先清除旧定时器，所以永远只有一个定时器在工作
      </p>

      <section style={card}>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            fontVariantNumeric: 'tabular-nums',
            color: running ? '#0f172a' : '#64748b',
          }}
        >
          {format(elapsed)}
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 20 }}>
          <button style={btn} onClick={() => setRunning((r) => !r)}>
            {running ? '暂停' : '启动'}
          </button>
          <button
            style={ghostBtn}
            disabled={!running}
            onClick={() => setLaps((prev) => [...prev, elapsed])}
          >
            记次
          </button>
          <button
            style={ghostBtn}
            disabled={elapsed === 0}
            onClick={() => {
              setRunning(false);
              setElapsed(0);
              setLaps([]);
            }}
          >
            重置
          </button>
        </div>
      </section>

      {laps.length > 0 && (
        <section style={{ marginTop: 16 }}>
          <h2 style={{ fontSize: 15 }}>计次记录（新在上）</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {[...laps].reverse().map((lap, reverseIndex) => {
              const index = laps.length - 1 - reverseIndex;
              const delta = lap - (index === 0 ? 0 : laps[index - 1]);
              return (
                <li
                  key={`${index}-${lap}`}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderBottom: '1px solid #f1f5f9',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  <span>第 {index + 1} 圈</span>
                  <span style={{ color: '#2563eb' }}>+{format(delta)}</span>
                  <span style={{ color: '#64748b' }}>累计 {format(lap)}</span>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </main>
  );
}
