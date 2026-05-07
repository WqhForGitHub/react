import { useState, useRef } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';

function Welcome() {
  const ref = useRef(null);

  useFadeIn(ref, 1000);

  return (
    <h1 className="welcome-fade" ref={ref}>
      Welcome
    </h1>
  );
}

export default function FadeInDemo() {
  const [show, setShow] = useState(false);

  return (
    <div className="demo-section">
      <h2>useFadeIn - 淡入动画</h2>
      <p>使用 requestAnimationFrame API 实现淡入动画。动画逻辑被提取到自定义 Hook 和一个 JavaScript 类中。</p>
      <div className="demo-box">
        <button onClick={() => setShow(!show)}>
          {show ? 'Remove' : 'Show'}
        </button>
        <hr />
        {show && <Welcome />}
      </div>
      <div className="code-hint">
        <strong>核心要点：</strong>Effect 可以连接 React 和外部系统。将复杂逻辑提取到类中，让 Effect 只负责"连接"，保持简洁。
      </div>
    </div>
  );
}
