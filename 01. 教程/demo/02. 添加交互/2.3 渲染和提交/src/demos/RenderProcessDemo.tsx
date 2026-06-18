/**
 * 渲染组件
 *
 * 在触发渲染后，React 会调用你的组件来确定要在屏幕上显示的内容。
 * - 初次渲染时，React 会调用根组件
 * - 后续渲染中，React 会调用内部状态更新触发了渲染的函数组件
 *
 * 这个过程是递归的：如果更新后的组件返回某个另外的组件，
 * React 接下来就会渲染那个组件，以此类推。
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
        <strong>组件调用日志：</strong>
        <button
          onClick={(e) => { e.stopPropagation(); onClear() }}
          style={{ fontSize: '0.8em', padding: '2px 8px' }}
        >
          清空
        </button>
      </div>
      <div ref={logRef} className="render-log">
        {logs.length === 0 ? (
          <span style={{ opacity: 0.5 }}>点击按钮查看递归渲染过程...</span>
        ) : (
          logs.map((log, i) => <div key={i}>{log}</div>)
        )}
      </div>
    </div>
  )
}

interface ImageProps {
  index: number
  onRender: (name: string) => void
}

function Image({ index, onRender }: ImageProps) {
  onRender(`  🖼️ 渲染 Image(${index})`)
  return (
    <img
      src="https://i.imgur.com/ZF6s192.jpg"
      alt="Floralis Genérica 雕塑"
      style={{ width: 100, height: 70, objectFit: 'cover', borderRadius: 6, border: '1px solid var(--border)' }}
    />
  )
}

interface GalleryProps {
  onRender: (name: string) => void
}

function Gallery({ onRender }: GalleryProps) {
  onRender('🎨 渲染 Gallery()')
  return (
    <section>
      <h4 style={{ margin: '0 0 8px' }}>鼓舞人心的雕塑</h4>
      <div style={{ display: 'flex', gap: 8 }}>
        <Image index={1} onRender={onRender} />
        <Image index={2} onRender={onRender} />
        <Image index={3} onRender={onRender} />
      </div>
    </section>
  )
}

export default function RenderProcessDemo() {
  const [renderKey, setRenderKey] = useState(0)
  const [logs, setLogs] = useState<string[]>([])
  const renderLogsRef = useRef<string[]>([])

  const recordRender = (name: string) => {
    renderLogsRef.current.push(name)
  }

  // 在渲染完成后将日志刷新到状态中
  useEffect(() => {
    if (renderLogsRef.current.length > 0) {
      setLogs(prev => [...prev, `--- 第 ${renderKey} 次渲染 ---`, ...renderLogsRef.current])
      renderLogsRef.current = []
    }
  }, [renderKey])

  const handleTriggerRender = () => {
    setRenderKey(k => k + 1)
  }

  const handleReset = () => {
    setRenderKey(0)
    setLogs([])
    renderLogsRef.current = []
  }

  return (
    <div>
      <h3>步骤 2：React 渲染你的组件</h3>
      <p>
        在你触发渲染后，React 会调用你的组件来确定要在屏幕上显示的内容。
        这个过程是<strong>递归</strong>的 — 如果组件返回了另一个组件，
        React 就会继续渲染那个组件，以此类推。
      </p>

      <div className="demo-box">
        <p>下方模拟了 <code>Gallery</code> 渲染时 React 递归调用组件的过程：</p>
        <Gallery key={renderKey} onRender={recordRender} />
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <button onClick={handleTriggerRender}>
          触发重渲染
        </button>
        <button onClick={handleReset} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text)' }}>
          重置
        </button>
      </div>

      <LogPanel logs={logs} onClear={() => setLogs([])} />
    </div>
  )
}
