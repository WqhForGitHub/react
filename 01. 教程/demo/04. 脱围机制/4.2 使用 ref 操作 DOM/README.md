# 使用 ref 操作 DOM

由于 React 会自动处理更新 DOM 以匹配渲染输出，因此你在组件中通常不需要操作 DOM。但是，有时你可能需要访问由 React 管理的 DOM 元素，例如，让一个节点获得焦点、滚动到它或测量它的尺寸和位置。在 React 中没有内置的方法来做这些事情，所以你需要一个指向 DOM 节点的 ref 来实现。

## 项目结构

```
src/
├── components/
│   ├── FocusInput.tsx              # 使文本输入框获得焦点
│   ├── ScrollToElement.tsx         # 滚动至一个元素（三张图片轮播）
│   ├── RefCallbackList.tsx         # ref 回调管理 ref 列表
│   ├── AccessAnotherComponentDOM.tsx  # 访问另一个组件的 DOM 节点
│   ├── ImperativeHandleDemo.tsx    # useImperativeHandle 暴露部分 API
│   ├── FlushSyncDemo.tsx           # flushSync 同步更新 state
│   └── BestPracticesDemo.tsx       # 最佳实践（安全 vs 不安全的 DOM 操作）
├── App.tsx                         # 主应用，含导航切换
├── App.css                         # 样式
├── index.css                       # 全局基础样式
└── main.tsx                        # 入口
```

## 7 个 Demo 对应文档中的所有知识点

| Demo | 知识点 |
|---|---|
| FocusInput.tsx | `useRef` + `ref` 属性获取 DOM 节点，调用 `focus()` |
| ScrollToElement.tsx | 多个 ref + `scrollIntoView()` 滚动到元素 |
| RefCallbackList.tsx | ref 回调函数 + Map 管理动态列表的 ref |
| AccessAnotherComponentDOM.tsx | `forwardRef` 将 ref 传递给子组件 |
| ImperativeHandleDemo.tsx | `useImperativeHandle` 限制暴露的 API |
| FlushSyncDemo.tsx | `flushSync` 强制同步更新 DOM 后再操作 |
| BestPracticesDemo.tsx | 安全操作 vs 手动删除 DOM 导致崩溃 |

## 运行方式

```bash
npm run dev
```
