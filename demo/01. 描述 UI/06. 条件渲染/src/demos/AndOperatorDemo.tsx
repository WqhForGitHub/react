/**
 * 条件渲染 -- 与运算符（&&）
 *
 * 当条件成立时渲染一些 JSX，否则不做任何渲染。
 * 注意：切勿将数字放在 && 左侧，因为 0 会被 React 渲染出来。
 */

import { useState } from 'react'

interface ItemProps {
  name: string
  isPacked: boolean
}

function Item({ name, isPacked }: ItemProps) {
  return (
    <li className="item">
      {name} {isPacked && '✅'}
    </li>
  )
}

export default function AndOperatorDemo() {
  const [showPitfall, setShowPitfall] = useState(false)

  return (
    <div>
      <h3>与运算符（&&）</h3>
      <p>
        当条件成立时，使用 <code>&&</code> 渲染一些 JSX；否则不渲染。
        当 <code>isPacked</code> 为真值时，渲染勾选符号。
      </p>
      <section>
        <h1>Sally Ride 的行李清单</h1>
        <ul>
          <Item isPacked={true} name="宇航服" />
          <Item isPacked={true} name="带金箔的头盔" />
          <Item isPacked={false} name="Tam 的照片" />
        </ul>
      </section>
      <div className="code-block">
{`function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✅'}
    </li>
  );
}`}
      </div>

      <div className="warning" style={{ marginTop: 20 }}>
        <strong>陷阱：</strong>切勿将数字放在 <code>&&</code> 左侧。
        <p style={{ marginTop: 8, marginBottom: 0 }}>
          如果左侧是 <code>0</code>，整个表达式将变成 <code>0</code>，React 会渲染 <code>0</code> 而不是不进行渲染。
        </p>
      </div>

      <button
        className="pitfall-toggle"
        onClick={() => setShowPitfall(s => !s)}
      >
        {showPitfall ? '隐藏' : '展示'}数字 0 的陷阱示例
      </button>

      {showPitfall && (
        <div className="demo-box" style={{ marginTop: 12 }}>
          <h3>数字 0 陷阱演示</h3>
          <p>
            <code>messageCount &lt;p&gt;New messages&lt;/p&gt;</code> —— 当 messageCount 为 0 时：
          </p>
          <div style={{ padding: '8px 12px', border: '1px dashed var(--border)', borderRadius: 6 }}>
            <span style={{ color: '#ef4444' }}>错误写法：</span>{' '}
            {0 && <span>New messages</span>}
            <span style={{ color: 'var(--text)', fontSize: '0.85em', marginLeft: 8 }}>
              ← 渲染出了 0！
            </span>
          </div>
          <div style={{ padding: '8px 12px', border: '1px dashed var(--border)', borderRadius: 6, marginTop: 8 }}>
            <span style={{ color: '#22c55e' }}>正确写法：</span>{' '}
            {0 > 0 && <span>New messages</span>}
            <span style={{ color: 'var(--text)', fontSize: '0.85em', marginLeft: 8 }}>
              ← 不渲染任何内容
            </span>
          </div>
          <div className="code-block" style={{ marginTop: 12 }}>
{`// 错误：messageCount 为 0 时渲染出 0
messageCount && <p>New messages</p>

// 正确：将左侧改成布尔类型
messageCount > 0 && <p>New messages</p>`}
          </div>
        </div>
      )}
    </div>
  )
}
