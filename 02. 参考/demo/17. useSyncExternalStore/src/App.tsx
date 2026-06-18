import { useSyncExternalStore } from 'react'
import './App.css'

let value = 0
const listeners = new Set<() => void>()

const counterStore = {
  increment() {
    value += 1
    listeners.forEach((listener) => listener())
  },
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  getSnapshot() {
    return value
  },
}

function App() {
  const count = useSyncExternalStore(
    counterStore.subscribe,
    counterStore.getSnapshot,
  )
  return (
    <main className="app">
      <header className="hero">
        <h1>useSyncExternalStore</h1>
        <p className="subtitle">订阅 React 外部 store，并安全读取快照。</p>
      </header>
      <section className="card stack">
        <span className="badge">外部 store：{count}</span>
        <button onClick={counterStore.increment}>更新外部 store</button>
      </section>
    </main>
  )
}

export default App
