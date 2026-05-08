import { useState } from 'react';
import Demo1RoomId from './Demo1RoomId';
import Demo2ReSync from './Demo2ReSync';
import Demo3ReactiveValues from './Demo3ReactiveValues';
import Demo4EmptyDeps from './Demo4EmptyDeps';
import Demo5IndependentEffects from './Demo5IndependentEffects';
import './App.css';

const demos = [
  { id: 'demo1', label: 'Demo 1: Effect 依赖于 roomId', component: Demo1RoomId },
  { id: 'demo2', label: 'Demo 2: 重新同步 Effect', component: Demo2ReSync },
  { id: 'demo3', label: 'Demo 3: 响应式值', component: Demo3ReactiveValues },
  { id: 'demo4', label: 'Demo 4: 空依赖数组', component: Demo4EmptyDeps },
  { id: 'demo5', label: 'Demo 5: 独立同步过程', component: Demo5IndependentEffects },
];

function App() {
  const [activeDemo, setActiveDemo] = useState<string>('demo1');

  const ActiveComponent = demos.find((d) => d.id === activeDemo)!.component;

  return (
    <div className="app">
      <header className="app-header">
        <h1>响应式 Effect 的生命周期</h1>
        <p className="subtitle">
          Effect 与组件有不同的生命周期。Effect 只能做两件事：开始同步，然后停止同步。
        </p>
      </header>

      <nav className="demo-nav">
        {demos.map((demo) => (
          <button
            key={demo.id}
            className={`demo-nav-btn ${activeDemo === demo.id ? 'active' : ''}`}
            onClick={() => setActiveDemo(demo.id)}
          >
            {demo.label}
          </button>
        ))}
      </nav>

      <main className="demo-content">
        <ActiveComponent />
      </main>

      <footer className="app-footer">
        <p>打开浏览器控制台（F12）查看 Effect 的连接/断开日志</p>
      </footer>
    </div>
  );
}

export default App;
