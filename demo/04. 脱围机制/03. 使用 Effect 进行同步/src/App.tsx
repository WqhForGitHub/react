import { useState } from 'react';
import VideoPlayerDemo from './demos/VideoPlayerDemo';
import ChatRoomDemo from './demos/ChatRoomDemo';
import PlaygroundDemo from './demos/PlaygroundDemo';
import CommonPatternsDemo from './demos/CommonPatternsDemo';
import AntiPatternsDemo from './demos/AntiPatternsDemo';
import './App.css';

const demos = [
  { title: '1. 视频播放器', subtitle: 'Effect 与依赖数组', component: <VideoPlayerDemo /> },
  { title: '2. 聊天室', subtitle: 'Effect 清理函数', component: <ChatRoomDemo /> },
  { title: '3. Playground', subtitle: 'Effect 生命周期', component: <PlaygroundDemo /> },
  { title: '4. 常见模式', subtitle: '5 种典型场景', component: <CommonPatternsDemo /> },
  { title: '5. 不适用 Effect', subtitle: '反模式与替代方案', component: <AntiPatternsDemo /> },
];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="app">
      <header className="app-header">
        <h1>使用 Effect 进行同步</h1>
        <p className="app-subtitle">
          Effect 允许你在渲染结束后执行代码，将组件与 React 外部的系统相同步
        </p>
      </header>

      <nav className="app-nav">
        {demos.map((demo, i) => (
          <button
            key={i}
            className={`nav-btn ${activeIndex === i ? 'active' : ''}`}
            onClick={() => setActiveIndex(i)}
          >
            <span className="nav-title">{demo.title}</span>
            <span className="nav-subtitle">{demo.subtitle}</span>
          </button>
        ))}
      </nav>

      <main className="app-main">{demos[activeIndex].component}</main>

      <footer className="app-footer">
        <p>
          <strong>摘要：</strong>Effect 由渲染自身引起（而非特定交互）；用于与外部系统同步；依赖数组控制
          Effect 重新运行；清理函数在 Effect 重新运行前和组件卸载时调用；开发环境双重挂载是特性，不是 bug。
        </p>
      </footer>
    </div>
  );
}

export default App;
