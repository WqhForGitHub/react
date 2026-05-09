import { useState, type ComponentType } from 'react'
import './App.css'
import StringPropsDemo from './demos/StringPropsDemo'
import VariableDemo from './demos/VariableDemo'
import FunctionCallDemo from './demos/FunctionCallDemo'
import DoubleCurlyBracesDemo from './demos/DoubleCurlyBracesDemo'
import ObjectDemo from './demos/ObjectDemo'

interface DemoItem {
  key: string
  label: string
  component: ComponentType
  description: string
}

const DEMOS: DemoItem[] = [
  {
    key: 'string-props',
    label: '引号与大括号',
    component: StringPropsDemo,
    description: '使用引号传递静态字符串属性，使用大括号引用 JavaScript 变量来动态指定属性值。',
  },
  {
    key: 'variable',
    label: '引用变量',
    component: VariableDemo,
    description: '大括号是一扇进入 JavaScript 世界的窗户，你可以在 JSX 标签内的文本中嵌入任何 JavaScript 变量。',
  },
  {
    key: 'function',
    label: '调用函数',
    component: FunctionCallDemo,
    description: '大括号内的任何 JavaScript 表达式都能正常运行，包括函数调用。你可以直接在 JSX 中调用函数并使用其返回值。',
  },
  {
    key: 'double-braces',
    label: '双大括号',
    component: DoubleCurlyBracesDemo,
    description: '在 JSX 中传递对象需要用另一对额外的大括号包裹。最常见的场景是内联 CSS 样式，style={{ backgroundColor: "black" }}。',
  },
  {
    key: 'object',
    label: '对象与大括号',
    component: ObjectDemo,
    description: '你可以将多个表达式合并到一个 JavaScript 对象中，然后在 JSX 的大括号内分别使用它们。JSX 是模板语言的最小实现。',
  },
]

export default function App() {
  const [activeKey, setActiveKey] = useState(DEMOS[0].key)
  const active = DEMOS.find(d => d.key === activeKey) ?? DEMOS[0]
  const ActiveComponent = active.component

  return (
    <div className="app">
      <h1>在 JSX 中通过大括号使用 JavaScript</h1>
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
