import { createContext, useContext, useState, type ReactNode } from 'react'
import './App.css'

type Theme = 'light' | 'dark'
const ThemeContext = createContext<Theme>('light')

function Preview({ children }: { children: ReactNode }) {
  const theme = useContext(ThemeContext)
  return (
    <div className={'panel stack ' + (theme === 'dark' ? 'dark-preview' : '')}>
      {children}
      <span className="badge">当前主题：{theme}</span>
    </div>
  )
}

function App() {
  const [theme, setTheme] = useState<Theme>('light')

  return (
    <ThemeContext value={theme}>
      <main className="app">
        <header className="hero">
          <h1>useContext</h1>
          <p className="subtitle">从最近的 Context Provider 读取共享数据。</p>
        </header>
        <section className="card stack">
          <button
            onClick={() =>
              setTheme((value) => (value === 'light' ? 'dark' : 'light'))
            }
          >
            切换主题
          </button>
          <Preview>深层组件不需要逐层传 props。</Preview>
        </section>
      </main>
    </ThemeContext>
  )
}

export default App
