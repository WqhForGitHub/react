import { useState, useEffect } from 'react';
import { createConnection } from './chat';

/**
 * 聊天室演示
 * 演示内容：
 * 1. Effect 的清理函数
 * 2. 为什么需要清理函数（连接泄漏）
 * 3. 开发环境下 Effect 运行两次的原因
 * 4. 切换聊天室时 Effect 的清理与重新执行
 */
function ChatRoom({ roomId }: { roomId: string }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();
    // 清理函数：组件卸载或 Effect 重新运行前调用
    return () => connection.disconnect();
  }, [roomId]);

  return <h3>欢迎来到 {roomId} 聊天室！</h3>;
}

export default function ChatRoomDemo() {
  const [roomId, setRoomId] = useState('general');
  const [show, setShow] = useState(false);

  return (
    <div className="demo-section">
      <h2>2. 聊天室 — Effect 清理函数</h2>
      <p>
        Effect 在组件挂载时建立连接，在组件卸载或依赖项变化时通过清理函数断开连接。
        在开发环境下（严格模式），React 会重新挂载组件来验证清理函数是否正确实现。
      </p>

      <div className="demo-box">
        <div className="controls-row">
          <label>
            选择聊天室：{' '}
            <select
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="select-input"
            >
              <option value="general">general</option>
              <option value="travel">travel</option>
              <option value="music">music</option>
            </select>
          </label>
          <button onClick={() => setShow(!show)} className="btn">
            {show ? '关闭聊天室' : '打开聊天室'}
          </button>
        </div>
        {show && <hr />}
        {show && <ChatRoom roomId={roomId} />}
      </div>

      <div className="note">
        <strong>要点：</strong>
        <ul>
          <li>Effect 返回的清理函数在组件卸载或 Effect 重新运行前调用</li>
          <li>开发环境下 React 会挂载→卸载→重新挂载组件，验证清理逻辑</li>
          <li>切换聊天室时，先断开旧连接，再建立新连接</li>
          <li>没有清理函数 → 连接泄漏（用户来回切换页面时连接不断累积）</li>
        </ul>
      </div>
    </div>
  );
}
