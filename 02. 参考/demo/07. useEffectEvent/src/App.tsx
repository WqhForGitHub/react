import { useEffect, useEffectEvent, useState } from 'react'
import './App.css'

function App() {
  const [url, setUrl] = useState('/home')
  const [cartCount, setCartCount] = useState(0)
  const [visits, setVisits] = useState<string[]>([])

  const onVisit = useEffectEvent((visitedUrl: string) => {
    setVisits((items) => [
      '访问 ' + visitedUrl + '，购物车数量：' + cartCount,
      ...items,
    ])
  })

  useEffect(() => {
    onVisit(url)
  }, [url])

  return (
    <main className="app">
      <header className="hero">
        <h1>useEffectEvent</h1>
        <p className="subtitle">
          把 Effect 中的非响应式事件逻辑分离出来，同时读取最新 state。
        </p>
      </header>
      <section className="card stack">
        <div className="controls">
          <button onClick={() => setUrl('/home')}>/home</button>
          <button onClick={() => setUrl('/shop')}>/shop</button>
          <button
            className="secondary"
            onClick={() => setCartCount((count) => count + 1)}
          >
            购物车：{cartCount}
          </button>
        </div>
        <ul className="list">
          {visits.map((visit, index) => (
            <li key={index}>{visit}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
