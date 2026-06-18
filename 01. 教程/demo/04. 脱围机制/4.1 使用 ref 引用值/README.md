# 使用 ref 引用值

当你希望组件记住某些信息，但又不想让这些信息触发新的渲染时，你可以使用 **ref**。

## 项目结构

```
src/
├── components/
│   ├── RefCounter.tsx      # ref 计数器 - 变更 ref.current 不触发重新渲染
│   ├── Stopwatch.tsx        # 秒表 - ref + state 结合使用
│   └── StateCounter.tsx     # state 计数器 - 与 ref 对比，含对比表格
├── App.tsx                  # 主组件，组织三个 demo
├── App.css                  # 样式
├── index.css                # 全局基础样式
└── main.tsx                 # 入口
```

## 三个 Demo 展示的核心内容

1. **RefCounter** - 点击按钮通过 `ref.current` 递增计数，但页面不会重新渲染，只有 alert 显示次数。直观体验 ref 的核心特性：变更不触发渲染。

2. **Stopwatch** - 秒表组件，将需要渲染的信息（`startTime`、`now`）存入 state，将仅事件处理器需要的 interval ID 存入 ref。展示了 ref 和 state 的协作场景。

3. **StateCounter** - 用 state 实现的计数器，页面上数字实时更新。附带 ref vs state 对比表格，从变更触发渲染、可变性、渲染期间读取、更新时机四个维度对比。

## 启动

```bash
npm run dev
```
