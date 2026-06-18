/**
 * 在 JSX 中通过大括号使用 JavaScript —— 使用大括号引用变量
 *
 * 大括号是一扇进入 JavaScript 世界的窗户。
 * 在 JSX 标签内的文本中，可以用大括号嵌入 JavaScript 变量。
 */
import { useState } from 'react';

export default function VariableDemo() {
  const [name, setName] = useState('Gregorio Y. Zara');

  return (
    <div>
      <h3>大括号：一扇进入 JavaScript 世界的窗户</h3>
      <p>在大括号内可以嵌入任何 JavaScript 表达式：</p>
      <div style={{
        border: '1px solid var(--border)',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
      }}>
        <h1 style={{ margin: '0 0 12px' }}>{name}的待办事项列表</h1>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>优化视频电话</li>
          <li>准备航空学课程</li>
          <li>研究乙醇燃料引擎</li>
        </ul>
      </div>
      <p>试着更改名字，观察标题的变化：</p>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        style={{
          padding: '8px 12px',
          border: '1px solid var(--border)',
          borderRadius: 6,
          font: 'inherit',
          width: '100%',
          maxWidth: 300,
        }}
      />
      <div className="code-block">
{`const name = "${name}";
return (
  <h1>{name}的待办事项列表</h1>
)`}
      </div>
    </div>
  )
}
