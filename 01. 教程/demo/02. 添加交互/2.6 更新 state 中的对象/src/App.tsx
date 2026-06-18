import { useState, type ComponentType } from 'react';
import './App.css';
import MovingDotMutationDemo from './demos/MovingDotMutationDemo';
import MovingDotCorrectDemo from './demos/MovingDotCorrectDemo';
import FormSpreadDemo from './demos/FormSpreadDemo';
import FormDynamicDemo from './demos/FormDynamicDemo';
import NestedObjectDemo from './demos/NestedObjectDemo';
import ImmerDemo from './demos/ImmerDemo';

interface DemoItem {
  key: string;
  label: string;
  component: ComponentType;
  description: string;
}

const DEMOS: DemoItem[] = [
  {
    key: 'mutation',
    label: '直接修改 state（错误）',
    component: MovingDotMutationDemo,
    description:
      '直接修改 state 中的对象（mutation）不会触发重新渲染。红点不会跟随指针移动，因为 React 不知道对象已被更改。',
  },
  {
    key: 'correct',
    label: '创建新对象（正确）',
    component: MovingDotCorrectDemo,
    description:
      '创建一个新对象并传递给 state 设置函数，React 会知道 state 已更改并触发重新渲染。红点会跟随指针移动。',
  },
  {
    key: 'spread',
    label: '展开语法复制对象',
    component: FormSpreadDemo,
    description:
      '使用 ... 展开语法复制对象中其他字段，只覆盖需要修改的字段，避免手动逐个复制每个属性。',
  },
  {
    key: 'dynamic',
    label: '动态属性名',
    component: FormDynamicDemo,
    description:
      '使用 [e.target.name] 动态属性名，用一个事件处理函数即可更新表单中的多个字段，而不需要为每个字段单独编写处理函数。',
  },
  {
    key: 'nested',
    label: '更新嵌套对象',
    component: NestedObjectDemo,
    description:
      '更新嵌套对象时，需要从更新的位置开始自底向上为每一层都创建新的拷贝。展开语法是浅拷贝，只复制一层。',
  },
  {
    key: 'immer',
    label: '使用 Immer',
    component: ImmerDemo,
    description:
      'Immer 让你可以像直接修改对象一样编写代码，它会自动帮你处理好复制的过程。特别适合有多层嵌套的 state。',
  },
];

export default function App() {
  const [activeKey, setActiveKey] = useState(DEMOS[0].key);
  const active = DEMOS.find((d) => d.key === activeKey) ?? DEMOS[0];
  const ActiveComponent = active.component;

  return (
    <div className="app">
      <h1>更新 state 中的对象</h1>
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
