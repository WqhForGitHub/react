/**
 * 事件传播
 *
 * 事件处理函数将捕获任何来自子组件的事件。事件会沿着树向上"冒泡"或"传播"：
 * 它从事件发生的地方开始，然后沿着树向上传播。
 * 点击子按钮时，子组件的 onClick 先执行，然后父级 div 的 onClick 也会执行。
 *
 * 注意：在 React 中所有事件都会传播，除了 onScroll，它仅适用于你附加到的 JSX 标签。
 */

import React from 'react'

interface LogPanelProps {
  logs: string[]
  onClear: () => void
}

function LogPanel({ logs, onClear }: LogPanelProps) {
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <strong>事件日志：</strong>
        <button
          onClick={(e) => { e.stopPropagation(); onClear() }}
          style={{ fontSize: '0.8em', padding: '2px 8px', cursor: 'pointer' }}
        >
          清空
        </button>
      </div>
      <div style={{
        background: 'var(--code-bg)',
        borderRadius: 6,
        padding: 12,
        fontFamily: 'var(--mono)',
        fontSize: '0.85em',
        minHeight: 60,
        maxHeight: 150,
        overflowY: 'auto',
      }}>
        {logs.length === 0 ? (
          <span style={{ opacity: 0.5 }}>点击按钮查看事件传播...</span>
        ) : (
          logs.map((log, i) => <div key={i}>{log}</div>)
        )}
      </div>
    </div>
  )
}

export default function EventPropagationDemo() {
  const [logs, setLogs] = React.useState<string[]>([])

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, msg])
  }

  const clearLogs = () => setLogs([])

  return (
    <div>
      <h3>事件传播（冒泡）</h3>
      <p>点击按钮时，按钮自身的 onClick 先执行，然后父级 div 的 onClick 也会执行：</p>
      <div
        className="demo-box"
        onClick={() => addLog('📦 父级 <div> 的 onClick 触发')}
        style={{ cursor: 'pointer' }}
      >
        <p style={{ margin: '0 0 12px', fontSize: '0.9em', opacity: 0.7 }}>
          点击按钮或此区域查看事件传播
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => addLog('🎬 按钮 "播放电影" 的 onClick 触发')}>
            播放电影
          </button>
          <button onClick={() => addLog('📤 按钮 "上传图片" 的 onClick 触发')}>
            上传图片
          </button>
        </div>
      </div>
      <LogPanel logs={logs} onClear={clearLogs} />
    </div>
  )
}
