import { useRef, useImperativeHandle, forwardRef } from 'react';

/**
 * 示例：使用命令句柄暴露一部分 API
 * 使用 useImperativeHandle 限制暴露给父组件的功能，只暴露 focus 方法
 */

interface MyInputHandle {
  focus(): void;
}

interface MyInputProps {
  placeholder?: string;
}

const MyInput = forwardRef<MyInputHandle, MyInputProps>(
  function MyInput({ placeholder }, ref) {
    const realInputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      // 只暴露 focus，没有别的
      focus() {
        realInputRef.current?.focus();
      },
    }));

    return <input ref={realInputRef} placeholder={placeholder} />;
  }
);

export default function ImperativeHandleDemo() {
  const inputRef = useRef<MyInputHandle>(null);

  function handleClick() {
    inputRef.current?.focus();
  }

  return (
    <div className="demo-card">
      <h3>使用命令句柄暴露一部分 API</h3>
      <p>
        使用 <code>useImperativeHandle</code> 限制暴露给父组件的功能。
        父组件只能调用 <code>focus()</code>，无法直接操作 DOM。
      </p>
      <div className="demo-area">
        <MyInput ref={inputRef} placeholder="只暴露了 focus 方法的输入框" />
        <button onClick={handleClick}>聚焦输入框</button>
      </div>
      <div className="code-hint">
        <code>{`useImperativeHandle(ref, () => ({ focus() { realInputRef.current.focus(); } }))`}</code>
      </div>
    </div>
  );
}
