import { useState } from 'react';
import { useChatRoom } from '../hooks/useChatRoom';

function ChatRoom({ roomId }: { roomId: string }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');
  const [messages, setMessages] = useState<string[]>([]);

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl,
    onReceiveMessage(msg) {
      setMessages((prev) => [...prev, msg]);
    },
  });

  return (
    <div className="chat-room">
      <label>
        Server URL:
        <input
          value={serverUrl}
          onChange={(e) => setServerUrl(e.target.value)}
        />
      </label>
      <h3>Welcome to the {roomId} room!</h3>
      <div className="messages">
        {messages.length === 0 ? (
          <p className="muted">等待消息中...</p>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className="message">
              {msg}
            </div>
          ))
        )}
      </div>
      <p className="muted">请查看控制台了解连接状态</p>
    </div>
  );
}

export default function ChatRoomDemo() {
  const [roomId, setRoomId] = useState('general');

  return (
    <div className="demo-section">
      <h2>useChatRoom - 聊天室连接</h2>
      <p>修改 serverUrl 或 roomId 时，Effect 会响应变化并重新同步连接。打开控制台查看连接/断开日志。</p>
      <div className="demo-box">
        <label>
          Choose the chat room:{' '}
          <select
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          >
            <option value="general">general</option>
            <option value="travel">travel</option>
            <option value="music">music</option>
          </select>
        </label>
        <hr />
        <ChatRoom roomId={roomId} />
      </div>
      <div className="code-hint">
        <strong>核心要点：</strong>自定义 Hook 可以接收响应值作为参数，当这些值变化时 Hook 内部的 Effect 会重新执行。事件处理函数通过 ref 避免不必要的重连。
      </div>
    </div>
  );
}
