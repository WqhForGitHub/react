import { useState, type ComponentType } from 'react'
import './App.css'
import LocalVariableProblemDemo from './demos/LocalVariableProblemDemo'
import UseStateBasicDemo from './demos/UseStateBasicDemo'
import MultipleStateDemo from './demos/MultipleStateDemo'
import StateIsPrivateDemo from './demos/StateIsPrivateDemo'

interface DemoItem {
  key: string
  label: string
  component: ComponentType
  description: string
}

const DEMOS: DemoItem[] = [
  {
    key: 'local-var-problem',
    label: '普通变量的局限',
    component: LocalVariableProblemDemo,
    description:
      '局部变量无法在多次渲染中持久保存，更改局部变量也不会触发 React 重新渲染。点击 Next 按钮，index 虽然改变了，但界面不会更新。',
  },
  {
    key: 'use-state-basic',
    label: '添加 state 变量',
    component: UseStateBasicDemo,
    description:
      'useState Hook 提供了两个功能：state 变量保存渲染间的数据，state setter 函数更新变量并触发 React 重新渲染。将 let index = 0 替换为 const [index, setIndex] = useState(0)。',
  },
  {
    key: 'multiple-state',
    label: '多个 state 变量',
    component: MultipleStateDemo,
    description:
      '一个组件可以拥有任意多种类型的 state 变量。此组件有 index（数字）和 showMore（布尔值）两个 state。如果多个 state 经常同时更改，最好合并为一个。',
  },
  {
    key: 'state-is-private',
    label: 'State 是隔离且私有的',
    component: StateIsPrivateDemo,
    description:
      '如果渲染同一个组件两次，每个副本都有完全隔离的 state。改变其中一个不会影响另一个。State 完全私有于声明它的组件。',
  },
]

export default function App() {
  const [activeKey, setActiveKey] = useState(DEMOS[0].key)
  const active = DEMOS.find(d => d.key === activeKey) ?? DEMOS[0]
  const ActiveComponent = active.component

  return (
    <div className="app">
      <h1>State：组件的记忆</h1>
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
