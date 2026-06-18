import { useState, useEffect } from 'react';

/**
 * Playground 演示
 * 演示内容：
 * 1. Effect 的完整生命周期：挂载 → 清理 → 重新运行
 * 2. 每个 Effect "捕获" 其对应渲染时的值
 * 3. 清理函数取消挂起的延时器
 * 4. React 总是在执行下一轮 Effect 之前清理上一轮 Effect
 */
function Playground() {
  const [text, setText] = useState('a');
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    function onTimeout() {
      const msg = `⏰ 延时触发: "${text}"`;
      console.log(msg);
      setLogs((prev) => [...prev, msg]);
    }

    const scheduleMsg = `🔵 调度 "${text}" 日志`;
    console.log(scheduleMsg);
    setLogs((prev) => [...prev, scheduleMsg]);

    const timeoutId = setTimeout(onTimeout, 3000);

    return () => {
      const cancelMsg = `🟡 取消 "${text}" 日志`;
      console.log(cancelMsg);
      setLogs((prev) => [...prev, cancelMsg]);
      clearTimeout(timeoutId);
    };
  }, [text]);

  return (
    <div>
      <label>
        日志内容：{' '}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="text-input"
        />
      </label>
      <h3 style={{ marginTop: 8 }}>当前值: {text}</h3>
      <div
        className="log-panel"
        style={{
          marginTop: 8,
          padding: 8,
          background: '#1e1e1e',
          color: '#d4d4d4',
          borderRadius: 6,
          fontFamily: 'monospace',
          fontSize: 13,
          maxHeight: 200,
          overflowY: 'auto',
        }}
      >
        {logs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
      </div>
    </div>
  );
}

export default function PlaygroundDemo() {
  const [show, setShow] = useState(false);

  return (
    <div className="demo-section">
      <h2>3. Playground — Effect 生命周期</h2>
      <p>
        使用 <code>setTimeout</code> 调度 3 秒后的日志。清理函数取消挂起的延时器。
        快速输入时，React 总是在执行下一轮 Effect 之前清理上一轮的 Effect，所以最多只有一个延时器被调度。
        每个 Effect "捕获"它对应渲染时的值。
      </p>

      <div className="demo-box">
        <button onClick={() => setShow(!show)} className="btn">
          {show ? '卸载组件' : '挂载组件'}
        </button>
        {show && <hr style={{ margin: '12px 0' }} />}
        {show && <Playground />}
      </div>

      <div className="note">
        <strong>要点：</strong>
        <ul>
          <li>快速输入 "abc" → 中间的延时器会被取消，最终只触发一次</li>
          <li>每个 Effect 闭包捕获对应渲染时的值，3 秒后打印的是调度时的值而非最新值</li>
          <li>卸载组件时，最后一轮 Effect 的清理函数会被调用</li>
          <li>开发环境下会多一次调度/取消（严格模式的重新挂载）</li>
        </ul>
      </div>
    </div>
  );
}
