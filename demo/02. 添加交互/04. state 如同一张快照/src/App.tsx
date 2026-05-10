import { useState, type ComponentType } from 'react';
import './App.css';
import SendFormDemo from './demos/SendFormDemo';
import CounterPlusThreeDemo from './demos/CounterPlusThreeDemo';
import DelayedAlertDemo from './demos/DelayedAlertDemo';
import MessageFormDemo from './demos/MessageFormDemo';

interface DemoItem {
  key: string;
  label: string;
  component: ComponentType;
  description: string;
}

const DEMOS: DemoItem[] = [
  {
    key: 'send-form',
    label: '设置 state 触发渲染',
    component: SendFormDemo,
    description:
      '当你按下 "Send" 时，setIsSent(true) 会通知 React 重新渲染 UI。React 根据新的 isSent 值重新渲染组件，展示不同的界面。',
  },
  {
    key: 'counter-plus-three',
    label: 'state 在渲染中是快照',
    component: CounterPlusThreeDemo,
    description:
      '点击 "+3" 按钮时，三次 setNumber(number + 1) 都基于当前渲染中 number 的值（0），所以结果只递增了 1 而不是 3。设置 state 只会为下一次渲染变更 state 的值。',
  },
  {
    key: 'delayed-alert',
    label: '随时间变化的 state',
    component: DelayedAlertDemo,
    description:
      '点击 "+5" 后，即使 3 秒后 alert 才触发，提示框中显示的仍然是点击时的 number 值（0），而不是更新后的值（5）。一个 state 变量的值永远不会在一次渲染的内部发生变化。',
  },
  {
    key: 'message-form',
    label: 'state 快照的实际应用',
    component: MessageFormDemo,
    description:
      '按下"发送"后，即使 5 秒内修改了收件人，alert 仍会显示提交时的收件人。React 会使 state 的值始终"固定"在一次渲染的各个事件处理函数内部。',
  },
];

export default function App() {
  const [activeKey, setActiveKey] = useState(DEMOS[0].key);
  const active = DEMOS.find((d) => d.key === activeKey) ?? DEMOS[0];
  const ActiveComponent = active.component;

  return (
    <div className="app">
      <h1>State 如同一张快照</h1>
      <nav className="tab-bar">
        {DEMOS.map((d) => (
          <button
            key={d.key}
            className={activeKey === d.key ? 'active' : ''}
            onClick={() => setActiveKey(d.key)}
          >
            {d.label}
          </button>
        ))}
      </nav>
      <div className="demo-section">
        <p>{active.description}</p>
        <div className="demo-box">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
}
