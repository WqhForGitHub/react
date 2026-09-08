import { useState, type CSSProperties } from 'react';
import { UserCard, type User } from './components/UserCard';

const mottos: Record<number, string> = {
  1: '保持好奇，持续重构。',
  2: '代码首先是写给人看的。',
  3: '先跑起来，再变优雅。',
  4: '少即是多。',
};

const initialUsers: User[] = [
  { id: 1, name: '陈晨', role: '前端工程师', followers: 328, tags: ['React', 'TS'], followed: false },
  { id: 2, name: '李雷', role: '全栈工程师', followers: 512, tags: ['Node', 'Docker'], followed: true },
  { id: 3, name: '韩梅', role: 'UI 设计师', followers: 891, tags: ['Figma', '动效'], followed: false },
  { id: 4, name: '王浩', role: '算法工程师', followers: 267, tags: ['Python', 'LLM'], followed: false },
];

const page: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  maxWidth: 860,
  margin: '40px auto',
  padding: 24,
};

const muted: CSSProperties = { color: '#64748b', fontSize: 14, lineHeight: 1.7 };

export default function App() {
  const [users, setUsers] = useState(initialUsers);

  const toggleFollow = (id: number) =>
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, followed: !u.followed } : u)));

  const totalFollowers = users.reduce(
    (sum, u) => sum + u.followers + (u.followed ? 1 : 0),
    0
  );

  return (
    <main style={page}>
      <h1>006 · 父子组件通信</h1>
      <p style={muted}>
        数据通过 props 从父组件流到子组件（user），子组件通过回调把事件传回父组件
        （onToggleFollow），children 插槽让父级自定义卡片中间的内容
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 16,
          marginTop: 16,
        }}
      >
        {users.map((user) => (
          <UserCard key={user.id} user={user} onToggleFollow={toggleFollow}>
            {mottos[user.id]}
          </UserCard>
        ))}
      </div>

      <p style={{ ...muted, marginTop: 16 }}>
        四位作者共 {totalFollowers} 关注者，点击卡片上的按钮试试联动更新
      </p>
    </main>
  );
}
