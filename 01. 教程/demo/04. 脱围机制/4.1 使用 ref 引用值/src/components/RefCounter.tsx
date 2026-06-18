import { useRef } from 'react';

/**
 * 使用 ref 引用值 - 计数器示例
 *
 * 点击按钮时 ref.current 递增，但组件不会重新渲染。
 * 只有 alert 弹窗会显示当前点击次数。
 * 这演示了 ref 的核心特性：变更 ref.current 不会触发重新渲染。
 */
export default function RefCounter() {
  const ref = useRef(0);

  function handleClick() {
    ref.current = ref.current + 1;
    alert('你点击了 ' + ref.current + ' 次');
  }

  return (
    <div className="demo-card">
      <h2>1. Ref 计数器</h2>
      <p className="description">
        点击按钮时 <code>ref.current</code> 递增，但组件<strong>不会重新渲染</strong>。
        只有 alert 弹窗会显示当前点击次数。
      </p>
      <button onClick={handleClick}>点击我</button>
      <div className="hint">
        提示：页面上没有显示计数，因为 ref 的变更不触发渲染
      </div>
    </div>
  );
}
