/**
 * 渲染树
 *
 * 组件的一个主要特性是能够由其他组件组合而成。
 * 当渲染 React 应用程序时，可以在一个称为"渲染树"的树中建模这种关系。
 * 渲染树由节点组成，每个节点代表一个组件，根节点是应用程序的根组件。
 */

import { useState } from 'react'

// ---- 数据 ----
const quotes = [
  "Don't let yesterday take up too much of today. — Will Rogers",
  'Ambition is putting a ladder against the sky.',
  "A joy that's shared is a joy made double.",
]

// ---- 子组件 ----
function FancyText({ title, text }: { title?: boolean; text: string }) {
  return title ? (
    <h1 className="fancy title">{text}</h1>
  ) : (
    <h3 className="fancy cursive">{text}</h3>
  )
}

function Copyright({ year }: { year: number }) {
  return <p className="small">©️ {year}</p>
}

function InspirationGenerator({ children }: { children: React.ReactNode }) {
  const [index, setIndex] = useState(0)
  const quote = quotes[index]
  const next = () => setIndex((index + 1) % quotes.length)

  return (
    <>
      <p>Your inspirational quote is:</p>
      <FancyText text={quote} />
      <button onClick={next}>Inspire me again</button>
      {children}
    </>
  )
}

function App() {
  return (
    <>
      <FancyText title text="Get Inspired App" />
      <InspirationGenerator>
        <Copyright year={2004} />
      </InspirationGenerator>
    </>
  )
}

// ---- 渲染树可视化 ----
function TreeNode({ label, children }: { label: string; children?: React.ReactNode }) {
  return (
    <div>
      <div className="tree-node">
        <span className="node-arrow">▼</span>
        <span className="node-label">{label}</span>
      </div>
      {children && <div className="tree-children">{children}</div>}
    </div>
  )
}

function RenderTreeView() {
  return (
    <div className="tree-container">
      <TreeNode label="App">
        <TreeNode label="FancyText" />
        <TreeNode label="InspirationGenerator">
          <TreeNode label="FancyText" />
          <TreeNode label="Copyright" />
        </TreeNode>
      </TreeNode>
    </div>
  )
}

// ---- 主 Demo ----
export default function RenderTreeDemo() {
  return (
    <div>
      <h3>运行中的应用</h3>
      <App />

      <h3 style={{ marginTop: 24 }}>对应的渲染树</h3>
      <p>
        渲染树由 React <strong>组件</strong>组成，根节点是根组件 App。
        每个箭头从父组件指向子组件。
      </p>
      <RenderTreeView />

      <div className="warning" style={{ marginTop: 16 }}>
        <strong>注意：</strong>渲染树中没有 HTML 标签，因为它仅由 React 组件组成。
        React 是跨平台的 UI 框架，可以渲染到 Web、移动端或桌面端。
      </div>
    </div>
  )
}
