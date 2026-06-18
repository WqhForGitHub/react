import { useState } from 'react';
import MovingDot from './components/MovingDot';
import FeedbackForm from './components/FeedbackForm';
import CheckInForm from './components/CheckInForm';
import Menu from './components/Menu';
import TravelPlan from './components/TravelPlan';
import './App.css';

type DemoKey = 'moving-dot' | 'feedback-form' | 'check-in-form' | 'menu' | 'travel-plan';

const demos: { key: DemoKey; title: string; description: string }[] = [
  {
    key: 'moving-dot',
    title: '1. 合并关联的 state',
    description:
      '如果两个 state 变量总是一起变化，将它们合并为一个 state 变量更好。x 和 y 坐标总是一起更新，用对象 { x, y } 来表示位置。',
  },
  {
    key: 'feedback-form',
    title: '2. 避免互相矛盾的 state',
    description:
      'isSending 和 isSent 不应同时为 true，用一个 status 变量代替它们，取值为 typing | sending | sent。',
  },
  {
    key: 'check-in-form',
    title: '3. 避免冗余的 state',
    description:
      'fullName 可以从 firstName 和 lastName 计算得出，不需要作为 state。在渲染期间直接计算即可。',
  },
  {
    key: 'menu',
    title: '4. 避免重复的 state',
    description:
      '不要在 state 中存储 selectedItem 对象（与 items 中某项重复），只存储 selectedId，渲染时通过 find() 获取。',
  },
  {
    key: 'travel-plan',
    title: '5. 避免深度嵌套的 state',
    description:
      '将树状结构扁平化为“表”结构：每个节点存储子节点 ID 列表，而非子节点对象本身。删除节点只需修改父级 childIds 和根表对象。',
  },
];

const demoComponents: Record<DemoKey, React.FC> = {
  'moving-dot': MovingDot,
  'feedback-form': FeedbackForm,
  'check-in-form': CheckInForm,
  menu: Menu,
  'travel-plan': TravelPlan,
};

function App() {
  const [activeDemo, setActiveDemo] = useState<DemoKey>('moving-dot');

  const ActiveComponent = demoComponents[activeDemo];
  const activeDemoInfo = demos.find((d) => d.key === activeDemo)!;

  return (
    <div className="app">
      <header className="app-header">
        <h1>选择 State 结构</h1>
        <p className="subtitle">
          构建良好的 state 可以让组件变得易于修改和调试，而不会经常出错
        </p>
      </header>

      <nav className="demo-nav">
        {demos.map((demo) => (
          <button
            key={demo.key}
            className={`nav-btn ${activeDemo === demo.key ? 'active' : ''}`}
            onClick={() => setActiveDemo(demo.key)}
          >
            {demo.title}
          </button>
        ))}
      </nav>

      <main className="demo-area">
        <div className="demo-info">
          <h2>{activeDemoInfo.title}</h2>
          <p>{activeDemoInfo.description}</p>
        </div>
        <div className="demo-content">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
}

export default App;
