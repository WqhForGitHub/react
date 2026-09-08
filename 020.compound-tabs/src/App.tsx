import { useState, type CSSProperties } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/Tabs';

const page: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  maxWidth: 720,
  margin: '40px auto',
  padding: 24,
};

const btn: CSSProperties = {
  padding: '8px 14px',
  border: 'none',
  borderRadius: 8,
  background: '#2563eb',
  color: '#fff',
  cursor: 'pointer',
  fontSize: 14,
};

const ghostBtn: CSSProperties = {
  ...btn,
  background: '#f1f5f9',
  color: '#334155',
};

const muted: CSSProperties = { color: '#64748b', fontSize: 14, lineHeight: 1.7 };

const forecast: Record<string, { label: string; temp: string; wind: string; tip: string }> = {
  today: { label: '今天', temp: '18 ~ 26°C', wind: '东南风 3 级', tip: '适合出门散步' },
  tomorrow: { label: '明天', temp: '16 ~ 22°C', wind: '北风 4 级', tip: '记得带件外套' },
  weekend: { label: '周末', temp: '19 ~ 28°C', wind: '微风', tip: '适合郊游' },
};

export default function App() {
  const [day, setDay] = useState('today');

  return (
    <main style={page}>
      <h1>020 · 复合组件 Tabs</h1>
      <p style={muted}>
        Tabs 一族组件内部用 Context 互相配对，aria 属性由 useId 自动关联；使用方只负责组合 JSX
      </p>

      <section style={{ marginTop: 16 }}>
        <h2 style={{ fontSize: 16 }}>非受控用法（内部记忆选中项）</h2>
        <Tabs defaultValue="basics">
          <TabsList>
            <TabsTrigger value="basics">基础</TabsTrigger>
            <TabsTrigger value="hooks">Hooks</TabsTrigger>
            <TabsTrigger value="patterns">模式</TabsTrigger>
          </TabsList>
          <TabsContent value="basics">
            组件是把 UI 和逻辑打包的基本单元。state 是组件的私有数据，props 是外部传入的配置。
          </TabsContent>
          <TabsContent value="hooks">
            useState 管理状态，useEffect 处理副作用，useContext 跨层级读数据，自定义 Hook 复用逻辑。
          </TabsContent>
          <TabsContent value="patterns">
            复合组件、状态提升、渲染优化、Portal 弹层……不同场景选不同的组合方式。
          </TabsContent>
        </Tabs>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 16 }}>受控用法（外部状态驱动）</h2>
        <p style={muted}>
          当前选中：<code>{day}</code>，下面的按钮可以越过 Tabs 直接切换
        </p>
        <div style={{ display: 'flex', gap: 8, margin: '10px 0' }}>
          <button style={ghostBtn} onClick={() => setDay('today')}>
            切到今天
          </button>
          <button style={ghostBtn} onClick={() => setDay('weekend')}>
            切到周末
          </button>
        </div>
        <Tabs defaultValue="today" value={day} onChange={setDay}>
          <TabsList>
            {Object.entries(forecast).map(([key, info]) => (
              <TabsTrigger key={key} value={key}>
                {info.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(forecast).map(([key, info]) => (
            <TabsContent key={key} value={key}>
              <p>
                <strong>{info.temp}</strong> · {info.wind}
              </p>
              <p style={muted}>{info.tip}</p>
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </main>
  );
}
