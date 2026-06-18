/**
 * 提交到 DOM
 *
 * 在渲染（调用）你的组件之后，React 将会修改 DOM：
 * - 初次渲染：React 使用 appendChild() 将所有 DOM 节点放到屏幕上
 * - 重渲染：React 将应用最少的必要操作，使得 DOM 与最新的渲染输出相互匹配
 *
 * React 仅在渲染之间存在差异时才会更改 DOM 节点。
 * 例如：即使组件重渲染，<input> 中用户输入的文本不会消失，
 * 因为 React 只更新 <h1> 的内容，不会修改 <input>。
 */
import { useState, useEffect, useRef } from 'react'

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
        <strong>DOM 更新日志：</strong>
        <button
          onClick={(e) => { e.stopPropagation(); onClear() }}
          style={{ fontSize: '0.8em', padding: '2px 8px' }}
        >
          清空
        </button>
      </div>
      <div ref={logRef} className="render-log">
        {logs.length === 0 ? (
          <span style={{ opacity: 0.5 }}>点击按钮观察 DOM 更新...</span>
        ) : (
          logs.map((log, i) => <div key={i}>{log}</div>)
        )}
      </div>
    </div>
  )
}

interface ClockProps {
  time: string
  renderCount: number
  onDomUpdate: (msg: string) => void
}

function Clock({ time, renderCount, onDomUpdate }: ClockProps) {
  const h1Ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (renderCount === 1) {
      onDomUpdate('🆕 初次渲染：创建 <h1> 和 <input> DOM 节点')
    } else {
      onDomUpdate(`✏️ 第 ${renderCount} 次重渲染：仅更新 <h1> 的文本内容为 "${time}"`)
      onDomUpdate('   <input> 未被修改 — 用户输入的文本保持不变')
    }
  }, [time, renderCount, onDomUpdate])

  return (
    <>
      <h1 ref={h1Ref} style={{ fontFamily: 'var(--mono)', fontSize: '1.2em', margin: '0 0 12px' }}>
        {time}
      </h1>
      <input placeholder="在此输入文字，重渲染后不会丢失..." />
    </>
  )
}

export default function CommitToDomDemo() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString('zh-CN'))
  const [renderCount, setRenderCount] = useState(1)
  const [logs, setLogs] = useState<string[]>([])

  const handleUpdateTime = () => {
    setTime(new Date().toLocaleTimeString('zh-CN'))
    setRenderCount(c => c + 1)
  }

  const handleReset = () => {
    setTime(new Date().toLocaleTimeString('zh-CN'))
    setRenderCount(1)
    setLogs([])
  }

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, msg])
  }

  return (
    <div>
      <h3>步骤 3：React 把更改提交到 DOM 上</h3>
      <p>
        在渲染组件之后，React 将会修改 DOM。对于重渲染，React 仅应用<strong>最少的必要操作</strong>来使 DOM 与最新输出匹配。
      </p>

      <div className="demo-box">
        <p style={{ margin: '0 0 8px', fontSize: '0.9em', opacity: 0.7 }}>
          试试在输入框中输入文字，然后点击"更新时间" — 你的输入不会丢失！
        </p>
        <Clock time={time} renderCount={renderCount} onDomUpdate={addLog} />
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <button onClick={handleUpdateTime}>
          更新时间（触发重渲染）
        </button>
        <button onClick={handleReset} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text)' }}>
          重置
        </button>
      </div>

      <LogPanel logs={logs} onClear={() => setLogs([])} />
    </div>
  )
}
