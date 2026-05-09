/**
 * 规则 3：使用驼峰式命名法给大部分属性命名
 *
 * 演示 JSX 中属性命名的驼峰式写法，以及 class → className 等转换。
 */

export default function CamelCaseDemo() {
  return (
    <div>
      <p>JSX 最终会被转化为 JavaScript，而 JSX 中的属性也会变成 JavaScript 对象中的键值对。但 JavaScript 对变量的命名有限制：变量名称不能包含 <code>-</code> 符号或者像 <code>class</code> 这样的保留字。</p>

      <p>这就是为什么在 React 中，大部分 HTML 和 SVG 属性都用驼峰式命名法表示：</p>

      <div className="comparison">
        <div>
          <div className="comparison-label" style={{ color: '#ef4444' }}>HTML 属性</div>
          <div className="error-block">{`<div class="container">
  <label for="name">
  </label>
  <img tabindex="0">
  <svg>
    <circle
      stroke-width="2"
      fill-opacity="0.5"
    />
  </svg>
</div>`}</div>
        </div>
        <div>
          <div className="comparison-label" style={{ color: '#22c55e' }}>JSX 属性</div>
          <div className="success-block">{`<div className="container">
  <label htmlFor="name">
  </label>
  <img tabIndex={0} />
  <svg>
    <circle
      strokeWidth={2}
      fillOpacity={0.5}
    />
  </svg>
</div>`}</div>
        </div>
      </div>

      <p>常见的属性名转换：</p>

      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '12px 0' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border)' }}>
            <th style={{ textAlign: 'left', padding: '8px 12px' }}>HTML 属性</th>
            <th style={{ textAlign: 'left', padding: '8px 12px' }}>JSX 属性</th>
            <th style={{ textAlign: 'left', padding: '8px 12px' }}>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            <td style={{ padding: '8px 12px' }}><code>class</code></td>
            <td style={{ padding: '8px 12px' }}><code>className</code></td>
            <td style={{ padding: '8px 12px' }}><code>class</code> 是 JS 保留字</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            <td style={{ padding: '8px 12px' }}><code>for</code></td>
            <td style={{ padding: '8px 12px' }}><code>htmlFor</code></td>
            <td style={{ padding: '8px 12px' }}><code>for</code> 是 JS 保留字</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            <td style={{ padding: '8px 12px' }}><code>tabindex</code></td>
            <td style={{ padding: '8px 12px' }}><code>tabIndex</code></td>
            <td style={{ padding: '8px 12px' }}>驼峰式命名</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            <td style={{ padding: '8px 12px' }}><code>stroke-width</code></td>
            <td style={{ padding: '8px 12px' }}><code>strokeWidth</code></td>
            <td style={{ padding: '8px 12px' }}>不含 <code>-</code> 符号</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            <td style={{ padding: '8px 12px' }}><code>fill-opacity</code></td>
            <td style={{ padding: '8px 12px' }}><code>fillOpacity</code></td>
            <td style={{ padding: '8px 12px' }}>不含 <code>-</code> 符号</td>
          </tr>
          <tr>
            <td style={{ padding: '8px 12px' }}><code>onclick</code></td>
            <td style={{ padding: '8px 12px' }}><code>onClick</code></td>
            <td style={{ padding: '8px 12px' }}>事件处理器驼峰式</td>
          </tr>
        </tbody>
      </table>

      <div className="warning">
        <strong>陷阱：</strong> 由于历史原因，<code>aria-*</code> 和 <code>data-*</code> 属性是以带 <code>-</code> 符号的 HTML 格式书写的，不需要转换为驼峰式。例如：<code>aria-label</code>、<code>data-testid</code>。
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
