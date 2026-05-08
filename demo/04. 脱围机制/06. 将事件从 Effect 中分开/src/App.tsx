import { useState } from 'react';
import Demo1_ChatRoom from './demos/Demo1_ChatRoom';
import Demo2_ThemeProblem from './demos/Demo2_ThemeProblem';
import Demo3_EffectEventSolution from './demos/Demo3_EffectEventSolution';
import Demo4_PointerStale from './demos/Demo4_PointerStale';
import Demo5_PointerEffectEvent from './demos/Demo5_PointerEffectEvent';
import Demo6_PageVisit from './demos/Demo6_PageVisit';
import './App.css';

const demos = [
  { id: 1, title: '1. 事件处理函数 vs Effect', component: Demo1_ChatRoom },
  { id: 2, title: '2. 问题：theme 导致聊天重连', component: Demo2_ThemeProblem },
  { id: 3, title: '3. 解决方案：useEffectEvent', component: Demo3_EffectEventSolution },
  { id: 4, title: '4. 问题：抑制依赖检查 → 过期值', component: Demo4_PointerStale },
  { id: 5, title: '5. 解决方案：useEffectEvent 修复过期值', component: Demo5_PointerEffectEvent },
  { id: 6, title: '6. Effect Event 读取最新 props/state', component: Demo6_PageVisit },
];

function App() {
  const [activeDemo, setActiveDemo] = useState(1);

  const ActiveComponent = demos.find((d) => d.id === activeDemo)?.component ?? Demo1_ChatRoom;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>将事件从 Effect 中分开</h1>
        <p className="subtitle">Separating Events from Effects</p>
      </header>

      <nav className="demo-nav">
        {demos.map((demo) => (
          <button
            key={demo.id}
            className={`demo-tab ${activeDemo === demo.id ? 'active' : ''}`}
            onClick={() => setActiveDemo(demo.id)}
          >
            {demo.title}
          </button>
        ))}
      </nav>

      <main className="demo-content">
        <ActiveComponent />
      </main>
    </div>
  );
}

export default App;
