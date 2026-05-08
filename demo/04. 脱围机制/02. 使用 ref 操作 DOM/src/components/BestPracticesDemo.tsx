import { useState, useRef } from 'react';

/**
 * 示例：使用 refs 操作 DOM 的最佳实践
 * 演示安全与不安全的 DOM 操作：
 * - 非破坏性操作（聚焦、滚动）是安全的
 * - 手动修改 DOM（remove）会导致 React 管理的 DOM 不一致
 */
export default function BestPracticesDemo() {
  const [show, setShow] = useState(true);
  const ref = useRef<HTMLParagraphElement>(null);

  function handleToggleByState() {
    setShow(!show);
  }

  function handleRemoveFromDOM() {
    ref.current?.remove();
  }

  return (
    <div className="demo-card">
      <h3>使用 refs 操作 DOM 的最佳实践</h3>
      <p>
        非破坏性操作（聚焦、滚动）是安全的。但手动修改由 React 管理的 DOM 会导致问题：
      </p>
      <ol className="steps">
        <li>先按几次「通过 setState 切换」，消息正常消失和出现</li>
        <li>按「从 DOM 中删除」，手动移除 DOM 节点</li>
        <li>再按「通过 setState 切换」，观察 React 状态与 DOM 不一致导致的问题</li>
      </ol>
      <div className="demo-area">
        <button onClick={handleToggleByState}>通过 setState 切换</button>
        <button onClick={handleRemoveFromDOM} className="btn-danger">
          从 DOM 中删除
        </button>
        {show && <p ref={ref}>Hello world — 我是由 React 管理的 DOM 节点</p>}
      </div>
      <div className="code-hint">
        <strong>避免更改由 React 管理的 DOM 节点。</strong>
        如果必须修改，请只修改 React 没有理由更新的部分。
      </div>
    </div>
  );
}
