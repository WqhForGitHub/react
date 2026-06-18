import { useState, type ComponentType } from 'react'
import './App.css'
import PureFunctionDemo from './demos/PureFunctionDemo'
import ImpureDemo from './demos/ImpureDemo'
import LocalMutationDemo from './demos/LocalMutationDemo'
import SideEffectDemo from './demos/SideEffectDemo'

interface DemoItem {
  key: string
  label: string
  component: ComponentType
  description: string
}

const DEMOS: DemoItem[] = [
  {
    key: 'pure-function',
    label: '纯函数：组件作为公式',
    component: PureFunctionDemo,
    description: '纯函数只负责自己的任务，输入相同则输出相同。React 假设你编写的所有组件都是纯函数。',
  },
  {
    key: 'impure',
    label: '副作用：预期的后果',
    component: ImpureDemo,
    description: '在渲染过程中改变预先存在的变量会使组件变得不纯粹。修复方法：将外部变量作为 prop 传入。',
  },
  {
    key: 'local-mutation',
    label: '局部 mutation',
    component: LocalMutationDemo,
    description: '你完全可以在渲染时更改你刚刚创建的变量和对象——这被称为"局部 mutation"，如同藏在组件里的小秘密。',
  },
  {
    key: 'side-effect',
    label: '哪里可以引发副作用',
    component: SideEffectDemo,
    description: '副作用通常属于事件处理程序。如果用尽一切办法仍无法找到合适的事件处理程序，可以使用 useEffect 作为最后手段。',
  },
]

export default function App() {
  const [activeKey, setActiveKey] = useState(DEMOS[0].key)
  const active = DEMOS.find(d => d.key === activeKey) ?? DEMOS[0]
  const ActiveComponent = active.component

  return (
    <div className="app">
      <h1>保持组件纯粹</h1>
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
