/**
 * 触发渲染
 *
 * 有两种原因会导致组件的渲染：
 * 1. 组件的初次渲染 — 通过调用 createRoot 和 render 完成
 * 2. 组件（或其祖先之一）的状态发生了改变 — 通过 set 函数触发
 *
 * 本 Demo 演示了这两种触发渲染的方式，并可视化渲染日志。
 */
import { useState, useRef, useEffect } from 'react'

interface LogPanelProps {
  logs: string[]
  onClear: () => void
}

function LogPanel({ logs, onClear }: LogPanelProps) {
  const logRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [logs])

  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <strong>渲染日志：</strong>
        <button
          onClick={(e) => { e.stopPropagation(); onClear() }}
          style={{ fontSize: '0.8em', padding: '2px 8px' }}
        >
          清空
        </button>
      </div>
      <div ref={logRef} className="render-log">
        {logs.length === 0 ? (
          <span style={{ opacity: 0.5 }}>点击按钮触发渲染...</span>
        ) : (
          logs.map((log, i) => <div key={i}>{log}</div>)
        )}
      </div>
    </div>
  )
}

export default function TriggerRenderDemo() {
  const [count, setCount] = useState(0)
  const [logs, setLogs] = useState<string[]>([])

  // 记录每次渲染
  useEffect(() => {
    if (count === 0 && logs.length === 0) {
      setLogs(prev => [...prev, '🚀 初次渲染 — createRoot().render(<App />) 触发'])
    } else if (count > 0) {
      setLogs(prev => [...prev, `🔄 第 ${count} 次重渲染 — setCount(${count}) 触发了状态更新`])
    }
  }, [count])

  const handleIncrement = () => {
    setCount(c => c + 1)
  }

  const handleReset = () => {
    setCount(0)
    setLogs([])
  }

  return (
    <div>
      <h3>步骤 1：触发渲染</h3>
      <p>
        组件显示到屏幕之前，其必须被 React 渲染。触发渲染有两种原因：
      </p>
      <div className="demo-box">
        <p><strong>1. 初次渲染</strong> — 应用启动时，通过 <code>createRoot</code> 和 <code>render</code> 触发</p>
        <p><strong>2. 状态更新</strong> — 组件（或其祖先之一）的 <code>set</code> 函数被调用时触发</p>
      </div>

      <h3 style={{ marginTop: 24 }}>交互演示</h3>
      <p>点击按钮调用 <code>setCount</code>，触发状态更新从而重新渲染：</p>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <button onClick={handleIncrement}>
          点击计数（当前: {count}）
        </button>
        <button onClick={handleReset} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text)' }}>
          重置
        </button>
      </div>

      <LogPanel logs={logs} onClear={() => setLogs([])} />
    </div>
  )
}
