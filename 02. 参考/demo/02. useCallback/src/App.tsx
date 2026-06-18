import { memo, useCallback, useState } from 'react'
import './App.css'

type ToolbarProps = { onAdd: () => void }

const Toolbar = memo(function Toolbar({ onAdd }: ToolbarProps) {
  return (
    <div className="panel stack">
      <span className="badge">memo 子组件</span>
      <p className="muted">只有 onAdd 引用变化时，这个组件才需要重新渲染。</p>
      <button onClick={onAdd}>添加项目</button>
    </div>
  )
})

function App() {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState(['React', 'Vite'])

  const addItem = useCallback(() => {
    setItems((current) => [...current, 'Item ' + (current.length + 1)])
  }, [])

  return (
    <main className="app">
      <header className="hero">
        <h1>useCallback</h1>
        <p className="subtitle">缓存函数引用，配合 memo 减少无关子组件更新。</p>
      </header>
      <section className="grid">
        <div className="card stack">
          <button
            className="secondary"
            onClick={() => setCount((value) => value + 1)}
          >
            父组件计数：{count}
          </button>
          <ul className="list">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <Toolbar onAdd={addItem} />
      </section>
    </main>
  )
}

export default App
