import { useState, useEffect } from 'react';
import { createConnection } from '../chat';
import { showNotification } from '../notification';
import { useEffectEvent } from '../useEffectEvent';

const serverUrl = 'https://localhost:1234';

/**
 * Demo 3: 解决方案 — 使用 useEffectEvent 提取非响应式逻辑
 *
 * onConnected 是 Effect Event，它内部的代码不是响应式的，
 * 但能始终读取最新的 props 和 state（如 theme）。
 * Effect 只依赖 [roomId]，切换主题不会重连。
 */
function ChatRoom({ roomId, theme }: { roomId: string; theme: 'dark' | 'light' }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      onConnected();
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ 只依赖 roomId，切换主题不会重连

  return <h1>Welcome to the {roomId} room</h1>;
}

export default function Demo3_EffectEventSolution() {
  const [roomId, setRoomId] = useState('general');
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="demo-section">
      <h2>Demo 3: 解决方案 — useEffectEvent</h2>
      <p>
        使用 <code>useEffectEvent</code> 提取非响应式逻辑。<br />
        <code>onConnected</code> 始终能读取最新的 theme，但不会因为 theme 变化而重连。
      </p>
      <label>
        Choose the chat room:{' '}
        <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <label style={{ display: 'block', marginTop: 8 }}>
        <input
          type="checkbox"
          checked={isDark}
          onChange={(e) => setIsDark(e.target.checked)}
        />
        Use dark theme
      </label>
      <hr />
      <ChatRoom roomId={roomId} theme={isDark ? 'dark' : 'light'} />
    </div>
  );
}
