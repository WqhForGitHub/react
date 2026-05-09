/**
 * 添加事件处理函数
 *
 * 如需添加一个事件处理函数，你需要先定义一个函数，然后将其作为 prop 传入合适的 JSX 标签。
 * 事件处理函数通常在组件内部定义，名称以 handle 开头，后跟事件名称。
 */
export default function AddEventHandlerDemo() {
  function handleClick() {
    alert('你点击了我！')
  }

  return (
    <div>
      <h3>定义事件处理函数</h3>
      <p>先声明 handleClick 函数，再通过 <code>onClick={'{handleClick}'}</code> 传入按钮：</p>
      <button onClick={handleClick}>
        点我
      </button>

      <h3 style={{ marginTop: 24 }}>内联事件处理函数</h3>
      <p>也可以在 JSX 中直接使用箭头函数：</p>
      <button onClick={() => alert('内联处理函数！')}>
        内联点击
      </button>
    </div>
  )
}
