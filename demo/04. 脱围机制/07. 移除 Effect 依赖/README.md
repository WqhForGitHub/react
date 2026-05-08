# 移除 Effect 依赖

当编写 Effect 时，linter 会验证是否已经将 Effect 读取的每一个响应式值（如 props 和 state）包含在 Effect 的依赖中。这可以确保 Effect 与组件的 props 和 state 保持同步。不必要的依赖可能会导致 Effect 运行过于频繁，甚至产生无限循环。

## 项目结构

```
src/
├── main.tsx                          # 入口
├── index.css                         # 全局样式
├── App.tsx                           # 导航 + 路由
├── utils/
│   └── chat.ts                       # 模拟聊天连接工具
└── demos/
    ├── Demo01DependencyMatching.tsx   # 依赖应该和代码保持一致
    ├── Demo02MoveToEventHandler.tsx   # 代码应该移到事件处理程序中吗？
    ├── Demo03SplitEffects.tsx         # 拆分不相关的 Effect
    ├── Demo04UpdaterFunction.tsx      # 使用更新函数移除依赖
    ├── Demo05EffectEvent.tsx          # 使用 Effect Event 读取值而不"反应"
    └── Demo06ObjectDependency.tsx     # 避免对象和函数作为依赖
```

## Demo 说明

| Demo | 知识点 | 说明 |
|------|--------|------|
| 01 | 依赖应该和代码保持一致 | 正确声明 `[roomId]` 依赖，Effect 随 props 变化重新运行 |
| 02 | 代码应移到事件处理程序 | 对比错误（Effect 处理提交）与正确（事件处理程序中提交），展示切换主题时前者重复执行的 bug |
| 03 | 拆分不相关的 Effect | 国家→城市、城市→区域两个独立同步过程拆为两个 Effect |
| 04 | 使用更新函数移除依赖 | 用 `setMessages(msgs => [...msgs, new])` 代替直接读取 `messages`，避免它成为依赖 |
| 05 | Effect Event 读取最新值 | 用 `useEffectEvent` 包裹非响应式逻辑，`isMuted` 变化不再触发重新连接 |
| 06 | 避免对象/函数作为依赖 | 展示对象每次渲染重新创建导致 Effect 频繁重同步，解决方案：移入 Effect 内、提取原始值 |

## 启动

```bash
npm install
npm run dev
```
