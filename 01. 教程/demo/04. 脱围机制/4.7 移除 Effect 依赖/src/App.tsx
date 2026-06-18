import { useState } from 'react';
import Demo01DependencyMatching from './demos/Demo01DependencyMatching';
import Demo02MoveToEventHandler from './demos/Demo02MoveToEventHandler';
import Demo03SplitEffects from './demos/Demo03SplitEffects';
import Demo04UpdaterFunction from './demos/Demo04UpdaterFunction';
import Demo05EffectEvent from './demos/Demo05EffectEvent';
import Demo06ObjectDependency from './demos/Demo06ObjectDependency';

const demos = [
  { id: '01', title: '依赖应该和代码保持一致', component: Demo01DependencyMatching },
  { id: '02', title: '代码应该移到事件处理程序中吗？', component: Demo02MoveToEventHandler },
  { id: '03', title: '拆分不相关的 Effect', component: Demo03SplitEffects },
  { id: '04', title: '使用更新函数移除依赖', component: Demo04UpdaterFunction },
  { id: '05', title: '使用 Effect Event 读取值而不"反应"', component: Demo05EffectEvent },
  { id: '06', title: '避免对象和函数作为依赖', component: Demo06ObjectDependency },
];

function App() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const ActiveComponent = demos.find((d) => d.id === activeDemo)?.component;

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <header
        style={{
          padding: '1.5rem',
          borderBottom: '2px solid #eee',
          marginBottom: '1.5rem',
        }}
      >
        <h1 style={{ margin: 0, marginBottom: '0.5rem' }}>
          移除 Effect 依赖
        </h1>
        <p style={{ margin: 0, color: '#666', lineHeight: 1.6 }}>
          当编写 Effect 时，linter 会验证是否已经将 Effect 读取的每一个响应式值包含在依赖中。
          不必要的依赖可能会导致 Effect 运行过于频繁，甚至产生无限循环。
        </p>
      </header>

      {activeDemo ? (
        <div>
          <button
            onClick={() => setActiveDemo(null)}
            style={{
              marginBottom: '1rem',
              padding: '0.4rem 1rem',
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: 4,
              background: '#fff',
            }}
          >
            ← 返回目录
          </button>
          {ActiveComponent && <ActiveComponent />}
        </div>
      ) : (
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {demos.map((demo) => (
              <li key={demo.id} style={{ marginBottom: '0.75rem' }}>
                <button
                  onClick={() => setActiveDemo(demo.id)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '1rem 1.25rem',
                    cursor: 'pointer',
                    border: '1px solid #ddd',
                    borderRadius: 6,
                    background: '#fafafa',
                    fontSize: '1rem',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#eef';
                    e.currentTarget.style.borderColor = '#88f';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#fafafa';
                    e.currentTarget.style.borderColor = '#ddd';
                  }}
                >
                  <strong style={{ color: '#646cff' }}>Demo {demo.id}</strong>
                  <span style={{ marginLeft: '0.75rem' }}>{demo.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

export default App;
