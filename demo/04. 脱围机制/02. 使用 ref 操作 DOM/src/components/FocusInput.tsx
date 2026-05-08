import { useRef } from 'react';

/**
 * 示例：使文本输入框获得焦点
 * 点击按钮将使输入框获得焦点，演示了基本的 ref 操作 DOM 用法
 */
export default function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    inputRef.current?.focus();
  }

  return (
    <div className="demo-card">
      <h3>使文本输入框获得焦点</h3>
      <p>点击按钮将使输入框获得焦点，演示了基本的 ref 操作 DOM 用法。</p>
      <div className="demo-area">
        <input ref={inputRef} placeholder="点击下方按钮聚焦我" />
        <button onClick={handleClick}>聚焦输入框</button>
      </div>
      <div className="code-hint">
        <code>{`inputRef.current.focus()`}</code>
      </div>
    </div>
  );
}
