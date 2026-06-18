import { useState, type ComponentType } from 'react'
import './App.css'
import BatchingDemo from './demos/BatchingDemo'
import UpdaterFunctionDemo from './demos/UpdaterFunctionDemo'
import ReplaceThenUpdateDemo from './demos/ReplaceThenUpdateDemo'
import UpdateThenReplaceDemo from './demos/UpdateThenReplaceDemo'

interface DemoItem {
  key: string
  label: string
  component: ComponentType
  description: string
}

const DEMOS: DemoItem[] = [
  {
    key: 'batching',
    label: '批处理',
    component: BatchingDemo,
    description: 'React 会等到事件处理函数中的所有代码都运行完毕再处理 state 更新，这被称为批处理。',
  },
  {
    key: 'updater-function',
    label: '更新函数',
    component: UpdaterFunctionDemo,
    description: '使用更新函数（如 n => n + 1）可以在下次渲染前多次更新同一个 state，React 会将更新函数加入队列依次执行。',
  },
  {
    key: 'replace-then-update',
    label: '替换后更新',
    component: ReplaceThenUpdateDemo,
    description: '先替换 state 再使用更新函数：替换操作会忽略前一个值，而更新函数会基于替换后的值继续计算。',
  },
  {
    key: 'update-then-replace',
    label: '更新后替换',
    component: UpdateThenReplaceDemo,
    description: '更新函数后再替换 state：最后的替换操作会覆盖之前所有计算结果，无论队列中有多少更新函数。',
  },
]

export default function App() {
  const [activeKey, setActiveKey] = useState(DEMOS[0].key)
  const active = DEMOS.find(d => d.key === activeKey) ?? DEMOS[0]
  const ActiveComponent = active.component

  return (
    <div className="app">
      <h1>把一系列 state 更新加入队列</h1>
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
