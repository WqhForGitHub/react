import { useRef, useState } from 'react'
import './App.css'

function App() {
  const inputRef = useRef<HTMLInputElement>(null)
  const clicksRef = useRef(0)
  const [renderCount, setRenderCount] = useState(0)

  function recordClick() {
    clicksRef.current += 1
    inputRef.current?.focus()
  }

  return (
    <main className="app">
      <header className="hero">
        <h1>useRef</h1>
        <p className="subtitle">
          保存可变值或 DOM 引用，修改 ref 不会触发重新渲染。
        </p>
      </header>
      <section className="card stack">
        <input ref={inputRef} placeholder="点击按钮会聚焦这里" />
        <div className="controls">
          <button onClick={recordClick}>记录点击</button>
          <button
            className="secondary"
            onClick={() => setRenderCount((value) => value + 1)}
          >
            强制渲染
          </button>
        </div>
        <p>
          ref 点击次数：{clicksRef.current}；渲染次数：{renderCount}
        </p>
      </section>
    </main>
  )
}

export default App
