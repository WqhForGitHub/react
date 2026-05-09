import { useState, type ComponentType } from 'react'
import './App.css'
import TriggerRenderDemo from './demos/TriggerRenderDemo'
import RenderProcessDemo from './demos/RenderProcessDemo'
import CommitToDomDemo from './demos/CommitToDomDemo'
import PureRenderDemo from './demos/PureRenderDemo'

interface DemoItem {
  key: string
  label: string
  component: ComponentType
  description: string
}

const DEMOS: DemoItem[] = [
  {
    key: 'trigger',
    label: '触发渲染',
    component: TriggerRenderDemo,
    description: '组件显示到屏幕之前必须被 React 渲染。有两种原因会触发渲染：初次渲染和状态更新。',
  },
  {
    key: 'render',
    label: '渲染组件',
    component: RenderProcessDemo,
    description: 'React 会调用你的组件来确定要在屏幕上显示的内容。这个过程是递归的，直到没有更多嵌套组件。',
  },
  {
    key: 'commit',
    label: '提交到 DOM',
    component: CommitToDomDemo,
    description: 'React 在渲染组件后修改 DOM。对于重渲染，React 仅应用最少的必要操作，使 DOM 与最新输出匹配。',
  },
  {
    key: 'pure',
    label: '纯函数渲染',
    component: PureRenderDemo,
    description: '渲染必须始终是一次纯计算：输入相同则输出相同，且不修改外部变量。严格模式会调用组件两次以检测不纯函数。',
  },
]

export default function App() {
  const [activeKey, setActiveKey] = useState(DEMOS[0].key)
  const active = DEMOS.find(d => d.key === activeKey) ?? DEMOS[0]
  const ActiveComponent = active.component

  return (
    <div className="app">
      <h1>渲染和提交</h1>
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
