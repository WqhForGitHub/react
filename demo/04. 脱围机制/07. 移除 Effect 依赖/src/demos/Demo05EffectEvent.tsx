import { useState, useEffect, useRef, useCallback } from 'react';
import { createConnection, playSound } from '../utils/chat';

const serverUrl = 'https://localhost:1234';

/**
 * useEffectEvent 的 polyfill 实现
 * Effect Event 允许在 Effect 中读取最新值而不需要将其添加为依赖
 */
function useEffectEvent<T extends (...args: unknown[]) => void>(handler: T): T {
  const handlerRef = useRef<T>(handler);

  handlerRef.current = handler;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(((...args: unknown[]) => {
    return handlerRef.current(...args);
  }) as T, []);
}

/**
 * Demo05: 你想读取一个值而不对其变化做出"反应"吗？
 * 展示使用 Effect Event 读取最新值而不触发 Effect 重新执行
 */

// ❌ 错误示例：isMuted 成为依赖，切换静音会重新连接
function BadChatRoom({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<string[]>([]);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages((msgs) => [...msgs, receivedMessage as string]);
      // 🔴 避免：isMuted 成为依赖
      if (!isMuted) {
        playSound();
      }
    });
    return () => connection.disconnect();
  }, [roomId, isMuted]); // isMuted 改变 → 重新连接！

  return (
    <div style={{ border: '1px solid red', padding: '1rem', marginBottom: '1rem' }}>
      <h4>❌ 错误示例：isMuted 成为依赖</h4>
      <p>切换静音会导致聊天重新连接</p>
      <label>
        <input
          type="checkbox"
          checked={isMuted}
          onChange={(e) => setIsMuted(e.target.checked)}
        />
        静音
      </label>
      <button
        onClick={() => setMessages((msgs) => [...msgs, '新消息'])}
        style={{ marginLeft: '0.5rem' }}
      >
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

// ✅ 正确示例：使用 Effect Event
function GoodChatRoom({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<string[]>([]);
  const [isMuted, setIsMuted] = useState(false);

  const onMessage = useEffectEvent((receivedMessage: unknown) => {
    setMessages((msgs) => [...msgs, receivedMessage as string]);
    if (!isMuted) {
      playSound();
    }
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    connection.on('message', (receivedMessage) => {
      onMessage(receivedMessage);
    });
    return () => connection.disconnect();
  }, [roomId]); // ✅ 只依赖 roomId

  return (
    <div style={{ border: '1px solid green', padding: '1rem' }}>
      <h4>✅ 正确示例：使用 Effect Event</h4>
      <p>
        通过 <code>useEffectEvent</code> 包裹非响应式逻辑，
        isMuted 不再是依赖，切换静音不会重新连接
      </p>
      <label>
        <input
          type="checkbox"
          checked={isMuted}
          onChange={(e) => setIsMuted(e.target.checked)}
        />
        静音
      </label>
      <button
        onClick={() => setMessages((msgs) => [...msgs, '新消息'])}
        style={{ marginLeft: '0.5rem' }}
      >
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

export default function Demo05EffectEvent() {
  const [roomId, setRoomId] = useState('音乐');

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Demo 05: 使用 Effect Event 读取值而不"反应"</h2>
      <p>
        Effect Event 允许你将非响应式逻辑从 Effect 中抽离出来，
        读取最新值而不需要将其添加为依赖。切换静音不会导致重新连接。
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
