import { useInsertionEffect, useState } from 'react'
import './App.css'

function DynamicRule({ color }: { color: string }) {
  useInsertionEffect(() => {
    const style = document.createElement('style')
    style.textContent =
      '.dynamic-card { border-color: ' +
      color +
      '; box-shadow: 0 0 0 4px ' +
      color +
      '22; }'
    document.head.append(style)
    return () => style.remove()
  }, [color])

  return (
    <div className="panel dynamic-card">CSS 规则会在布局 Effect 之前插入。</div>
  )
}

function App() {
  const [color, setColor] = useState('#7c3aed')
  return (
    <main className="app">
      <header className="hero">
        <h1>useInsertionEffect</h1>
        <p className="subtitle">CSS-in-JS 库可用它在读取布局前插入样式。</p>
      </header>
      <section className="card stack">
        <input
          type="color"
          value={color}
          onChange={(event) => setColor(event.target.value)}
        />
        <DynamicRule color={color} />
      </section>
    </main>
  )
}

export default App
