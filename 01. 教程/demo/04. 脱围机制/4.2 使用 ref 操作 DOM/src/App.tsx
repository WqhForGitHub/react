import { useState } from 'react';
import FocusInput from './components/FocusInput';
import ScrollToElement from './components/ScrollToElement';
import RefCallbackList from './components/RefCallbackList';
import AccessAnotherComponentDOM from './components/AccessAnotherComponentDOM';
import ImperativeHandleDemo from './components/ImperativeHandleDemo';
import FlushSyncDemo from './components/FlushSyncDemo';
import BestPracticesDemo from './components/BestPracticesDemo';
import './App.css';

type DemoKey =
  | 'focus'
  | 'scroll'
  | 'refCallback'
  | 'accessAnother'
  | 'imperativeHandle'
  | 'flushSync'
  | 'bestPractices';

const demos: { key: DemoKey; label: string }[] = [
  { key: 'focus', label: '使文本输入框获得焦点' },
  { key: 'scroll', label: '滚动至一个元素' },
  { key: 'refCallback', label: 'ref 回调管理列表' },
  { key: 'accessAnother', label: '访问另一个组件的 DOM' },
  { key: 'imperativeHandle', label: '命令句柄暴露 API' },
  { key: 'flushSync', label: 'flushSync 同步更新' },
  { key: 'bestPractices', label: '最佳实践' },
];

function App() {
  const [activeDemo, setActiveDemo] = useState<DemoKey>('focus');

  function renderDemo() {
    switch (activeDemo) {
      case 'focus':
        return <FocusInput />;
      case 'scroll':
        return <ScrollToElement />;
      case 'refCallback':
        return <RefCallbackList />;
      case 'accessAnother':
        return <AccessAnotherComponentDOM />;
      case 'imperativeHandle':
        return <ImperativeHandleDemo />;
      case 'flushSync':
        return <FlushSyncDemo />;
      case 'bestPractices':
        return <BestPracticesDemo />;
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>使用 ref 操作 DOM</h1>
        <p className="subtitle">
          React 会自动处理更新 DOM 以匹配渲染输出，但有时你需要访问由 React 管理的 DOM 元素
        </p>
      </header>

      <nav className="demo-nav">
        {demos.map((demo) => (
          <button
            key={demo.key}
            className={`nav-btn ${activeDemo === demo.key ? 'active' : ''}`}
            onClick={() => setActiveDemo(demo.key)}
          >
            {demo.label}
          </button>
        ))}
      </nav>

      <main className="demo-main">{renderDemo()}</main>
    </div>
  );
}

export default App;
