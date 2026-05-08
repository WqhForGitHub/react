# 你可能不需要 Effect

Effect 是 React 范式中的一种脱围机制。它们让你可以 "逃出" React 并使组件和一些外部系统同步。如果没有涉及到外部系统，你就不应该使用 Effect。移除不必要的 Effect 可以让你的代码更容易理解，运行得更快，并且更少出错。

## 启动

```bash
npm install
npm run dev
```

## 项目结构

```
src/
├── main.tsx                           # 入口文件
├── index.css                          # 全局样式重置
├── App.tsx                            # 主应用，左侧导航 + 内容区
├── App.css                            # 应用样式
└── components/
    ├── CalculateDuringRender.tsx       # 1. 根据 props/state 更新 state
    ├── CachingExpensiveCalculation.tsx # 2. 缓存昂贵的计算 (useMemo)
    ├── ResetStateWithKey.tsx           # 3. 用 key 重置所有 state
    ├── AdjustStateDuringRender.tsx     # 4. 当 prop 变化时调整部分 state
    ├── SharedEventHandlerLogic.tsx     # 5. 在事件处理函数中共享逻辑
    ├── PostRequestDemo.tsx             # 6. 发送 POST 请求
    ├── ChainedEffects.tsx              # 7. 避免链式 Effect
    ├── AppInitialization.tsx           # 8. 初始化应用
    ├── NotifyParentDemo.tsx            # 9. 通知父组件 state 变化
    ├── SubscribeExternalStore.tsx      # 10. 订阅外部 store (useSyncExternalStore)
    └── DataFetchingDemo.tsx            # 11. 获取数据 (竞态条件 + 自定义 Hook)
```

## 设计模式

每个组件都采用 **左右对比** 的布局：

- **左侧（红色边框）**：反面模式，展示不应该使用 Effect 的场景
- **右侧（绿色边框）**：正确做法，展示推荐的替代方案

## 11 个场景覆盖

| # | 场景 | 关键点 |
|---|------|--------|
| 1 | 根据 props/state 更新 state | 渲染期间直接计算，不需要额外 state |
| 2 | 缓存昂贵计算 | `useMemo` 替代 Effect，打开控制台可验证 |
| 3 | 重置所有 state | `key` 变化让 React 重新创建组件 |
| 4 | 调整部分 state | 存 ID 而非完整对象，渲染期间计算 |
| 5 | 共享事件逻辑 | 提取函数在事件处理函数中调用 |
| 6 | POST 请求 | 分析请求用 Effect，用户操作用事件处理函数 |
| 7 | 链式 Effect | 渲染期间计算 + 事件处理函数一次性更新，观察渲染次数差异 |
| 8 | 初始化应用 | 顶层变量或模块顶层代码，避免开发环境双执行 |
| 9 | 通知父组件 | 同一事件处理函数中更新，或状态提升 |
| 10 | 订阅外部 store | `useSyncExternalStore` 替代手动 Effect 订阅 |
| 11 | 获取数据 | 清除函数避免竞态条件，提取自定义 Hook |

## 核心原则

- 如果你可以**在渲染期间计算**某些内容，则不需要使用 Effect
- 想要缓存昂贵的计算，请使用 `useMemo` 而不是 `useEffect`
- 想要重置整个组件树的 state，请传入不同的 `key`
- 想要在 prop 变化时重置某些特定的 state，请在渲染期间处理
- 组件**显示**时就需要执行的代码应该放在 Effect 中，否则应该放在事件处理函数中
- 如果你需要更新多个组件的 state，最好在单个事件处理函数中处理
- 当你尝试在不同组件中同步 state 变量时，请考虑状态提升
- 你可以使用 Effect 获取数据，但你需要实现清除逻辑以避免竞态条件
