import { useState, type ComponentType } from 'react'
import './App.css'
import RenderTreeDemo from './demos/RenderTreeDemo'
import ConditionalTreeDemo from './demos/ConditionalTreeDemo'
import DependencyTreeDemo from './demos/DependencyTreeDemo'

interface DemoItem {
  key: string
  label: string
  component: ComponentType
  description: string
}

const DEMOS: DemoItem[] = [
  {
    key: 'render-tree',
    label: '渲染树',
    component: RenderTreeDemo,
    description: '组件的组合关系可以在渲染树中建模。渲染树由 React 组件组成，根节点是根组件，每个箭头从父组件指向子组件。',
  },
  {
    key: 'conditional-tree',
    label: '条件渲染树',
    component: ConditionalTreeDemo,
    description: '在条件渲染中，父组件可以渲染不同的子组件，每次渲染过程的渲染树可能都不同。识别顶级组件和叶子组件有助于理解数据流和性能。',
  },
  {
    key: 'dependency-tree',
    label: '模块依赖树',
    component: DependencyTreeDemo,
    description: '模块依赖树以 JavaScript 模块为节点，分支代表 import 语句。与渲染树相比，它还包含非组件模块，且反映的是导入关系而非组合关系。',
  },
]

export default function App() {
  const [activeKey, setActiveKey] = useState(DEMOS[0].key)
  const active = DEMOS.find(d => d.key === activeKey) ?? DEMOS[0]
  const ActiveComponent = active.component

  return (
    <div className="app">
      <h1>将 UI 视为树</h1>
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
