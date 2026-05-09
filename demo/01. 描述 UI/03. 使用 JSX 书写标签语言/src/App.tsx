import { useState, type ComponentType } from 'react'
import './App.css'
import HtmlToJsxDemo from './demos/HtmlToJsxDemo'
import SingleRootDemo from './demos/SingleRootDemo'
import ClosedTagsDemo from './demos/ClosedTagsDemo'
import CamelCaseDemo from './demos/CamelCaseDemo'

interface DemoItem {
  key: string
  label: string
  component: ComponentType
  description: string
}

const DEMOS: DemoItem[] = [
  {
    key: 'html-to-jsx',
    label: 'HTML 转 JSX',
    component: HtmlToJsxDemo,
    description:
      'JSX 是 JavaScript 的语法扩展，看起来和 HTML 很像，但语法更加严格。将 HTML 直接复制到组件中并不能正常工作，需要遵循 JSX 的规则。',
  },
  {
    key: 'single-root',
    label: '单一根元素',
    component: SingleRootDemo,
    description:
      'JSX 规则 1：组件只能返回一个根元素。如果包含多个元素，需要用 <div> 或 Fragment（<>...</>）包裹。',
  },
  {
    key: 'closed-tags',
    label: '标签必须闭合',
    component: ClosedTagsDemo,
    description:
      'JSX 规则 2：所有标签必须正确闭合。自闭合标签如 <img> 必须写成 <img />，成对标签如 <li> 必须有 </li> 闭合。',
  },
  {
    key: 'camel-case',
    label: '驼峰式属性',
    component: CamelCaseDemo,
    description:
      'JSX 规则 3：大部分 HTML 属性需要用驼峰式命名。例如 class → className，tabindex → tabIndex，stroke-width → strokeWidth。',
  },
]

export default function App() {
  const [activeKey, setActiveKey] = useState(DEMOS[0].key)
  const active = DEMOS.find(d => d.key === activeKey) ?? DEMOS[0]
  const ActiveComponent = active.component

  return (
    <div className="app">
      <h1>使用 JSX 书写标签语言</h1>
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
