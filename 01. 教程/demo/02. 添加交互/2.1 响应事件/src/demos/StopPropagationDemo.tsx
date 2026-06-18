/**
 * 阻止传播
 *
 * 事件处理函数接收一个事件对象作为唯一的参数（通常称为 e）。
 * 调用 e.stopPropagation() 可以阻止事件到达父组件。
 * 也可以在调用父元素 onClick 函数之前添加更多代码，
 * 这是事件传播的替代方案——让子组件处理事件，同时也让父组件指定额外的行为。
 */

import React from 'react'

interface StopButtonProps {
  onClick: () => void
  children: React.ReactNode
}

function StopButton({ onClick, children }: StopButtonProps) {
  return (
    <button onClick={e => {
      e.stopPropagation()
      onClick()
    }}>
      {children}
    </button>
  )
}

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
          <span style={{ opacity: 0.5 }}>点击按钮查看 e.stopPropagation() 的效果...</span>
        ) : (
          logs.map((log, i) => <div key={i}>{log}</div>)
        )}
      </div>
    </div>
  )
}

export default function StopPropagationDemo() {
  const [logs, setLogs] = React.useState<string[]>([])

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, msg])
  }

  const clearLogs = () => setLogs([])

  return (
    <div>
      <h3>e.stopPropagation() 阻止传播</h3>
      <p>StopButton 内部调用了 e.stopPropagation()，点击按钮时只有按钮自身的处理函数执行，父级 div 不会收到事件：</p>
      <div
        className="demo-box"
        onClick={() => addLog('📦 父级 <div> 的 onClick 触发（如果未被阻止）')}
        style={{ cursor: 'pointer' }}
      >
        <p style={{ margin: '0 0 12px', fontSize: '0.9em', opacity: 0.7 }}>
          点击按钮不会触发父级，点击此区域则会
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          <StopButton onClick={() => addLog('🎬 按钮 "播放电影" 的 onClick 触发 ✓ 已阻止传播')}>
            播放电影
          </StopButton>
          <StopButton onClick={() => addLog('📤 按钮 "上传图片" 的 onClick 触发 ✓ 已阻止传播')}>
            上传图片
          </StopButton>
        </div>
      </div>
      <LogPanel logs={logs} onClear={clearLogs} />
    </div>
  )
}
