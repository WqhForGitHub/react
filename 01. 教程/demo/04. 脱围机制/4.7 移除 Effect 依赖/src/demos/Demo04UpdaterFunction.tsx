import { useState, useEffect } from 'react';
import { createConnection } from '../utils/chat';

const serverUrl = 'https://localhost:1234';

/**
 * Demo04: 是否在读取一些状态来计算下一个状态？
 * 展示使用更新函数（updater function）代替直接读取 state
 */

// ❌ 错误示例：在 Effect 中直接读取 messages state
function BadChatRoom({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    connection.on('message', (receivedMessage) => {
      // 🔴 避免：直接读取 messages 导致它成为依赖
      setMessages([...messages, receivedMessage as string]);
    });
    return () => connection.disconnect();
  }, [roomId, messages]); // messages 成为依赖，每次收到消息都会重新连接！

  return (
    <div style={{ border: '1px solid red', padding: '1rem', marginBottom: '1rem' }}>
      <h4>❌ 错误示例：直接读取 state</h4>
      <p>messages 成为依赖 → 每次收到消息都重新连接聊天</p>
      <button onClick={() => setMessages((msgs) => [...msgs, '测试消息'])}>
        模拟收到消息
      </button>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

// ✅ 正确示例：使用更新函数
function GoodChatRoom({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    connection.on('message', (receivedMessage) => {
      // ✅ 好：使用更新函数，不需要读取 messages
      setMessages((msgs) => [...msgs, receivedMessage as string]);
    });
    return () => connection.disconnect();
  }, [roomId]); // ✅ 不再需要 messages 作为依赖

  return (
    <div style={{ border: '1px solid green', padding: '1rem' }}>
      <h4>✅ 正确示例：使用更新函数</h4>
      <p>使用 <code>setMessages(msgs =&gt; [...msgs, newMsg])</code>，messages 不再是依赖</p>
      <button onClick={() => setMessages((msgs) => [...msgs, '测试消息'])}>
        模拟收到消息
      </button>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Demo04UpdaterFunction() {
  const [roomId, setRoomId] = useState('音乐');

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Demo 04: 使用更新函数移除依赖</h2>
      <p>
        当你需要根据前一个 state 计算下一个 state 时，使用更新函数
        （如 <code>setCount(c =&gt; c + 1)</code>）代替直接读取 state，
        这样该 state 就不需要成为 Effect 的依赖。
      </p>
      <label>
        选择聊天室：
        <select
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          style={{ marginLeft: '0.5rem' }}
        >
          <option value="旅游">旅游</option>
          <option value="音乐">音乐</option>
        </select>
      </label>
      <hr />
      <BadChatRoom roomId={roomId} />
      <GoodChatRoom roomId={roomId} />
    </div>
  );
}
