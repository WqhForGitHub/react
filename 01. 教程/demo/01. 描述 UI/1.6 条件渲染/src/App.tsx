import { useState, type ComponentType } from 'react'
import './App.css'
import ConditionalReturnDemo from './demos/ConditionalReturnDemo'
import ReturnNullDemo from './demos/ReturnNullDemo'
import TernaryDemo from './demos/TernaryDemo'
import AndOperatorDemo from './demos/AndOperatorDemo'
import VariableAssignmentDemo from './demos/VariableAssignmentDemo'

interface DemoItem {
  key: string
  label: string
  component: ComponentType
  description: string
}

const DEMOS: DemoItem[] = [
  {
    key: 'conditional-return',
    label: '条件返回 JSX',
    component: ConditionalReturnDemo,
    description: '使用 JavaScript 的 if 语句来条件性地返回不同的 JSX，在 React 中由 JavaScript 来处理控制流。',
  },
  {
    key: 'return-null',
    label: '返回 null',
    component: ReturnNullDemo,
    description: '在不需要渲染任何内容时，可以直接返回 null。但这并不常见，通常应该在父组件里选择是否要渲染该组件。',
  },
  {
    key: 'ternary',
    label: '三目运算符 ?:',
    component: TernaryDemo,
    description: '使用条件运算符（三目运算符）简洁地实现条件渲染，避免重复的标签结构。',
  },
  {
    key: 'and-operator',
    label: '与运算符 &&',
    component: AndOperatorDemo,
    description: '当条件成立时渲染一些 JSX，否则不做任何渲染。注意：切勿将数字放在 && 左侧。',
  },
  {
    key: 'variable-assignment',
    label: 'JSX 赋值给变量',
    component: VariableAssignmentDemo,
    description: '使用 if 语句和变量来选择性地包含 JSX，这种方式最冗长但也最灵活，适用于任意 JSX。',
  },
]

export default function App() {
  const [activeKey, setActiveKey] = useState(DEMOS[0].key)
  const active = DEMOS.find(d => d.key === activeKey) ?? DEMOS[0]
  const ActiveComponent = active.component

  return (
    <div className="app">
      <h1>条件渲染</h1>
      <nav className="tab-bar">
        {DEMOS.map(d => (
          <button
            key={d.key}
            className={activeKey === d.key ? 'active' : ''}
            onClick={() => setActiveKey(d.key)}
          >
            {d.label}
          </button>
        ))}
      </nav>
      <div className="demo-section">
        <p>{active.description}</p>
        <div className="demo-box">
          <ActiveComponent />
        </div>
      </div>
    </div>
  )
}
