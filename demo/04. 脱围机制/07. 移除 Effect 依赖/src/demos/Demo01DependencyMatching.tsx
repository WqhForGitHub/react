import { useState, useEffect } from 'react';
import { createConnection } from '../utils/chat';

const serverUrl = 'https://localhost:1234';

/**
 * Demo01: 依赖应该和代码保持一致
 * 展示正确声明 Effect 依赖，使 Effect 与 props/state 同步
 */
function ChatRoom({ roomId }: { roomId: string }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ 所有依赖已声明

  return <h1>欢迎来到 {roomId} 房间！</h1>;
}

export default function Demo01DependencyMatching() {
  const [roomId, setRoomId] = useState('所有');

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Demo 01: 依赖应该和代码保持一致</h2>
      <p>
        当 <code>roomId</code> 改变时，Effect 重新运行以连接到新的房间。
        依赖 <code>[roomId]</code> 确保了 Effect 与组件的 props 保持同步。
      </p>
      <label>
        选择聊天室：
        <select
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          style={{ marginLeft: '0.5rem' }}
        >
          <option value="所有">所有</option>
          <option value="旅游">旅游</option>
          <option value="音乐">音乐</option>
        </select>
      </label>
      <hr />
      <ChatRoom roomId={roomId} />
    </div>
  );
}
