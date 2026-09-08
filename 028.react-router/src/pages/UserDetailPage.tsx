import type { CSSProperties } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { users } from '../data/users';

const chip: CSSProperties = {
  padding: '2px 10px',
  borderRadius: 999,
  background: '#e0e7ff',
  color: '#3730a3',
  fontSize: 13,
  marginRight: 6,
};

const ghostBtn: CSSProperties = {
  padding: '8px 14px',
  border: 'none',
  borderRadius: 8,
  background: '#f1f5f9',
  color: '#334155',
  cursor: 'pointer',
  fontSize: 14,
};

export default function UserDetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  const id = Number(params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return (
      <section style={{ padding: '24px 0', textAlign: 'center' }}>
        <h1>用户不存在</h1>
        <p style={{ color: '#64748b' }}>没有 id 为 {params.id} 的用户</p>
        <p>
          <Link to="/users">返回用户列表</Link>
        </p>
      </section>
    );
  }

  return (
    <section style={{ padding: '24px 0' }}>
      <button style={ghostBtn} onClick={() => navigate(-1)}>
        ← 返回上一页
      </button>

      <h1 style={{ marginTop: 20 }}>{user.name}</h1>
      <p style={{ color: '#64748b' }}>
        {user.role} · id={user.id}
      </p>
      <p>{user.bio}</p>
      <div style={{ marginTop: 8 }}>
        {user.skills.map((skill) => (
          <span key={skill} style={chip}>
            {skill}
          </span>
        ))}
      </div>
      <p style={{ marginTop: 24 }}>
        <Link to="/users">查看全部用户</Link>
      </p>
    </section>
  );
}
