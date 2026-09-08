import { useEffect, useState, type CSSProperties } from 'react';
import { fetchUsers, type User } from './api/fakeUsers';

type Status = 'loading' | 'success' | 'error';

const page: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  maxWidth: 680,
  margin: '40px auto',
  padding: 24,
};

const card: CSSProperties = {
  padding: 20,
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

const muted: CSSProperties = { color: '#64748b', fontSize: 14 };

function Skeleton() {
  return (
    <div>
      {Array.from({ length: 3 }, (_, i) => (
        <div
          key={i}
          style={{ height: 64, borderRadius: 12, background: '#e2e8f0', marginBottom: 10 }}
        />
      ))}
      <p style={{ ...muted, textAlign: 'center' }}>请求进行中…</p>
    </div>
  );
}

export default function App() {
  const [status, setStatus] = useState<Status>('loading');
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [flaky, setFlaky] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let active = true;
    setStatus('loading');
    setError('');
    fetchUsers({ delay: 1000, failRate: flaky ? 0.6 : 0 })
      .then((data) => {
        if (!active) return;
        setUsers(data);
        setStatus('success');
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : '未知错误');
        setStatus('error');
      });
    return () => {
      active = false;
    };
  }, [refreshKey, flaky]);

  return (
    <main style={page}>
      <h1>013 · 异步请求三态</h1>
      <p style={muted}>
        loading / success / error 三种状态渲染三种界面；清理函数里的 active 标记会丢弃过期请求的结果
      </p>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', margin: '16px 0' }}>
        <button style={btn} onClick={() => setRefreshKey((k) => k + 1)}>
          重新请求
        </button>
        <label style={muted}>
          <input
            type="checkbox"
            checked={flaky}
            onChange={(e) => setFlaky(e.target.checked)}
          />{' '}
          模拟不稳定网络（60% 失败）
        </label>
        <span style={{ ...muted, marginLeft: 'auto' }}>
          当前状态：<code>{status}</code>
        </span>
      </div>

      {status === 'loading' && <Skeleton />}

      {status === 'error' && (
        <section style={{ ...card, textAlign: 'center', padding: 32 }}>
          <p style={{ fontSize: 40, margin: '0 0 8px' }}>!</p>
          <p style={{ color: '#ef4444', fontWeight: 600 }}>{error}</p>
          <button style={btn} onClick={() => setRefreshKey((k) => k + 1)}>
            重试
          </button>
        </section>
      )}

      {status === 'success' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 12,
          }}
        >
          {users.map((user) => (
            <article key={user.id} style={card}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: user.color,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                  }}
                >
                  {user.name.slice(0, 1)}
                </span>
                <div>
                  <div style={{ fontWeight: 700 }}>{user.name}</div>
                  <div style={{ ...muted, fontSize: 12 }}>{user.city}</div>
                </div>
              </div>
              <p style={{ ...muted, fontSize: 12, marginBottom: 0 }}>{user.email}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
