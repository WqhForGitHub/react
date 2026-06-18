/**
 * 规则 2：标签必须闭合
 *
 * 演示 JSX 中自闭合标签和成对标签的正确写法。
 */

export default function ClosedTagsDemo() {
  return (
    <div>
      <p>JSX 要求标签必须正确闭合。像 <code>&lt;img&gt;</code> 这样的自闭合标签必须书写成 <code>&lt;img /&gt;</code>，而像 <code>&lt;li&gt;oranges</code> 这样只有开始标签的元素必须带有闭合标签，需要改为 <code>&lt;li&gt;oranges&lt;/li&gt;</code>。</p>

      <div className="comparison">
        <div>
          <div className="comparison-label" style={{ color: '#ef4444' }}>HTML 写法（不合法的 JSX）</div>
          <div className="error-block">{`<img
  src="photo.jpg"
  alt="照片"
>
<ul>
  <li>事项一
  <li>事项二
  <li>事项三
</ul>`}</div>
        </div>
        <div>
          <div className="comparison-label" style={{ color: '#22c55e' }}>JSX 写法（正确）</div>
          <div className="success-block">{`<img
  src="photo.jpg"
  alt="照片"
/>
<ul>
  <li>事项一</li>
  <li>事项二</li>
  <li>事项三</li>
</ul>`}</div>
        </div>
      </div>

      <p>常见的需要自闭合的标签：</p>

      <div className="comparison">
        <div>
          <div className="comparison-label" style={{ color: '#ef4444' }}>HTML 写法</div>
          <div className="error-block">{`<br>
<hr>
<img src="x.jpg">
<input type="text">
<meta charset="utf-8">`}</div>
        </div>
        <div>
          <div className="comparison-label" style={{ color: '#22c55e' }}>JSX 写法</div>
          <div className="success-block">{`<br />
<hr />
<img src="x.jpg" />
<input type="text" />
<meta charset="utf-8" />`}</div>
        </div>
      </div>

      <div className="demo-box">
        <h3>运行效果</h3>
        <>
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
