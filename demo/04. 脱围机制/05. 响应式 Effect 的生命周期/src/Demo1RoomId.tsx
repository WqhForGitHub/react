import { useEffect } from 'react';
import { createConnection } from './chat';

const serverUrl = 'https://localhost:1234';

/**
 * Demo 1: Effect 依赖于 roomId
 * 当 roomId 变化时，Effect 会重新同步（断开旧连接，建立新连接）
 */
function ChatRoom({ roomId }: { roomId: string }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return <h1>欢迎来到 {roomId} 房间</h1>;
}

export default function Demo1RoomId() {
  return (
    <div className="demo-section">
      <h2>Demo 1: Effect 依赖于 roomId</h2>
      <p>
        当 <code>roomId</code> 变化时，Effect 会断开旧连接并建立新连接。
        <br />
        打开控制台查看连接/断开日志。
      </p>
      <ChatRoom roomId="general" />
    </div>
  );
}
