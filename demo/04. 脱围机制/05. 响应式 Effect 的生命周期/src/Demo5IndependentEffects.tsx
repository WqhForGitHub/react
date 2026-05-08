import { useState, useEffect } from 'react';
import { createConnection } from './chat';

const serverUrl = 'https://localhost:1234';

/**
 * Demo 5: 每个 Effect 表示一个独立的同步过程
 * 访问记录和连接是两个独立的过程，应该拆分为两个 Effect
 */
function logVisit(roomId: string) {
  console.log(`📊 访问记录：用户进入了 "${roomId}" 房间`);
}

function ChatRoom({ roomId }: { roomId: string }) {
  // Effect 1: 记录访问（独立的过程）
  useEffect(() => {
    logVisit(roomId);
  }, [roomId]);

  // Effect 2: 连接聊天室（独立的过程）
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return <h1>欢迎来到 {roomId} 房间</h1>;
}

export default function Demo5IndependentEffects() {
  const [roomId, setRoomId] = useState('general');
  const [show, setShow] = useState(false);

  return (
    <div className="demo-section">
      <h2>Demo 5: 每个 Effect 表示一个独立的同步过程</h2>
      <p>
        访问记录（<code>logVisit</code>）和聊天连接是两个独立的同步过程，
        应该拆分为两个独立的 Effect。
        <br />
        这样即使连接 Effect 增加了新的依赖项导致重新同步，也不会重复记录访问。
      </p>
      <label>
        选择聊天室：
        <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
          <option value="general">所有</option>
          <option value="travel">旅游</option>
          <option value="music">音乐</option>
        </select>
      </label>
      <button onClick={() => setShow(!show)}>
        {show ? '关闭聊天' : '打开聊天'}
      </button>
      {show && <hr />}
      {show && <ChatRoom roomId={roomId} />}
    </div>
  );
}
