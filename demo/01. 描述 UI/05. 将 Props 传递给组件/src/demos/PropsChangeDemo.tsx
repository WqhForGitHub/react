/**
 * 将 Props 传递给组件 —— Props 如何随时间变化
 *
 * 一个组件可能会随着时间的推移收到不同的 props。
 * Props 反映了组件在任何时间点的数据，并不仅仅是在开始时。
 *
 * 然而，props 是不可变的。当一个组件需要改变它的 props 时，
 * 它不得不"请求"它的父组件传递不同的 props —— 一个新对象！
 */
import { useState, useEffect } from 'react'

interface ClockProps {
  color: string
  time: string
}

function Clock({ color, time }: ClockProps) {
  return (
    <h1 style={{ color, margin: 0, fontSize: '2.5em', fontFamily: 'var(--mono)' }}>
      {time}
    </h1>
  )
}

const COLORS = [
  { label: '红色', value: '#e74c3c' },
  { label: '绿色', value: '#2ecc71' },
  { label: '蓝色', value: '#3498db' },
  { label: '紫色', value: '#9b59b6' },
  { label: '橙色', value: '#e67e22' },
]

export default function PropsChangeDemo() {
  const [color, setColor] = useState(COLORS[0].value)
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      <h3>Props 如何随时间变化</h3>
      <p><code>Clock</code> 组件从其父组件接收 <code>color</code> 和 <code>time</code> 两个 props。<code>time</code> 每秒都在变化，选择不同颜色时 <code>color</code> 也会改变。</p>

      <div style={{ marginBottom: 16 }}>
        <label style={{ marginRight: 8 }}>选择颜色：</label>
        <select
          value={color}
          onChange={e => setColor(e.target.value)}
          style={{ padding: '4px 8px', border: '1px solid var(--border)', borderRadius: 4, font: 'inherit' }}
        >
          {COLORS.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      <div style={{
        border: '1px solid var(--border)',
        borderRadius: 8,
        padding: 24,
        textAlign: 'center',
        margin: '16px 0',
      }}>
        <Clock color={color} time={time} />
      </div>

      <div className="code-block">
{`function Clock({ color, time }) {
  return (
    <h1 style={{ color: color }}>
      {time}
    </h1>
  )
}

// 父组件每秒传递新的 time prop
// 选择颜色时传递新的 color prop
<Clock color="${color}" time="${time}" />`}
      </div>

      <div className="warning">
        <strong>重要：</strong>Props 是不可变的（immutable）。当一个组件需要改变它的 props（例如，响应用户交互或新数据）时，它不得不"请求"它的父组件传递<strong>不同的 props</strong> —— 一个新对象！不要尝试"更改 props"。当你需要响应用户输入时，你可以"设置 state"。
      </div>
    </div>
  )
}
