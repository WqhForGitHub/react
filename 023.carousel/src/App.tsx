import { useState, type CSSProperties } from 'react';
import { Carousel, type Slide } from './components/Carousel';

const slides: Slide[] = [
  {
    id: 's1',
    title: '自动轮播',
    subtitle: 'setInterval 驱动，暂停或卸载时由清理函数复位',
    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
  },
  {
    id: 's2',
    title: '循环切换',
    subtitle: '到最后一张会回到第一张，往左同理',
    background: 'linear-gradient(135deg, #0ea5e9, #22d3ee)',
  },
  {
    id: 's3',
    title: '悬停暂停',
    subtitle: '鼠标移入暂停自动播放，移出后重新开始',
    background: 'linear-gradient(135deg, #f59e0b, #f97316)',
  },
  {
    id: 's4',
    title: '指示器跳转',
    subtitle: '下方圆点可以直接跳到任意一张',
    background: 'linear-gradient(135deg, #22c55e, #14b8a6)',
  },
];

const page: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  maxWidth: 720,
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
  const [interval, setInterval] = useState(3000);

  return (
    <main style={page}>
      <h1>023 · 轮播图</h1>
      <p style={muted}>
        定时器随 paused / interval 变化重建，重建前先由清理函数清掉旧的；索引用取模实现首尾循环
      </p>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '16px 0' }}>
        <span style={muted}>自动播放间隔</span>
        {[2000, 3000, 5000].map((ms) => (
          <button key={ms} style={ms === interval ? btn : ghostBtn} onClick={() => setInterval(ms)}>
            {ms / 1000} 秒
          </button>
        ))}
        <span style={{ ...muted, marginLeft: 'auto' }}>鼠标移到轮播上试试暂停</span>
      </div>

      <Carousel slides={slides} interval={interval} />
    </main>
  );
}
