import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [roomId, setRoomId] = useState('general')
  const [log, setLog] = useState<string[]>([])

  useEffect(() => {
    setLog((items) => ['连接到 ' + roomId, ...items])
    return () => {
      setLog((items) => ['断开 ' + roomId, ...items])
    }
  }, [roomId])

  return (
    <main className="app">
      <header className="hero">
        <h1>useEffect</h1>
        <p className="subtitle">在渲染后同步外部系统，并在依赖变化时清理。</p>
      </header>
      <section className="card stack">
        <select
          value={roomId}
          onChange={(event) => setRoomId(event.target.value)}
        >
          <option value="general">general</option>
          <option value="music">music</option>
          <option value="travel">travel</option>
        </select>
        <ul className="list">
          {log.slice(0, 6).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
