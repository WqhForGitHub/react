import { useState, useEffect } from 'react';
import { createConnection } from './chat';

/**
 * Demo 4: 没有依赖项的 Effect
 * 当 serverUrl 和 roomId 都不是响应式值时，依赖数组可以为空
 * Effect 仅在组件挂载时连接，卸载时断开
 */
const serverUrl = 'https://localhost:1234';
const roomId = 'general';

function ChatRoom() {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, []);

  return <h1>欢迎来到 {roomId} 房间</h1>;
}

export default function Demo4EmptyDeps() {
  const [show, setShow] = useState(false);

  return (
    <div className="demo-section">
      <h2>Demo 4: 没有依赖项的 Effect（空依赖数组）</h2>
      <p>
        当 <code>serverUrl</code> 和 <code>roomId</code> 都不是响应式值（不在组件内部声明）时，
        依赖数组可以为空 <code>[]</code>。
        <br />
        Effect 仅在组件挂载时连接，卸载时断开。
      </p>
      <button onClick={() => setShow(!show)}>
        {show ? '关闭聊天' : '打开聊天'}
      </button>
      {show && <hr />}
      {show && <ChatRoom />}
    </div>
  );
}
