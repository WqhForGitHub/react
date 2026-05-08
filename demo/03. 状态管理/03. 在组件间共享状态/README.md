# 在组件间共享状态

有时候，你希望两个组件的状态始终同步更改。要实现这一点，可以将相关 state 从这两个组件上移除，并把 state 放到它们的公共父级，再通过 props 将 state 传递给这两个组件。这被称为"状态提升"，这是编写 React 代码时常做的事。

## 项目结构

- `src/App.tsx` - 主组件，包含 `Accordion` 和 `Panel` 的状态提升实现
- `src/App.css` - 面板样式
- `src/index.css` - 全局样式

## 核心实现

`App.tsx` 完整演示了"状态提升"的三步过程：

1. **从子组件中移除状态** - `Panel` 组件不再自己管理 `isActive` 状态，而是通过 `props` 接收 `isActive` 和 `onShow` 回调，成为受控组件
2. **从公共父组件传递硬编码数据** - `Accordion` 作为最近的公共父组件，负责向两个 `Panel` 传递 `isActive`
3. **为公共父组件添加状态** - `Accordion` 持有 `activeIndex` 状态，通过 `activeIndex === 0` / `activeIndex === 1` 控制两个面板的激活状态，并向下传递 `onShow` 事件处理函数，确保同一时间只有一个面板展开

### 关键代码

```tsx
// 受控组件：Panel 通过 props 接收 isActive 和 onShow
function Panel({ title, children, isActive, onShow }: PanelProps) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={onShow}>显示</button>
      )}
    </section>
  );
}

// 公共父组件：持有 activeIndex 状态，协调两个 Panel
export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="accordion">
      <h2>哈萨克斯坦，阿拉木图</h2>
      <Panel
        title="关于"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        阿拉木图人口约200万，是哈萨克斯坦最大的城市。它在 1929 年到 1997 年间都是首都。
      </Panel>
      <Panel
        title="词源"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        这个名字来自于 <span lang="kk-KZ">алма</span>，哈萨克语中"苹果"的意思...
      </Panel>
    </div>
  );
}
```

## 运行方式

```bash
npm install
npm run dev
```

## 要点总结

- 当你想要整合两个组件时，将它们的 state 移动到共同的父组件中
- 然后在父组件中通过 `props` 把信息传递下去
- 最后，向下传递事件处理程序，以便子组件可以改变父组件的 state
- 考虑该将组件视为"受控"（由 prop 驱动）或是"不受控"（由 state 驱动）是十分有益的
