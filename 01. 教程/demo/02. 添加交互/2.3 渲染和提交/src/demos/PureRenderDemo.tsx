/**
 * 纯函数渲染
 *
 * 渲染必须始终是一次纯计算：
 * - 输入相同，输出相同：给定相同的输入，组件应始终返回相同的 JSX
 * - 只做它自己的事情：不应更改任何存在于渲染之前的对象或变量
 *
 * 在"严格模式"下，React 会调用每个组件的函数两次，帮助发现不纯函数引起的错误。
 * 本 Demo 展示了纯函数与不纯函数的区别。
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
          <span style={{ opacity: 0.5 }}>点击按钮观察纯函数 vs 不纯函数...</span>
        ) : (
          logs.map((log, i) => <div key={i}>{log}</div>)
        )}
      </div>
    </div>
  )
}

/** 纯函数组件：给定相同的 props，始终返回相同的 JSX */
function PureGuest({ name }: { name: string }) {
  return (
    <div style={{
      padding: 12,
      borderRadius: 6,
      background: 'rgba(72, 187, 120, 0.1)',
      border: '1px solid rgba(72, 187, 120, 0.4)',
      marginBottom: 8
    }}>
      ✅ 纯函数组件 — <code>Guest name=&quot;{name}&quot;</code> 始终返回相同结果
    </div>
  )
}

/** 不纯函数组件：在渲染期间修改外部变量 */
let impureCounter = 0

function ImpureGuest({ name, onLog }: { name: string; onLog: (msg: string) => void }) {
  // 不纯！在渲染期间修改了外部变量
  impureCounter++
  onLog(`⚠️ 不纯组件 Guest("${name}") 被调用：外部变量 impureCounter 变为 ${impureCounter}`)

  return (
    <div style={{
      padding: 12,
      borderRadius: 6,
      background: 'rgba(255, 100, 100, 0.1)',
      border: '1px solid rgba(255, 100, 100, 0.4)',
      marginBottom: 8
    }}>
      ❌ 不纯函数组件 — 修改了外部变量 <code>impureCounter = {impureCounter}</code>
      <div style={{ fontSize: '0.85em', marginTop: 4, opacity: 0.8 }}>
        每次渲染都会改变外部状态，在严格模式下会被调用两次，导致不可预测的行为！
      </div>
    </div>
  )
}

export default function PureRenderDemo() {
  const [guestName, setGuestName] = useState('小明')
  const [renderCount, setRenderCount] = useState(0)
  const [logs, setLogs] = useState<string[]>([])
  const [showImpure, setShowImpure] = useState(false)

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, msg])
  }

  const handleTriggerRender = () => {
    setRenderCount(c => c + 1)
    addLog(`--- 触发第 ${renderCount + 1} 次重渲染 ---`)
  }

  const handleToggleImpure = () => {
    setShowImpure(prev => !prev)
    impureCounter = 0
    setLogs([])
  }

  const handleReset = () => {
    setGuestName('小明')
    setRenderCount(0)
    setLogs([])
    impureCounter = 0
  }

  return (
    <div>
      <h3>渲染必须是纯计算</h3>
      <p>
        渲染必须始终是一次纯计算。给定相同的输入，组件应始终返回相同的 JSX，
        且不应更改任何存在于渲染之前的对象或变量。
      </p>

      <div className="warning">
        <strong>陷阱：</strong>在"严格模式"下，React 会调用每个组件的函数两次，
        这可以帮助发现由不纯函数引起的错误。不纯的渲染会导致令人困惑的错误和不可预测的行为。
      </div>

      <h3 style={{ marginTop: 24 }}>纯函数 vs 不纯函数</h3>

      <div className="demo-box">
        <PureGuest name={guestName} />
        {showImpure && <ImpureGuest name={guestName} onLog={addLog} />}
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          placeholder="修改客人名字"
        />
        <button onClick={handleTriggerRender}>
          触发重渲染
        </button>
        <button
          onClick={handleToggleImpure}
          style={{
            background: showImpure ? 'rgba(255, 100, 100, 0.1)' : 'var(--accent-bg)',
            borderColor: showImpure ? 'rgba(255, 100, 100, 0.4)' : 'var(--accent-border)',
            color: showImpure ? '#e53e3e' : 'var(--accent)',
          }}
        >
          {showImpure ? '隐藏不纯组件' : '显示不纯组件'}
        </button>
        <button onClick={handleReset} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text)' }}>
          重置
        </button>
      </div>

      <LogPanel logs={logs} onClear={() => setLogs([])} />
    </div>
  )
}
