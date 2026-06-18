/**
 * 条件渲染树
 *
 * 在条件渲染中，父组件可以根据传递的数据渲染不同的子组件。
 * 每次渲染过程的渲染树可能都不同。
 * 识别顶级组件和叶子组件有助于理解数据流和性能。
 */

import { useState } from 'react'

// ---- 数据 ----
const inspirations = [
  { type: 'quote', value: "Don't let yesterday take up too much of today. — Will Rogers" },
  { type: 'color', value: '#B73636' },
  { type: 'quote', value: 'Ambition is putting a ladder against the sky.' },
  { type: 'color', value: '#256266' },
  { type: 'quote', value: "A joy that's shared is a joy made double." },
  { type: 'color', value: '#F9F2B4' },
]

// ---- 子组件 ----
function FancyText({ title, text }: { title?: boolean; text: string }) {
  return title ? (
    <h1 className="fancy title">{text}</h1>
  ) : (
    <h3 className="fancy cursive">{text}</h3>
  )
}

function Color({ value }: { value: string }) {
  return <div className="colorbox" style={{ backgroundColor: value }} />
}

function Copyright({ year }: { year: number }) {
  return <p className="small">©️ {year}</p>
}

function InspirationGenerator({ children }: { children: React.ReactNode }) {
  const [index, setIndex] = useState(0)
  const inspiration = inspirations[index]
  const next = () => setIndex((index + 1) % inspirations.length)

  return (
    <>
      <p>
        Your inspirational {inspiration.type} is:
      </p>
      {inspiration.type === 'quote' ? (
        <FancyText text={inspiration.value} />
      ) : (
        <Color value={inspiration.value} />
      )}
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
function TreeNode({ label, highlight }: { label: string; highlight?: boolean }) {
  return (
    <div className="tree-node">
      <span className="node-arrow">▼</span>
      <span
        className="node-label"
        style={highlight ? { background: 'rgba(245,158,11,0.15)', borderColor: '#f59e0b', color: '#f59e0b' } : undefined}
      >
        {label}
      </span>
    </div>
  )
}

function TreeBranch({ children }: { children: React.ReactNode }) {
  return <div className="tree-children">{children}</div>
}

function QuoteTree() {
  return (
    <div className="tree-container">
      <TreeNode label="App" />
      <TreeBranch>
        <TreeNode label="FancyText" />
        <TreeNode label="InspirationGenerator" />
        <TreeBranch>
          <TreeNode label="FancyText" highlight />
          <TreeNode label="Copyright" />
        </TreeBranch>
      </TreeBranch>
    </div>
  )
}

function ColorTree() {
  return (
    <div className="tree-container">
      <TreeNode label="App" />
      <TreeBranch>
        <TreeNode label="FancyText" />
        <TreeNode label="InspirationGenerator" />
        <TreeBranch>
          <TreeNode label="Color" highlight />
          <TreeNode label="Copyright" />
        </TreeBranch>
      </TreeBranch>
    </div>
  )
}

// ---- 主 Demo ----
export default function ConditionalTreeDemo() {
  const [showQuoteTree, setShowQuoteTree] = useState(true)

  return (
    <div>
      <h3>条件渲染：运行中的应用</h3>
      <p>点击按钮切换不同的灵感来源，观察渲染树的变化：</p>
      <App />

      <h3 style={{ marginTop: 24 }}>条件渲染树</h3>
      <p>
        当 <code>inspiration.type === 'quote'</code> 时渲染 FancyText，
        否则渲染 Color。高亮节点表示因条件而变化的组件。
      </p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button
          className={showQuoteTree ? '' : 'pitfall-toggle'}
          onClick={() => setShowQuoteTree(true)}
          style={showQuoteTree ? { background: 'var(--accent-bg)', borderColor: 'var(--accent-border)', color: 'var(--accent)', borderRadius: 6, border: '1px solid var(--accent-border)', padding: '4px 12px' } : { borderRadius: 6, border: '1px solid var(--border)', padding: '4px 12px', background: 'none', color: 'var(--text)', cursor: 'pointer' }}
        >
          quote 渲染树
        </button>
        <button
          className={showQuoteTree ? 'pitfall-toggle' : ''}
          onClick={() => setShowQuoteTree(false)}
          style={!showQuoteTree ? { background: 'var(--accent-bg)', borderColor: 'var(--accent-border)', color: 'var(--accent)', borderRadius: 6, border: '1px solid var(--accent-border)', padding: '4px 12px' } : { borderRadius: 6, border: '1px solid var(--border)', padding: '4px 12px', background: 'none', color: 'var(--text)', cursor: 'pointer' }}
        >
          color 渲染树
        </button>
      </div>
      {showQuoteTree ? <QuoteTree /> : <ColorTree />}

      <div className="warning" style={{ marginTop: 16 }}>
        <strong>提示：</strong>顶级组件（如 App）离根组件最近，影响其下所有组件的渲染性能；
        叶子组件（如 FancyText、Color）位于树底部，没有子组件，通常会频繁重新渲染。
      </div>
    </div>
  )
}
