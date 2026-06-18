import { useState, useEffect } from 'react';
import { createConnection } from '../chat';
import { showNotification } from '../notification';

const serverUrl = 'https://localhost:1234';

/**
 * Demo 2: 问题 — theme 作为依赖项导致切换主题时重连
 *
 * Effect 依赖 [roomId, theme]，切换主题时聊天也会重连。
 * showNotification 是非响应式逻辑，不应该因为 theme 变化而触发重连。
 */
function ChatRoom({ roomId, theme }: { roomId: string; theme: 'dark' | 'light' }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      showNotification('Connected!', theme);
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, theme]); // ⚠️ theme 作为依赖项，切换主题时会重连

  return <h1>Welcome to the {roomId} room</h1>;
}

export default function Demo2_ThemeProblem() {
  const [roomId, setRoomId] = useState('general');
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="demo-section">
      <h2>Demo 2: 问题 — theme 导致聊天重连</h2>
      <p>
        Effect 依赖 <code>[roomId, theme]</code>，切换主题时聊天也会重连。<br />
        <strong>问题：</strong>showNotification 是非响应式逻辑，不应该因为 theme 变化而触发重连。
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
