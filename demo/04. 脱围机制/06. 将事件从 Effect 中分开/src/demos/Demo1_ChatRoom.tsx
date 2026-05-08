import { useState, useEffect } from 'react';
import { createConnection, sendMessage } from '../chat';

const serverUrl = 'https://localhost:1234';

/**
 * Demo 1: 事件处理函数 vs Effect
 *
 * - 发送消息 → 事件处理函数（只在用户点击时运行）
 * - 连接聊天室 → Effect（需要保持同步，自动重新连接）
 */
function ChatRoom({ roomId }: { roomId: string }) {
  const [message, setMessage] = useState('');

  // Effect: 连接聊天室（响应式的，roomId 变化时重新连接）
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  // 事件处理函数: 发送消息（非响应式的，只在点击时运行）
  function handleSendClick() {
    sendMessage(message);
  }

  return (
    <>
      <h1>Welcome to the {roomId} room!</h1>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendClick}>Send</button>
    </>
  );
}

export default function Demo1_ChatRoom() {
  const [roomId, setRoomId] = useState('general');
  const [show, setShow] = useState(false);

  return (
    <div className="demo-section">
      <h2>Demo 1: 事件处理函数 vs Effect</h2>
      <p>
        <strong>发送消息</strong> 使用事件处理函数 — 只在用户点击时运行。<br />
        <strong>连接聊天室</strong> 使用 Effect — roomId 变化时自动重新连接。
      </p>
      <label>
        Choose the chat room:{' '}
        <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <button onClick={() => setShow(!show)}>
        {show ? 'Close chat' : 'Open chat'}
      </button>
      {show && <hr />}
      {show && <ChatRoom roomId={roomId} />}
    </div>
  );
}
