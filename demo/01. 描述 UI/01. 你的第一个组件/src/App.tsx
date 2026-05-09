import { useState, type ComponentType } from 'react'
import './App.css'
import ProfileDemo from './demos/ProfileDemo'
import GalleryDemo from './demos/GalleryDemo'
import NestedWarningDemo from './demos/NestedWarningDemo'

interface DemoItem {
  key: string
  label: string
  component: ComponentType
  description: string
}

const DEMOS: DemoItem[] = [
  {
    key: 'profile',
    label: '定义组件',
    component: ProfileDemo,
    description: 'React 组件是一段可以 使用标签进行扩展 的 JavaScript 函数。构建组件需要三步：导出组件、定义函数、添加标签。',
  },
  {
    key: 'gallery',
    label: '使用组件',
    component: GalleryDemo,
    description: '组件一旦定义，就可以在其他组件中嵌套使用。小写标签如 <section> 是 HTML 标签，大写开头如 <Profile /> 是 React 组件。',
  },
  {
    key: 'nested',
    label: '嵌套定义陷阱',
    component: NestedWarningDemo,
    description: '绝对不要在组件内部定义另一个组件！这会导致性能问题和 bug。正确做法是在顶层定义每个组件，通过 props 传递数据。',
  },
]

export default function App() {
  const [activeKey, setActiveKey] = useState(DEMOS[0].key)
  const active = DEMOS.find(d => d.key === activeKey) ?? DEMOS[0]
  const ActiveComponent = active.component

  return (
    <div className="app">
      <h1>你的第一个组件</h1>
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
