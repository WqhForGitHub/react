import { useState, type CSSProperties, type ReactNode } from 'react';

interface Profile {
  nickname: string;
  bio: string;
  city: string;
  stack: string[];
  level: 'junior' | 'mid' | 'senior';
  remote: boolean;
}

const initialProfile: Profile = {
  nickname: '',
  bio: '',
  city: '杭州',
  stack: ['React'],
  level: 'mid',
  remote: false,
};

const CITIES = ['北京', '上海', '杭州', '深圳', '成都'];
const STACKS = ['React', 'Vue', 'Node.js', 'TypeScript', 'Rust'];

const levelLabel: Record<Profile['level'], string> = {
  junior: '初级',
  mid: '中级',
  senior: '高级',
};

const page: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  maxWidth: 920,
  margin: '40px auto',
  padding: 24,
};

const card: CSSProperties = {
  padding: 24,
  borderRadius: 14,
  border: '1px solid #e2e8f0',
  background: '#fff',
};

const input: CSSProperties = {
  padding: '8px 10px',
  border: '1px solid #cbd5e1',
  borderRadius: 8,
  width: '100%',
  boxSizing: 'border-box',
};

const ghostBtn: CSSProperties = {
  padding: '8px 16px',
  border: 'none',
  borderRadius: 8,
  background: '#f1f5f9',
  color: '#334155',
  cursor: 'pointer',
};

const chip: CSSProperties = {
  padding: '2px 10px',
  borderRadius: 999,
  background: '#e0e7ff',
  color: '#3730a3',
  fontSize: 12,
};

const muted: CSSProperties = { color: '#64748b', fontSize: 14 };

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label style={{ display: 'block', marginBottom: 16 }}>
      <span style={{ display: 'flex', gap: 8, marginBottom: 6, fontWeight: 600 }}>
        {label}
        {hint && <em style={{ fontWeight: 400, color: '#94a3b8' }}>{hint}</em>}
      </span>
      {children}
    </label>
  );
}

export default function App() {
  const [profile, setProfile] = useState(initialProfile);

  const update = <K extends keyof Profile>(key: K, value: Profile[K]) => {
    setProfile((prev) => {
      const next = { ...prev };
      next[key] = value;
      return next;
    });
  };

  const toggleStack = (tech: string) => {
    setProfile((prev) => ({
      ...prev,
      stack: prev.stack.includes(tech)
        ? prev.stack.filter((t) => t !== tech)
        : [...prev.stack, tech],
    }));
  };

  return (
    <main style={page}>
      <h1>007 · 受控表单</h1>
      <p style={muted}>
        输入框的值全部来自 state，用户输入触发 onChange 更新 state，再由 state 驱动界面，这就是受控组件
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 20,
          marginTop: 16,
        }}
      >
        <section style={card}>
          <Field label="昵称">
            <input
              style={input}
              value={profile.nickname}
              onChange={(e) => update('nickname', e.target.value)}
              placeholder="如：阿珂"
            />
          </Field>

          <Field label="个人简介">
            <textarea
              style={{ ...input, minHeight: 72 }}
              value={profile.bio}
              onChange={(e) => update('bio', e.target.value)}
              placeholder="一句话介绍自己"
            />
          </Field>

          <Field label="所在城市">
            <select
              style={input}
              value={profile.city}
              onChange={(e) => update('city', e.target.value)}
            >
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </Field>

          <Field label="技术栈">
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {STACKS.map((tech) => (
                <label key={tech} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <input
                    type="checkbox"
                    checked={profile.stack.includes(tech)}
                    onChange={() => toggleStack(tech)}
                  />
                  {tech}
                </label>
              ))}
            </div>
          </Field>

          <Field label="级别">
            <div style={{ display: 'flex', gap: 14 }}>
              {(['junior', 'mid', 'senior'] as Profile['level'][]).map((level) => (
                <label key={level} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <input
                    type="radio"
                    name="level"
                    checked={profile.level === level}
                    onChange={() => update('level', level)}
                  />
                  {levelLabel[level]}
                </label>
              ))}
            </div>
          </Field>

          <Field label="接受远程办公">
            <input
              type="checkbox"
              checked={profile.remote}
              onChange={(e) => update('remote', e.target.checked)}
            />
          </Field>

          <button style={ghostBtn} onClick={() => setProfile(initialProfile)}>
            重置表单
          </button>
        </section>

        <section style={{ ...card, background: '#f8fafc' }}>
          <h2 style={{ marginTop: 0 }}>实时预览</h2>
          <p>
            <strong>{profile.nickname || '匿名用户'}</strong> · {profile.city} ·{' '}
            {levelLabel[profile.level]}
          </p>
          <p style={muted}>{profile.bio || '（还没有简介）'}</p>
          <p style={muted}>{profile.remote ? '接受远程办公' : '只考虑本地岗位'}</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {profile.stack.map((tech) => (
              <span key={tech} style={chip}>
                {tech}
              </span>
            ))}
            {profile.stack.length === 0 && <span style={muted}>（未选择技术栈）</span>}
          </div>
        </section>
      </div>
    </main>
  );
}
