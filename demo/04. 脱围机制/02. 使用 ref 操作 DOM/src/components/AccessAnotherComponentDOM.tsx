import { useRef, forwardRef } from 'react';

/**
 * 示例：访问另一个组件的 DOM 节点
 * 父组件通过 ref 传递给子组件，子组件将其转发给内部的 DOM 元素
 */

interface MyInputProps {
  placeholder?: string;
}

const MyInput = forwardRef<HTMLInputElement, MyInputProps>(
  function MyInput({ placeholder }, ref) {
    return <input ref={ref} placeholder={placeholder} />;
  }
);

export default function AccessAnotherComponentDOM() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    inputRef.current?.focus();
  }

  return (
    <div className="demo-card">
      <h3>访问另一个组件的 DOM 节点</h3>
      <p>
        父组件通过 <code>forwardRef</code> 将 ref 传递给子组件，
        子组件将其转发给内部的 DOM 元素。
      </p>
      <div className="demo-area">
        <MyInput ref={inputRef} placeholder="子组件的输入框" />
        <button onClick={handleClick}>聚焦输入框</button>
      </div>
      <div className="code-hint">
        <code>{`const MyInput = forwardRef(function MyInput(props, ref) { return <input ref={ref} />; })`}</code>
      </div>
    </div>
  );
}
