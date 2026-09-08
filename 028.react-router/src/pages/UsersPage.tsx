import type { CSSProperties } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { users } from '../data/users';

const input: CSSProperties = {
  padding: '9px 11px',
  border: '1px solid #cbd5e1',
  borderRadius: 8,
  fontSize: 14,
  width: 260,
};

const row: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '10px 12px',
  borderRadius: 10,
  border: '1px solid #e2e8f0',
  marginBottom: 8,
};

export default function UsersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') ?? '';

  const filtered = users.filter(
    (user) => user.name.includes(q) || user.role.includes(q)
  );

  return (
    <section style={{ padding: '24px 0' }}>
      <h1>用户列表</h1>
      <p style={{ color: '#64748b', fontSize: 14 }}>
        搜索词通过 useSearchParams 写进地址栏 ?q=…，刷新页面也能保留，也可以直接分享这个链接
      </p>

      <input
        style={input}
        placeholder="搜索姓名或职位…"
        value={q}
        onChange={(e) => {
          const next = e.target.value;
          if (next) {
            setSearchParams({ q: next }, { replace: true });
          } else {
            setSearchParams({}, { replace: true });
          }
        }}
      />

      <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
        {filtered.map((user) => (
          <li key={user.id} style={row}>
            <span
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: '#6366f1',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
              }}
            >
              {user.name.slice(0, 1)}
            </span>
            <div style={{ flex: 1 }}>
              <div>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </div>
              <div style={{ color: '#64748b', fontSize: 13 }}>{user.role}</div>
            </div>
            <span style={{ color: '#94a3b8', fontSize: 12 }}>id={user.id}</span>
          </li>
        ))}
        {filtered.length === 0 && (
          <li style={{ color: '#64748b', padding: 12 }}>没有匹配「{q}」的用户</li>
        )}
      </ul>
    </section>
  );
}
