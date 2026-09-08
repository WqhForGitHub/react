import type { CSSProperties } from 'react';

const page: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  maxWidth: 720,
  margin: '40px auto',
  padding: 24,
  lineHeight: 1.6,
};

const tag: CSSProperties = {
  display: 'inline-block',
  padding: '4px 12px',
  margin: 4,
  borderRadius: 999,
  background: '#e0e7ff',
  color: '#3730a3',
  fontSize: 14,
};

function Avatar({ name, size = 64 }: { name: string; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #6366f1, #a855f7)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size / 2.5,
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {name.slice(0, 1)}
    </div>
  );
}

export default function App() {
  const name = 'React';
  const skills = ['组件', 'JSX', 'Props', '表达式'];
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? '早上好' : hour < 18 ? '下午好' : '晚上好';

  return (
    <main style={page}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Avatar name={name} />
        <div>
          <h1 style={{ margin: 0 }}>Hello, {name}!</h1>
          <p style={{ color: '#64748b', margin: 4 }}>
            {greeting}，现在是 {now.toLocaleDateString('zh-CN')}{' '}
            {now.toLocaleTimeString('zh-CN')}
          </p>
        </div>
      </div>

      <section style={{ marginTop: 28 }}>
        <h2>JSX 里可以写什么</h2>
        <ul>
          <li>变量：{name}</li>
          <li>表达式：{2 + 3 * 4}</li>
          <li>三元运算：{hour < 12 ? 'AM' : 'PM'}</li>
          <li>函数调用：{name.toUpperCase()}</li>
          <li>对象也可以当 props：<Avatar name="Vite" size={28} /></li>
        </ul>
      </section>

      <section>
        <h2>列表渲染</h2>
        <div>
          {skills.map((skill) => (
            <span key={skill} style={tag}>
              {skill}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
