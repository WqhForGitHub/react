import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import './App.css'

type InputHandle = { focus: () => void; clear: () => void }

const SearchInput = forwardRef<InputHandle>(function SearchInput(_, ref) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState('')

  useImperativeHandle(
    ref,
    () => ({
      focus: () => inputRef.current?.focus(),
      clear: () => setValue(''),
    }),
    [],
  )

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder="搜索关键词"
    />
  )
})

function App() {
  const inputRef = useRef<InputHandle>(null)

  return (
    <main className="app">
      <header className="hero">
        <h1>useImperativeHandle</h1>
        <p className="subtitle">自定义父组件通过 ref 能调用的命令式方法。</p>
      </header>
      <section className="card stack">
        <SearchInput ref={inputRef} />
        <div className="controls">
          <button onClick={() => inputRef.current?.focus()}>聚焦输入框</button>
          <button
            className="secondary"
            onClick={() => inputRef.current?.clear()}
          >
            清空
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
