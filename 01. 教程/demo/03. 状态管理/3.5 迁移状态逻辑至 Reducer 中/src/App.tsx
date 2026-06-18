import { useState } from 'react';
import UseStateDemo from './demos/UseStateDemo';
import UseReducerDemo from './demos/UseReducerDemo';
import './App.css';

const DEMOS: { key: string; label: string; component: React.ComponentType }[] = [
  { key: 'useState', label: 'useState 版本', component: UseStateDemo },
  { key: 'useReducer', label: 'useReducer 版本', component: UseReducerDemo },
];

function App() {
  const [activeDemo, setActiveDemo] = useState('useReducer');

  const ActiveComponent = DEMOS.find((d) => d.key === activeDemo)!.component;

  return (
    <div className="app">
      <header className="app-header">
        <h1>迁移状态逻辑至 Reducer 中</h1>
        <p>将组件的所有状态更新逻辑整合到一个外部函数中</p>
      </header>

      <nav className="demo-nav">
        {DEMOS.map((demo) => (
          <button
            key={demo.key}
            className={`nav-btn ${activeDemo === demo.key ? 'active' : ''}`}
            onClick={() => setActiveDemo(demo.key)}
          >
            {demo.label}
          </button>
        ))}
      </nav>

      <main className="demo-main">
        <ActiveComponent />
      </main>

      <footer className="app-footer">
        <p>
          基于{' '}
          <a
            href="https://zh-hans.react.dev/learn/extracting-state-logic-into-a-reducer"
            target="_blank"
            rel="noreferrer"
          >
            React 官方文档 - 迁移状态逻辑至 Reducer 中
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
