# 对 state 进行保留和重置

各个组件的 state 是各自独立的。根据组件在 UI 树中的位置，React 可以跟踪哪些 state 属于哪个组件。你可以控制在重新渲染过程中何时对 state 进行保留和重置。

### 你将会学习到

- React 何时选择保留或重置状态
- 如何强制 React 重置组件的状态
- 键和类型如何影响状态是否被保留

## 状态与渲染树中的位置相关 

React 会为 UI 中的组件结构构建 [渲染树](https://zh-hans.react.dev/learn/understanding-your-ui-as-a-tree#the-render-tree)。

当向一个组件添加状态时，那么可能会认为状态“存在”在组件内。但实际上，状态是由 React 保存的。React 通过组件在渲染树中的位置将它保存的每个状态与正确的组件关联起来。

下面的例子中只有一个 `<Counter />` JSX 标签，但它会在两个不同的位置渲染：

```jsx
import { useState } from 'react';

export default function App() {
  const counter = <Counter />;
  return (
    <div>
      {counter}
      {counter}
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        加一
      </button>
    </div>
  );
}

```

