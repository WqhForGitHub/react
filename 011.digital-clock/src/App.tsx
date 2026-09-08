import { useEffect, useState, type CSSProperties } from 'react';

const ZONES: { city: string; timeZone: string }[] = [
  { city: '北京', timeZone: 'Asia/Shanghai' },
  { city: '东京', timeZone: 'Asia/Tokyo' },
  { city: '伦敦', timeZone: 'Europe/London' },
  { city: '纽约', timeZone: 'America/New_York' },
  { city: '悉尼', timeZone: 'Australia/Sydney' },
];

const WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

const page: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  maxWidth: 720,
  margin: '40px auto',
  padding: 24,
};

const hero: CSSProperties = {
  textAlign: 'center',
  padding: 32,
  borderRadius: 16,
  background: 'linear-gradient(135deg, #0f172a, #312e81)',
  color: '#fff',
};

const zoneCard: CSSProperties = {
  padding: 16,
  borderRadius: 12,
  border: '1px solid #e2e8f0',
  textAlign: 'center',
};

const muted: CSSProperties = { color: '#64748b', fontSize: 14 };

export default function App() {
  const [now, setNow] = useState(() => new Date());
  const [showSeconds, setShowSeconds] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const localTime = now.toLocaleTimeString('zh-CN', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: showSeconds ? '2-digit' : undefined,
  });

  return (
    <main style={page}>
      <h1>011 · 数字时钟</h1>

      <section style={hero}>
        <div style={{ fontSize: 72, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
          {localTime}
        </div>
        <p style={{ margin: '8px 0 0', opacity: 0.8 }}>
          {now.getFullYear()} 年 {now.getMonth() + 1} 月 {now.getDate()} 日 ·{' '}
          {WEEKDAYS[now.getDay()]}
        </p>
      </section>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '16px 0' }}>
        <label style={muted}>
          <input
            type="checkbox"
            checked={showSeconds}
            onChange={(e) => setShowSeconds(e.target.checked)}
          />{' '}
          显示秒数
        </label>
        <span style={{ ...muted, marginLeft: 'auto' }}>
          定时器在挂载时启动一次，卸载时由清理函数移除
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: 12,
        }}
      >
        {ZONES.map((zone) => (
          <div key={zone.timeZone} style={zoneCard}>
            <div style={{ ...muted, marginBottom: 4 }}>{zone.city}</div>
            <div style={{ fontSize: 20, fontVariantNumeric: 'tabular-nums' }}>
              {now.toLocaleTimeString('zh-CN', {
                timeZone: zone.timeZone,
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: showSeconds ? '2-digit' : undefined,
              })}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
