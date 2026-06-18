import { useOptimistic, useState } from 'react'
import './App.css'

type Message = { id: number; text: string; sending?: boolean }

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: '欢迎学习 React Hooks' },
  ])
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (current, text: string) => [
      ...current,
      { id: Date.now(), text, sending: true },
    ],
  )

  async function send(formData: FormData) {
    const text = String(formData.get('message') ?? '').trim()
    if (!text) return
    addOptimisticMessage(text)
    await new Promise((resolve) => setTimeout(resolve, 900))
    setMessages((current) => [...current, { id: Date.now(), text }])
  }

  return (
    <main className="app">
      <header className="hero">
        <h1>useOptimistic</h1>
        <p className="subtitle">在异步操作完成前先展示乐观 UI。</p>
      </header>
      <section className="card stack">
        <form action={send} className="controls">
          <input name="message" placeholder="输入消息" />
          <button>发送</button>
        </form>
        <ul className="list">
          {optimisticMessages.map((message) => (
            <li key={message.id}>
              {message.text}{' '}
              {message.sending ? <em className="muted">发送中...</em> : null}
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
