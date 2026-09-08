import { useState, type CSSProperties } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

const page: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  maxWidth: 640,
  margin: '40px auto',
  padding: 24,
};

const card: CSSProperties = {
  padding: 20,
  marginTop: 16,
  borderRadius: 12,
  background: '#fff',
  border: '1px solid #e2e8f0',
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

const activeBtn: CSSProperties = {
  ...btn,
  background: '#1d4ed8',
  outline: '2px solid #bfdbfe',
};

const muted: CSSProperties = { color: '#64748b', fontSize: 14 };

const h2: CSSProperties = { margin: '0 0 12px', fontSize: 16, color: '#0f172a' };

function MessageInbox({ count }: { count: number }) {
  if (count === 0) {
    return <p style={{ color: '#94a3b8', margin: 0 }}>收件箱是空的，去休息一下吧</p>;
  }

  const senders = ['张三', '李四', '产品群', '系统通知'];
  return (
    <div>
      <strong>{count} 条未读消息</strong>
      <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
        {Array.from({ length: Math.min(count, 5) }, (_, i) => (
          <li key={i}>
            来自 {senders[i % senders.length]} 的第 {i + 1} 条消息
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  const [showTip, setShowTip] = useState(true);
  const [status, setStatus] = useState<Status>('idle');
  const [unread, setUnread] = useState(2);

  return (
    <main style={page}>
      <h1>003 · 条件渲染</h1>

      <section style={card}>
        <h2 style={h2}>写法一：&& 短路</h2>
        <button style={btn} onClick={() => setShowTip((v) => !v)}>
          {showTip ? '隐藏提示' : '显示提示'}
        </button>
        {showTip && <p style={{ ...muted, marginBottom: 0 }}>提示：条件为 true 时才渲染这段文字</p>}
      </section>

      <section style={card}>
        <h2 style={h2}>写法二：三元 / 条件并列</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(['idle', 'loading', 'success', 'error'] as Status[]).map((s) => (
            <button key={s} style={status === s ? activeBtn : ghostBtn} onClick={() => setStatus(s)}>
              {s}
            </button>
          ))}
        </div>
        <p style={{ marginTop: 12, marginBottom: 4 }}>
          {status === 'idle' && '等待操作'}
          {status === 'loading' && '加载中，请稍候…'}
          {status === 'success' && '操作成功完成'}
          {status === 'error' && '出错了，请重试'}
        </p>
        <p style={{ ...muted, margin: 0 }}>
          当前状态是 <code>{status}</code>
        </p>
      </section>

      <section style={card}>
        <h2 style={h2}>写法三：组件内提前 return</h2>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
          <button style={ghostBtn} onClick={() => setUnread((c) => c + 1)}>
            收到一条
          </button>
          <button style={ghostBtn} onClick={() => setUnread((c) => Math.max(0, c - 1))}>
            读一条
          </button>
          <button style={ghostBtn} onClick={() => setUnread(0)}>
            全部已读
          </button>
        </div>
        <MessageInbox count={unread} />
      </section>
    </main>
  );
}
