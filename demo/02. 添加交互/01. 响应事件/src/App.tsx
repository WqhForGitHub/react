import { useState, type ComponentType } from 'react'
import './App.css'
import AddEventHandlerDemo from './demos/AddEventHandlerDemo'
import ReadPropsDemo from './demos/ReadPropsDemo'
import PassHandlerAsPropsDemo from './demos/PassHandlerAsPropsDemo'
import NamingHandlerPropsDemo from './demos/NamingHandlerPropsDemo'
import EventPropagationDemo from './demos/EventPropagationDemo'
import StopPropagationDemo from './demos/StopPropagationDemo'
import PreventDefaultDemo from './demos/PreventDefaultDemo'

interface DemoItem {
  key: string
  label: string
  component: ComponentType
  description: string
}

const DEMOS: DemoItem[] = [
  {
    key: 'add-handler',
    label: '添加事件处理函数',
    component: AddEventHandlerDemo,
    description: '如需添加一个事件处理函数，你需要先定义一个函数，然后将其作为 prop 传入合适的 JSX 标签。事件处理函数通常以 handle 开头命名。',
  },
  {
    key: 'read-props',
    label: '读取 props',
    component: ReadPropsDemo,
    description: '由于事件处理函数声明于组件内部，因此它们可以直接访问组件的 props，无需额外传参。',
  },
  {
    key: 'pass-handler',
    label: '传递处理函数',
    component: PassHandlerAsPropsDemo,
    description: '通常在父组件中定义子组件的事件处理函数，并将其作为 prop 传递给子组件，使同一组件在不同位置执行不同功能。',
  },
  {
    key: 'naming',
    label: '命名处理函数 prop',
    component: NamingHandlerPropsDemo,
    description: '自定义组件可以按个人喜好命名事件处理函数的 prop，按惯例以 on 开头后跟大写字母。',
  },
  {
    key: 'propagation',
    label: '事件传播',
    component: EventPropagationDemo,
    description: '事件会沿着树向上"冒泡"或"传播"：它从事件发生的地方开始，然后沿着树向上传播。',
  },
  {
    key: 'stop-propagation',
    label: '阻止传播',
    component: StopPropagationDemo,
    description: '调用 e.stopPropagation() 可以阻止事件到达父组件。也可以在子组件中显式调用父组件传递的处理函数，作为事件传播的替代方案。',
  },
  {
    key: 'prevent-default',
    label: '阻止默认行为',
    component: PreventDefaultDemo,
    description: '调用 e.preventDefault() 可以阻止浏览器默认行为，如表单提交导致的页面重新加载。不要将它与 e.stopPropagation() 混淆。',
  },
]

export default function App() {
  const [activeKey, setActiveKey] = useState(DEMOS[0].key)
  const active = DEMOS.find(d => d.key === activeKey) ?? DEMOS[0]
  const ActiveComponent = active.component

  return (
    <div className="app">
      <h1>响应事件</h1>
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
