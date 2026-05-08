# 使用 Effect 进行同步

Effect 允许你在渲染结束后执行代码，将组件与 React 外部的系统相同步。

## 项目结构

```
03. 使用 Effect 进行同步/
├── src/
│   ├── demos/
│   │   ├── VideoPlayerDemo.tsx    # 视频播放器 - Effect 基础与依赖数组
│   │   ├── ChatRoomDemo.tsx       # 聊天室 - Effect 清理函数
│   │   ├── chat.ts               # 聊天连接 API 模拟
│   │   ├── PlaygroundDemo.tsx    # Playground - Effect 完整生命周期
│   │   ├── CommonPatternsDemo.tsx # 5 种常见模式
│   │   └── AntiPatternsDemo.tsx  # 不适用 Effect 的场景
│   ├── App.tsx                    # 主应用（导航切换 5 个 demo）
│   ├── App.css                    # 样式
│   ├── index.css                  # 全局样式
│   └── main.tsx                   # 入口（StrictMode 已启用）
```

## 5 个 Demo 覆盖内容

| Demo | 核心知识点 |
|------|-----------|
| **1. 视频播放器** | 为什么不能在渲染期间调用 `play()`/`pause()`；使用 Effect 与 DOM API 同步；依赖数组 `[isPlaying]` 避免不必要重新运行 |
| **2. 聊天室** | Effect 清理函数；开发环境双重挂载的原因与正确应对；切换聊天室时的清理与重连 |
| **3. Playground** | Effect 生命周期（挂载→清理→重运行）；每个 Effect 闭包捕获对应渲染的值；快速输入时 React 先清理再执行下一轮 |
| **4. 常见模式** | 管理非 React 小部件、订阅事件（退订）、触发动画（重置）、获取数据（ignore 标志）、发送分析报告 |
| **5. 不适用 Effect** | 初始化应用（组件外部）、购买操作（事件处理程序）、派生 State（渲染期间计算）、重置 State（事件处理程序） |

## 启动

```bash
npm install
npm run dev
```
