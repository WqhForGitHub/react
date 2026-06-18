/**
 * 将 HTML 转化为 JSX
 *
 * 演示将普通 HTML 标签直接放入 React 组件时会遇到的问题，
 * 以及正确的 JSX 写法。
 */

export default function HtmlToJsxDemo() {
  return (
    <div>
      <p>假设你有以下 HTML 标签：</p>

      <div className="code-block">{`<h1>海蒂·拉玛的待办事项</h1>
<img
  src="https://i.imgur.com/yXOvdOSs.jpg"
  alt="Hedy Lamarr"
  class="photo"
>
<ul>
  <li>发明一种新式交通信号灯
  <li>排练一个电影场景
  <li>改进频谱技术
</ul>`}</div>

      <p>如果直接复制到组件中，<strong>并不能正常工作</strong>：</p>

      <div className="error-block">{`// ❌ 这不起作用！
export default function TodoList() {
  return (
    <h1>海蒂·拉玛的待办事项</h1>
    <img
      src="https://i.imgur.com/yXOvdOSs.jpg"
      alt="Hedy Lamarr"
      class="photo"
    >
    <ul>
      <li>发明一种新式交通信号灯
      <li>排练一个电影场景
      <li>改进频谱技术
    </ul>
  );
}

// Error: Adjacent JSX elements must be wrapped
// in an enclosing tag.`}</div>

      <div className="warning">
        <strong>注意：</strong> 上面的代码存在三个问题 —— 多个根元素未包裹、标签未闭合、<code>class</code> 应为 <code>className</code>。JSX 语法比 HTML 更加严格！
      </div>

      <p>修正后的正确 JSX 写法：</p>

      <div className="success-block">{`// ✅ 正确的 JSX 写法
export default function TodoList() {
  return (
    <>
      <h1>海蒂·拉玛的待办事项</h1>
      <img
        src="https://i.imgur.com/yXOvdOSs.jpg"
        alt="Hedy Lamarr"
        className="photo"
      />
      <ul>
        <li>发明一种新式交通信号灯</li>
        <li>排练一个电影场景</li>
        <li>改进频谱技术</li>
      </ul>
    </>
  );
}`}</div>

      <div className="demo-box">
        <h3>运行效果</h3>
        <>
          <h1>海蒂·拉玛的待办事项</h1>
          <img
            src="https://i.imgur.com/yXOvdOSs.jpg"
            alt="Hedy Lamarr"
            className="todo-img"
          />
          <ul>
            <li>发明一种新式交通信号灯</li>
            <li>排练一个电影场景</li>
            <li>改进频谱技术</li>
          </ul>
        </>
      </div>
    </div>
  )
}
