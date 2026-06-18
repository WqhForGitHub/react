import { useId } from 'react'
import './App.css'

function Field({ label }: { label: string }) {
  const id = useId()
  return (
    <label className="stack" htmlFor={id}>
      {label}
      <input id={id} placeholder={'输入' + label} />
      <small className="muted">生成的 id：{id}</small>
    </label>
  )
}

function App() {
  return (
    <main className="app">
      <header className="hero">
        <h1>useId</h1>
        <p className="subtitle">生成稳定、唯一、适合无障碍属性的 ID。</p>
      </header>
      <section className="card grid">
        <Field label="姓名" />
        <Field label="邮箱" />
      </section>
    </main>
  )
}

export default App
