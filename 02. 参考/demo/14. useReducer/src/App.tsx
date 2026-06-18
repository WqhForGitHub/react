import { useReducer } from 'react'
import './App.css'

type State = { count: number }
type Action = { type: 'increment' } | { type: 'decrement' } | { type: 'reset' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return { count: 0 }
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })
  return (
    <main className="app">
      <header className="hero">
        <h1>useReducer</h1>
        <p className="subtitle">把复杂状态更新集中到 reducer 函数中。</p>
      </header>
      <section className="card stack">
        <span className="badge">count: {state.count}</span>
        <div className="controls">
          <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
          <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
          <button
            className="secondary"
            onClick={() => dispatch({ type: 'reset' })}
          >
            重置
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
