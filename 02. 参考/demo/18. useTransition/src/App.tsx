import { useMemo, useState, useTransition } from 'react'
import './App.css'

const allItems = Array.from(
  { length: 4000 },
  (_, index) => '文档条目 ' + (index + 1),
)

function App() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('')
  const [isPending, startTransition] = useTransition()
  const results = useMemo(
    () => allItems.filter((item) => item.includes(filter)).slice(0, 30),
    [filter],
  )

  function handleChange(nextQuery: string) {
    setQuery(nextQuery)
    startTransition(() => {
      setFilter(nextQuery)
    })
  }

  return (
    <main className="app">
      <header className="hero">
        <h1>useTransition</h1>
        <p className="subtitle">
          把耗时更新标记为 transition，让紧急输入先完成。
        </p>
      </header>
      <section className="card stack">
        <input
          value={query}
          onChange={(event) => handleChange(event.target.value)}
          placeholder="输入数字过滤"
        />
        {isPending ? <span className="badge">更新列表中...</span> : null}
        <ul className="list">
          {results.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
