import { useState, type ComponentType } from 'react'
import './App.css'
import FamiliarPropsDemo from './demos/FamiliarPropsDemo'
import PassingPropsDemo from './demos/PassingPropsDemo'
import DefaultPropsDemo from './demos/DefaultPropsDemo'
import SpreadPropsDemo from './demos/SpreadPropsDemo'
import ChildrenPropsDemo from './demos/ChildrenPropsDemo'
import PropsChangeDemo from './demos/PropsChangeDemo'

interface DemoItem {
  key: string
  label: string
  component: ComponentType
  description: string
}

const DEMOS: DemoItem[] = [
  {
    key: 'familiar',
    label: '熟悉的 props',
    component: FamiliarPropsDemo,
    description: 'Props 是你传递给 JSX 标签的信息。你可以将任何 props 传递给你自己的组件，以便自定义它们。',
  },
  {
    key: 'passing',
    label: '传递 props',
    component: PassingPropsDemo,
    description: '分两步给组件传递 props：首先将 props 传递给子组件，然后在子组件中读取 props。Props 使你独立思考父组件和子组件。',
  },
  {
    key: 'default',
    label: '默认值',
    component: DefaultPropsDemo,
    description: '如果你想在没有指定值的情况下给 prop 一个默认值，你可以通过在参数后面写 = 和默认值来进行解构。',
  },
  {
    key: 'spread',
    label: '展开语法',
    component: SpreadPropsDemo,
    description: '一些组件将它们所有的 props 转发给子组件，这时可以使用更简洁的展开语法：{...props}。请克制地使用。',
  },
  {
    key: 'children',
    label: 'children prop',
    component: ChildrenPropsDemo,
    description: '当你将内容嵌套在 JSX 标签中时，父组件将在名为 children 的 prop 中接收到该内容。',
  },
  {
    key: 'change',
    label: 'Props 随时间变化',
    component: PropsChangeDemo,
    description: '一个组件可能会随着时间的推移收到不同的 props。Props 反映了组件在任何时间点的数据。Props 是不可变的，不要尝试"更改 props"。',
  },
]

export default function App() {
  const [activeKey, setActiveKey] = useState(DEMOS[0].key)
  const active = DEMOS.find(d => d.key === activeKey) ?? DEMOS[0]
  const ActiveComponent = active.component

  return (
    <div className="app">
      <h1>将 Props 传递给组件</h1>
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
