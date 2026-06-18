import { useState, useEffect } from 'react';
import { createConnection } from './chat';

/**
 * Demo 3: Effect 会"响应"于响应式值
 * serverUrl 和 roomId 都是响应式值（state/props），必须包含在依赖项中
 */
function ChatRoom({ roomId }: { roomId: string }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]);

  return (
    <>
      <label>
        服务器 URL：
        <input
          value={serverUrl}
          onChange={(e) => setServerUrl(e.target.value)}
        />
      </label>
      <h1>欢迎来到 {roomId} 房间</h1>
    </>
  );
}

export default function Demo3ReactiveValues() {
  const [roomId, setRoomId] = useState('general');

  return (
    <div className="demo-section">
      <h2>Demo 3: Effect 会"响应"于响应式值</h2>
      <p>
        <code>serverUrl</code>（state）和 <code>roomId</code>（prop）都是响应式值。
        <br />
        当任一值变化时，Effect 会重新同步。修改服务器 URL 或切换聊天室试试。
      </p>
      <label>
        选择聊天室：
        <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
          <option value="general">所有</option>
          <option value="travel">旅游</option>
          <option value="music">音乐</option>
        </select>
      </label>
      <hr />
      <ChatRoom roomId={roomId} />
    </div>
  );
}
