/**
 * 规则 1：只能返回一个根元素
 *
 * 演示为什么 JSX 需要单一根元素，以及使用 <div> 和 Fragment 两种包裹方式。
 */

export default function SingleRootDemo() {
  return (
    <div>
      <p>如果想要在一个组件中包含多个元素，需要用一个父标签把它们包裹起来。</p>

      <div className="error-block">{`// ❌ 不能返回多个根元素
export default function TodoList() {
  return (
    <h1>海蒂·拉玛的待办事项</h1>
    <ul>...</ul>
  );
}
// Error: Adjacent JSX elements must be wrapped
// in an enclosing tag.`}</div>

      <h3>方式一：使用 &lt;div&gt; 包裹</h3>

      <div className="code-block">{`export default function TodoList() {
  return (
    <div>
      <h1>海蒂·拉玛的待办事项</h1>
      <ul>
        <li>发明一种新式交通信号灯</li>
        <li>排练一个电影场景</li>
        <li>改进频谱技术</li>
      </ul>
    </div>
  );
}`}</div>

      <div className="demo-box">
        <h3>运行效果（使用 div 包裹）</h3>
        <div>
          <h1>海蒂·拉玛的待办事项</h1>
          <ul>
            <li>发明一种新式交通信号灯</li>
            <li>排练一个电影场景</li>
            <li>改进频谱技术</li>
          </ul>
        </div>
      </div>

      <h3>方式二：使用 Fragment（&lt;&gt;...&lt;/&gt;）</h3>

      <p>如果不想在标签中增加额外的 <code>&lt;div&gt;</code>，可以用 <code>&lt;&gt;</code> 和 <code>&lt;/&gt;</code> 来代替：</p>

      <div className="code-block">{`export default function TodoList() {
  return (
    <>
      <h1>海蒂·拉玛的待办事项</h1>
      <ul>
        <li>发明一种新式交通信号灯</li>
        <li>排练一个电影场景</li>
        <li>改进频谱技术</li>
      </ul>
    </>
  );
}`}</div>

      <div className="demo-box">
        <h3>运行效果（使用 Fragment）</h3>
        <>
          <h1>海蒂·拉玛的待办事项</h1>
          <ul>
            <li>发明一种新式交通信号灯</li>
            <li>排练一个电影场景</li>
            <li>改进频谱技术</li>
          </ul>
        </>
      </div>

      <div className="warning">
        <strong>深入探讨 —— 为什么多个 JSX 标签需要被一个父元素包裹？</strong>
        <p style={{ margin: '8px 0 0' }}>
          JSX 虽然看起来很像 HTML，但在底层其实被转化为了 JavaScript 对象。
          你不能在一个函数中返回多个对象，除非用一个数组把它们包装起来。
          这就是为什么多个 JSX 标签必须要用一个父元素或者 Fragment 来包裹。
        </p>
      </div>
    </div>
  )
}
