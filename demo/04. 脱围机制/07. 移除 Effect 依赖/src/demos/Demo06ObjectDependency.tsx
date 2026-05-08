import { useState, useEffect } from 'react';
import { createConnectionWithOptions } from '../utils/chat';

const serverUrl = 'https://localhost:1234';

/**
 * Demo06: 一些响应式值是否无意中改变了？
 * 展示对象和函数作为依赖时的问题及解决方案
 */

// ❌ 错误示例：options 对象在每次渲染时重新创建，导致 Effect 频繁重新同步
function BadChatRoom({ roomId }: { roomId: string }) {
  const [message, setMessage] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = {
    serverUrl: serverUrl,
    roomId: roomId,
  };

  useEffect(() => {
    const connection = createConnectionWithOptions(options);
    connection.connect();
    return () => connection.disconnect();
  }, [options]); // options 每次渲染都是新对象 → 每次渲染都重新连接

  return (
    <div style={{ border: '1px solid red', padding: '1rem', marginBottom: '1rem' }}>
      <h4>❌ 错误示例：对象作为依赖</h4>
      <p>在输入框输入内容会导致重新连接（因为组件重渲染时 options 对象被重新创建）</p>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="输入消息..."
      />
      <p style={{ fontSize: '0.85rem', color: '#666' }}>
        当前消息: {message}
      </p>
    </div>
  );
}

// ✅ 正确示例：将对象移入 Effect 内部，只依赖原始值
function GoodChatRoom({ roomId }: { roomId: string }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId,
    };
    const connection = createConnectionWithOptions(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ 只依赖原始值 roomId

  return (
    <div style={{ border: '1px solid green', padding: '1rem' }}>
      <h4>✅ 正确示例：将对象移到 Effect 内部</h4>
      <p>只依赖原始值 roomId，输入内容不会导致重新连接</p>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="输入消息..."
      />
      <p style={{ fontSize: '0.85rem', color: '#666' }}>
        当前消息: {message}
      </p>
    </div>
  );
}

// ✅ 从对象中提取原始值作为依赖
function ExtractedChatRoom({
  options,
}: {
  options: { serverUrl: string; roomId: string };
}) {
  const [message, setMessage] = useState('');
  const { roomId, serverUrl: sUrl } = options;

  useEffect(() => {
    const connection = createConnectionWithOptions({
      roomId: roomId,
      serverUrl: sUrl,
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, sUrl]); // ✅ 从对象中提取原始值作为依赖

  return (
    <div style={{ border: '1px solid blue', padding: '1rem' }}>
      <h4>✅ 正确示例：从对象 props 中提取原始值</h4>
      <p>
        从 props 对象中解构出原始值 <code>roomId</code> 和 <code>serverUrl</code>，
        避免依赖整个对象
      </p>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="输入消息..."
      />
    </div>
  );
}

export default function Demo06ObjectDependency() {
  const [roomId, setRoomId] = useState('音乐');

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Demo 06: 避免对象和函数作为依赖</h2>
      <p>
        JavaScript 中每个新创建的对象和函数都是不同的，即使值相同。
        将它们作为依赖会导致 Effect 比预期更频繁地重新同步。
        解决方案：将对象移到组件外、Effect 内，或从中提取原始值。
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
      <ExtractedChatRoom
        options={{ serverUrl: serverUrl, roomId: roomId }}
      />
      <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '1rem' }}>
        打开控制台观察：在错误示例中输入内容会触发重新连接，
        而在正确示例中不会。
      </p>
    </div>
  );
}
