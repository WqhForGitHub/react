import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('React')
  return (
    <main className="app">
      <header className="hero">
        <h1>useState</h1>
        <p className="subtitle">给函数组件添加响应式状态。</p>
      </header>
      <section className="card stack">
        <input value={name} onChange={(event) => setName(event.target.value)} />
        <p>你好，{name}！</p>
        <button onClick={() => setCount((value) => value + 1)}>
          点击次数：{count}
        </button>
      </section>
    </main>
  )
}

export default App
