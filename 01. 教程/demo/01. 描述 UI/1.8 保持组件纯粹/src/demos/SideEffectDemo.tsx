/**
 * 保持组件纯粹 -- 哪些地方可能引发副作用
 *
 * 副作用（更新屏幕、启动动画、更改数据等）通常属于事件处理程序。
 * 如果用尽一切办法仍无法为副作用找到合适的事件处理程序，可以使用 useEffect。
 */

import { useState, useEffect } from 'react'

export default function SideEffectDemo() {
  const [count, setCount] = useState(0)
  const [useEffectCount, setUseEffectCount] = useState(0)

  // 副作用放在事件处理程序中（推荐）
  function handleClick() {
    setCount(c => c + 1)
    // 其他副作用（API 调用、动画等）也可以放在这里
  }

  // 副作用放在 useEffect 中（最后手段）
  useEffect(() => {
    // 这个代码在渲染结束后执行
    if (useEffectCount > 0) {
      document.title = `Count: ${useEffectCount}`
    }
  })

  return (
    <div>
      <h3>哪些地方可能引发副作用</h3>
      <p>
        函数式编程在很大程度上依赖于纯函数，但某些事物在特定情况下不得不发生改变。
        这些变动包括更新屏幕、启动动画、更改数据等，它们被称为<strong>副作用</strong>。
      </p>
      <p>
        在 React 中，<strong>副作用通常属于事件处理程序</strong>。事件处理程序是 React 在你执行某些操作
        （如单击按钮）时运行的函数。即使事件处理程序是在你的组件内部定义的，它们也不会在渲染期间运行！
        因此事件处理程序无需是纯函数。
      </p>

      <section>
        <h2>事件处理程序中的副作用（推荐）</h2>
        <p>
          点击按钮更新计数 —— 这里的 <code>setCount</code> 是在事件处理程序中调用的，
          不会在渲染期间执行。
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="pitfall-toggle" onClick={handleClick}>
            点击计数
          </button>
          <span style={{ fontSize: '1.2em', color: 'var(--accent)' }}>
            Count: {count}
          </span>
        </div>
      </section>

      <div className="code-block">
{`function handleClick() {
  setCount(c => c + 1);
  // 其他副作用（API 调用、动画等）也可以放在这里
}

return (
  <button onClick={handleClick}>
    点击计数
  </button>
);`}
      </div>

      <section style={{ marginTop: 20 }}>
        <h2>useEffect 中的副作用（最后手段）</h2>
        <p>
          如果你用尽一切办法，仍无法为副作用找到合适的事件处理程序，
          可以调用组件中的 <code>useEffect</code> 方法将其附加到返回的 JSX 中。
          这会告诉 React 在渲染结束后执行它。
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="pitfall-toggle" onClick={() => setUseEffectCount(c => c + 1)}>
            更新页面标题
          </button>
          <span style={{ fontSize: '0.9em', color: 'var(--text)' }}>
            页面标题已更新为: &quot;Count: {useEffectCount}&quot;
          </span>
        </div>
      </section>

      <div className="code-block">
{`useEffect(() => {
  // 这个代码在渲染结束后执行
  document.title = \`Count: \${count}\`;
});`}
      </div>

      <div className="warning">
        <strong>最后手段：</strong>
        <p style={{ marginTop: 8, marginBottom: 0 }}>
          <code>useEffect</code> 应该是你最后的手段。如果可能，请尝试仅通过渲染过程来表达你的逻辑。
        </p>
      </div>

      <div className="code-block" style={{ marginTop: 16 }}>
{`// React 为何侧重于纯函数？
//
// 1. 组件可以在不同环境下运行（如服务器端），
//    因为它们对相同的输入总是返回相同的结果。
// 2. 可以为输入未更改的组件跳过渲染，提高性能。
// 3. 如果数据变化，React 可以安全地重新开始渲染，
//    而不会浪费时间完成过时的渲染。`}
      </div>
    </div>
  )
}
