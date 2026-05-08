import { useState } from 'react';
import ImperativeForm from './components/ImperativeForm';
import DeclarativeForm from './components/DeclarativeForm';
import FormStates from './components/FormStates';
import './App.css';

type Tab = 'imperative' | 'declarative' | 'states';

const tabs: { key: Tab; label: string; description: string }[] = [
  {
    key: 'imperative',
    label: '命令式 UI',
    description: '直接操作 DOM，一步步控制 UI 更新',
  },
  {
    key: 'declarative',
    label: '声明式 UI',
    description: '声明你想要显示的内容，React 自动更新 UI',
  },
  {
    key: 'states',
    label: '视图状态一览',
    description: '同时展示所有视图状态（Living Styleguide）',
  },
];

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('declarative');

  return (
    <div className="app">
      <header className="app-header">
        <h1>用 State 响应输入</h1>
        <p className="subtitle">
          React 控制UI的方式是声明式的 —— 你不必直接控制 UI，只需声明组件可以处于的不同状态，并根据用户输入在它们之间切换。
        </p>
      </header>

      <nav className="tab-nav">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <span className="tab-label">{tab.label}</span>
            <span className="tab-desc">{tab.description}</span>
          </button>
        ))}
      </nav>

      <main className="tab-content">
        {activeTab === 'imperative' && <ImperativeForm />}
        {activeTab === 'declarative' && <DeclarativeForm />}
        {activeTab === 'states' && <FormStates />}
      </main>

      <footer className="app-footer">
        <div className="steps-summary">
          <h3>声明式 UI 开发步骤</h3>
          <ol>
            <li><strong>定位</strong>你的组件中不同的视图状态</li>
            <li><strong>确定</strong>是什么触发了这些 state 的改变</li>
            <li><strong>表示</strong>内存中的 state（使用 <code>useState</code>）</li>
            <li><strong>删除</strong>任何不必要的 state 变量</li>
            <li><strong>连接</strong>事件处理函数去设置 state</li>
          </ol>
        </div>
      </footer>
    </div>
  );
}

export default App;
