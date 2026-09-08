import { useState, type CSSProperties } from 'react';
import { Modal } from './components/Modal';

interface Member {
  id: number;
  name: string;
  level: string;
}

const initialMembers: Member[] = [
  { id: 1, name: '陈晨', level: '黄金会员' },
  { id: 2, name: '李雷', level: '白银会员' },
  { id: 3, name: '韩梅', level: '黄金会员' },
  { id: 4, name: '王浩', level: '青铜会员' },
];

const page: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  maxWidth: 640,
  margin: '40px auto',
  padding: 24,
};

const card: CSSProperties = {
  padding: 16,
  borderRadius: 12,
  border: '1px solid #e2e8f0',
  background: '#fff',
};

const row: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '10px 14px',
  borderRadius: 10,
  border: '1px solid #e2e8f0',
  marginBottom: 8,
};

const btn: CSSProperties = {
  padding: '8px 16px',
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

const dangerBtn: CSSProperties = {
  ...btn,
  background: '#ef4444',
};

const muted: CSSProperties = { color: '#64748b', fontSize: 14, lineHeight: 1.7 };

export default function App() {
  const [members, setMembers] = useState(initialMembers);
  const [pendingRemove, setPendingRemove] = useState<Member | null>(null);
  const [rulesOpen, setRulesOpen] = useState(false);

  const confirmRemove = () => {
    if (pendingRemove) {
      setMembers((prev) => prev.filter((m) => m.id !== pendingRemove.id));
    }
    setPendingRemove(null);
  };

  return (
    <main style={page}>
      <h1>019 · Portal 模态框</h1>
      <p style={muted}>
        createPortal 把弹窗渲染到 body 下，不受父容器的 overflow / z-index 限制；Esc 或点击遮罩都能关闭
      </p>

      <div style={{ ...card, maxHeight: 110, overflowY: 'auto', margin: '16px 0' }}>
        <p style={{ ...muted, margin: '0 0 8px' }}>
          这个小容器 overflow: auto、高度受限，但弹窗不会被它裁剪
        </p>
        <button style={btn} onClick={() => setRulesOpen(true)}>
          在小容器里打开弹窗
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {members.map((member) => (
          <li key={member.id} style={row}>
            <strong style={{ flex: 1 }}>{member.name}</strong>
            <span style={muted}>{member.level}</span>
            <button style={ghostBtn} onClick={() => setPendingRemove(member)}>
              删除
            </button>
          </li>
        ))}
        {members.length === 0 && <li style={{ ...muted, padding: 12 }}>会员都删光啦</li>}
      </ul>

      <Modal
        open={pendingRemove !== null}
        title="确认删除"
        onClose={() => setPendingRemove(null)}
        footer={
          <>
            <button style={ghostBtn} onClick={() => setPendingRemove(null)}>
              取消
            </button>
            <button style={dangerBtn} onClick={confirmRemove}>
              删除
            </button>
          </>
        }
      >
        确定要删除成员「{pendingRemove?.name}」吗？此操作无法撤销。
      </Modal>

      <Modal
        open={rulesOpen}
        title="Portal 是怎么工作的"
        onClose={() => setRulesOpen(false)}
        footer={
          <button style={btn} onClick={() => setRulesOpen(false)}>
            知道了
          </button>
        }
      >
        <p>1. 弹窗 DOM 渲染在 body 下，脱离了原来的层级；</p>
        <p>2. 事件依然沿 React 树冒泡：遮罩点击关闭，内容区 stopPropagation 阻止；</p>
        <p>3. 打开时锁定页面滚动，按 Esc 也能关闭。</p>
      </Modal>
    </main>
  );
}
