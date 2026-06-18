import { useState, type ComponentType } from 'react'
import './App.css'
import RootComponentDemo from './demos/RootComponentDemo'
import DefaultExportDemo from './demos/DefaultExportDemo'
import NamedExportDemo from './demos/NamedExportDemo'

interface DemoItem {
  key: string
  label: string
  component: ComponentType
  description: string
}

const DEMOS: DemoItem[] = [
  {
    key: 'root',
    label: '根组件文件',
    component: RootComponentDemo,
    description: '在项目初期，所有组件可能都定义在同一个根组件文件中。当组件越来越多时，就需要将它们拆分到不同文件中。',
  },
  {
    key: 'default',
    label: '默认导出与导入',
    component: DefaultExportDemo,
    description: '将组件拆分到独立文件的第一种方式：使用 export default 导出，import 导入（不需要大括号）。同一文件中只能有一个默认导出。',
  },
  {
    key: 'named',
    label: '具名导出与导入',
    component: NamedExportDemo,
    description: '当同一文件中需要导出多个组件时，使用具名导出。同一文件中可以有多个具名导出，但只能有一个默认导出。',
  },
]

export default function App() {
  const [activeKey, setActiveKey] = useState(DEMOS[0].key)
  const active = DEMOS.find(d => d.key === activeKey) ?? DEMOS[0]
  const ActiveComponent = active.component

  return (
    <div className="app">
      <h1>组件的导入与导出</h1>
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
