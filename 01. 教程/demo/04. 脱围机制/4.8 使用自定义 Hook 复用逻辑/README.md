# React 自定义 Hook Demo

基于 [React 官方文档 - 复用逻辑 with 自定义 Hook](https://zh-hans.react.dev/learn/reusing-logic-with-custom-hooks) 实现的交互式示例项目。

## 项目结构

```
src/
├── hooks/
│   ├── useOnlineStatus.js   # 使用 useSyncExternalStore 追踪网络状态
│   ├── useFormInput.js      # 封装表单输入的 state 和 onChange
│   ├── useChatRoom.js       # 管理聊天室连接的 Effect
│   ├── useFadeIn.js         # 淡入动画 Hook
│   ├── animation.js         # FadeInAnimation 类，动画逻辑
│   └── chat.js              # createConnection 模拟聊天连接
├── demos/
│   ├── OnlineStatusDemo.jsx # 在线状态演示
│   ├── FormInputDemo.jsx    # 表单输入演示
│   ├── ChatRoomDemo.jsx     # 聊天室连接演示
│   └── FadeInDemo.jsx       # 淡入动画演示
├── App.jsx                  # 主应用，带导航切换
├── App.css
├── index.css
└── main.jsx
```

## Demo 概览

- **useOnlineStatus** - 两个组件（StatusBar + SaveButton）共享在线状态逻辑，切换网络可观察更新
- **useFormInput** - 两个输入框各自独立调用 Hook，演示"共享逻辑而非共享状态"
- **useChatRoom** - 切换聊天室/服务器 URL 时 Effect 自动重连，消息实时显示在界面上
- **useFadeIn** - 点击 Show 后 Welcome 文字从透明渐变到不透明，动画逻辑提取到类中

## 启动

```bash
npm install
npm run dev
```
