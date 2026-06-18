import { useState, type ComponentType } from 'react'
import './App.css'
import RenderFromArrayDemo from './demos/RenderFromArrayDemo'
import FilterListDemo from './demos/FilterListDemo'
import KeyListDemo from './demos/KeyListDemo'

interface DemoItem {
  key: string
  label: string
  component: ComponentType
  description: string
}

const DEMOS: DemoItem[] = [
  {
    key: 'render-from-array',
    label: '从数组中渲染数据',
    component: RenderFromArrayDemo,
    description: '将数据存储在 JavaScript 数组中，使用 map() 方法遍历每一项，生成一个新的 JSX 节点数组。',
  },
  {
    key: 'filter-list',
    label: '对数组项进行过滤',
    component: FilterListDemo,
    description: '使用 filter() 筛选满足条件的数据项，再用 map() 将过滤后的数组转换为组件列表。',
  },
  {
    key: 'key-list',
    label: '用 key 保持列表项的顺序',
    component: KeyListDemo,
    description: '为数组中的每一项指定唯一的 key，帮助 React 识别各个组件对应数组中的哪一项，从而正确地更新 DOM 树。',
  },
]

export default function App() {
  const [activeKey, setActiveKey] = useState(DEMOS[0].key)
  const active = DEMOS.find(d => d.key === activeKey) ?? DEMOS[0]
  const ActiveComponent = active.component

  return (
    <div className="app">
      <h1>渲染列表</h1>
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
