# 将事件从 Effect 中分开

Separating Events from Effects — React 官方文档示例 Demo

## 启动

```bash
npm install
npm run dev
```

## 项目结构

| 文件 | 说明 |
|---|---|
| `src/chat.ts` | 模拟聊天连接工具（createConnection / sendMessage） |
| `src/notification.ts` | 通知工具（showNotification，基于 toastify-js） |
| `src/useEffectEvent.ts` | `useEffectEvent` polyfill（实验性 Hook） |
| `src/demos/Demo1_ChatRoom.tsx` | 事件处理函数 vs Effect — 发送消息用事件处理函数，连接聊天室用 Effect |
| `src/demos/Demo2_ThemeProblem.tsx` | 问题 — theme 作为依赖项导致切换主题时聊天重连 |
| `src/demos/Demo3_EffectEventSolution.tsx` | 解决方案 — 使用 useEffectEvent 提取非响应式逻辑，切换主题不再重连 |
| `src/demos/Demo4_PointerStale.tsx` | 问题 — 抑制依赖检查导致 canMove 过期值 bug（点无法停止跟随光标） |
| `src/demos/Demo5_PointerEffectEvent.tsx` | 解决方案 — useEffectEvent 修复过期值问题 |
| `src/demos/Demo6_PageVisit.tsx` | Effect Event 读取最新 props/state — logVisit 只响应 url 变化，不响应购物车数量变化 |
| `src/App.tsx` | 主入口，顶部 Tab 导航切换 6 个 Demo |

## 核心要点

- 事件处理函数内部的逻辑是**非响应式的**，只在用户交互时运行
- Effect 内部的逻辑是**响应式的**，依赖项变化时自动重新运行
- `useEffectEvent` 可以将 Effect 中的非响应式逻辑提取出来，始终读取最新值但不触发重新同步
- **永远不要抑制依赖检查**，用 useEffectEvent 替代

## 技术栈

React + TypeScript + Vite
