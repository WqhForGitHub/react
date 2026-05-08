import { useState, useEffect } from 'react';
import { createConnection } from './chat';

const serverUrl = 'https://localhost:1234';

/**
 * Demo 2: React 如何重新同步 Effect
 * 用户可以在下拉菜单中选择不同的聊天室，Effect 会自动重新同步
 */
function ChatRoom({ roomId }: { roomId: string }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return <h1>欢迎来到 {roomId} 房间</h1>;
}

export default function Demo2ReSync() {
  const [roomId, setRoomId] = useState('general');
  const [show, setShow] = useState(false);

  return (
    <div className="demo-section">
      <h2>Demo 2: React 如何重新同步 Effect</h2>
      <p>
        切换聊天室时，Effect 会断开旧连接并建立新连接。点击"打开聊天"挂载组件。
        <br />
        在开发环境中，React 会额外执行一次 Effect 来验证其是否可以重新同步。
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
