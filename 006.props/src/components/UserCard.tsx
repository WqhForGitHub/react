import type { CSSProperties, ReactNode } from 'react';

export interface User {
  id: number;
  name: string;
  role: string;
  followers: number;
  tags: string[];
  followed: boolean;
}

interface UserCardProps {
  user: User;
  onToggleFollow: (id: number) => void;
  children?: ReactNode;
}

const card: CSSProperties = {
  padding: 20,
  borderRadius: 14,
  border: '1px solid #e2e8f0',
  background: '#fff',
};

const btn: CSSProperties = {
  padding: '6px 14px',
  border: 'none',
  borderRadius: 999,
  background: '#2563eb',
  color: '#fff',
  cursor: 'pointer',
  fontSize: 14,
};

const ghostBtn: CSSProperties = {
  ...btn,
  background: '#f1f5f9',
  color: '#475569',
};

const tag: CSSProperties = {
  padding: '2px 10px',
  borderRadius: 999,
  background: '#f1f5f9',
  color: '#475569',
  fontSize: 12,
};

export function UserCard({ user, onToggleFollow, children }: UserCardProps) {
  return (
    <article style={card}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: '#6366f1',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {user.name.slice(0, 1)}
        </span>
        <div>
          <div style={{ fontWeight: 700 }}>{user.name}</div>
          <div style={{ color: '#64748b', fontSize: 13 }}>{user.role}</div>
        </div>
        <button
          style={{ ...(user.followed ? ghostBtn : btn), marginLeft: 'auto' }}
          onClick={() => onToggleFollow(user.id)}
        >
          {user.followed ? '取消关注' : '关注'}
        </button>
      </header>

      {children && (
        <blockquote
          style={{
            margin: '12px 0 0',
            padding: '8px 12px',
            borderLeft: '3px solid #c7d2fe',
            background: '#f8fafc',
            borderRadius: 6,
            color: '#475569',
            fontSize: 14,
          }}
        >
          {children}
        </blockquote>
      )}

      <footer
        style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, fontSize: 13, color: '#64748b' }}
      >
        <span>{user.followers + (user.followed ? 1 : 0)} 关注者</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          {user.tags.map((t) => (
            <span key={t} style={tag}>
              {t}
            </span>
          ))}
        </div>
      </footer>
    </article>
  );
}
