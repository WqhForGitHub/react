import { useDeferredValue, useMemo, useState } from 'react'
import './App.css'

const products = Array.from(
  { length: 2500 },
  (_, index) => 'Product ' + (index + 1),
)

function App() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const isStale = query !== deferredQuery

  const filtered = useMemo(() => {
    return products
      .filter((product) =>
        product.toLowerCase().includes(deferredQuery.toLowerCase()),
      )
      .slice(0, 20)
  }, [deferredQuery])

  return (
    <main className="app">
      <header className="hero">
        <h1>useDeferredValue</h1>
        <p className="subtitle">延迟更新低优先级 UI，让输入保持响应。</p>
      </header>
      <section className="card stack">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜索 Product 42"
        />
        <ul className="list" style={{ opacity: isStale ? 0.45 : 1 }}>
          {filtered.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
