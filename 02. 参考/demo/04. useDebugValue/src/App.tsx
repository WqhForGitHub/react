import { useDebugValue, useEffect, useState } from 'react'
import './App.css'

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useDebugValue(isOnline, (online) => (online ? 'Online' : 'Offline'))

  useEffect(() => {
    const update = () => setIsOnline(navigator.onLine)
    window.addEventListener('online', update)
    window.addEventListener('offline', update)
    return () => {
      window.removeEventListener('online', update)
      window.removeEventListener('offline', update)
    }
  }, [])

  return isOnline
}

function App() {
  const isOnline = useOnlineStatus()

  return (
    <main className="app">
      <header className="hero">
        <h1>useDebugValue</h1>
        <p className="subtitle">给自定义 Hook 添加 React DevTools 调试标签。</p>
      </header>
      <section className="card stack">
        <span className="badge">{isOnline ? 'Online' : 'Offline'}</span>
        <p>打开 React DevTools 查看 useOnlineStatus 的 debug value。</p>
      </section>
    </main>
  )
}

export default App
