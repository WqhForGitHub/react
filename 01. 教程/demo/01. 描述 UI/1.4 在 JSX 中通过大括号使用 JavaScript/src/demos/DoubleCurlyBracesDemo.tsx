/**
 * 在 JSX 中通过大括号使用 JavaScript —— 使用 "双大括号"：JSX 中的 CSS 和对象
 *
 * 为了在 JSX 中传递对象，你必须用另一对额外的大括号包裹对象。
 * 最常见的场景是内联 CSS 样式。
 */
import { useState } from 'react';

export default function DoubleCurlyBracesDemo() {
  const [bgColor, setBgColor] = useState('black');
  const [textColor, setTextColor] = useState('pink');

  return (
    <div>
      <h3>双大括号 = 大括号里的对象</h3>
      <p>
        JSX 中 <code>{'{{'} {'}}'}</code> 不过是包在大括号里的一个对象罢了。
        最常见的用法是内联 <code>style</code> 属性。
      </p>
      <div style={{
        backgroundColor: bgColor,
        color: textColor,
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        transition: 'all 0.3s',
      }}>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>优化视频电话</li>
          <li>准备航空学课程</li>
          <li>研究乙醇燃料引擎</li>
        </ul>
      </div>
      <p>试着更改颜色：</p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          背景色：
          <input
            type="color"
            value={bgColor === 'black' ? '#000000' : bgColor}
            onChange={e => setBgColor(e.target.value)}
          />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          文字色：
          <input
            type="color"
            value={textColor === 'pink' ? '#ffc0cb' : textColor}
            onChange={e => setTextColor(e.target.value)}
          />
        </label>
      </div>
      <div className="code-block" style={{ marginTop: 16 }}>
{`// 外层大括号：进入 JavaScript 世界
// 内层大括号：定义一个对象
<ul style={{
    backgroundColor: "${bgColor}",
    color: "${textColor}"
}}>
  <li>优化视频电话</li>
</ul>`}
      </div>
      <div className="warning">
        <strong>陷阱：</strong>内联 <code>style</code> 属性使用驼峰命名法。例如，HTML 的 <code>background-color</code> 应写成 <code>backgroundColor</code>。
      </div>
    </div>
  )
}
