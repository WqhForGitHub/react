import { useLayoutEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const boxRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [wide, setWide] = useState(false)

  useLayoutEffect(() => {
    const rect = boxRef.current?.getBoundingClientRect()
    setWidth(Math.round(rect?.width ?? 0))
  }, [wide])

  return (
    <main className="app">
      <header className="hero">
        <h1>useLayoutEffect</h1>
        <p className="subtitle">在浏览器绘制前读取布局并同步更新。</p>
      </header>
      <section className="card stack">
        <button onClick={() => setWide((value) => !value)}>切换宽度</button>
        <div
          ref={boxRef}
          className="panel"
          style={{ width: wide ? '100%' : '55%' }}
        >
          测量目标
        </div>
        <span className="badge">宽度：{width}px</span>
      </section>
    </main>
  )
}

export default App
