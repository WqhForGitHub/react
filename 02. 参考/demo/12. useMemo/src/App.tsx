import { useMemo, useState } from 'react'
import './App.css'

function slowScore(count: number) {
  let total = 0
  for (let index = 0; index < 2000000; index += 1) total += (index * count) % 97
  return total
}

function App() {
  const [count, setCount] = useState(1)
  const [theme, setTheme] = useState('紫色')
  const score = useMemo(() => slowScore(count), [count])

  return (
    <main className="app">
      <header className="hero">
        <h1>useMemo</h1>
        <p className="subtitle">缓存昂贵计算结果，只有依赖变化时重新计算。</p>
      </header>
      <section className="card stack">
        <div className="controls">
          <button onClick={() => setCount((value) => value + 1)}>
            count: {count}
          </button>
          <button
            className="secondary"
            onClick={() =>
              setTheme((value) => (value === '紫色' ? '蓝色' : '紫色'))
            }
          >
            主题：{theme}
          </button>
        </div>
        <p className="code">score = {score}</p>
      </section>
    </main>
  )
}

export default App
