# 响应事件

使用 React 可以在 JSX 中添加事件处理函数。其中事件处理函数为自定义函数，它将在响应交互（如点击、悬停、表单输入框获得焦点等）时触发。

## 运行

```bash
npm install
npm run dev
```

## 项目结构

```
src/
├── main.tsx
├── App.tsx          # Tab 导航，7 个 demo 切换
├── App.css
├── index.css
├── vite-env.d.ts
└── demos/
    ├── AddEventHandlerDemo.tsx    # 添加事件处理函数
    ├── ReadPropsDemo.tsx          # 在事件处理函数中读取 props
    ├── PassHandlerAsPropsDemo.tsx # 将事件处理函数作为 props 传递
    ├── NamingHandlerPropsDemo.tsx # 命名事件处理函数 prop
    ├── EventPropagationDemo.tsx   # 事件传播（冒泡）
    ├── StopPropagationDemo.tsx    # 阻止传播
    └── PreventDefaultDemo.tsx     # 阻止默认行为
```

## Demo 列表

### 1. 添加事件处理函数

`handleClick` 定义与传递、内联箭头函数写法。

### 2. 读取 props

`AlertButton` 通过 `message` prop 定制弹窗内容。

### 3. 传递处理函数

`PlayButton` / `UploadButton` 将不同 `onClick` 传入通用 `Button`。

### 4. 命名事件处理函数 prop

自定义 `onSmash` 命名 + `onPlayMovie` / `onUploadImage` 应用级命名。

### 5. 事件传播

可视化事件冒泡，带日志面板记录事件触发顺序。

### 6. 阻止传播

`e.stopPropagation()` 效果演示，带日志面板对比。

### 7. 阻止默认行为

表单提交默认重新加载 vs `e.preventDefault()` 阻止，附说明区分两者。

## 摘要

- 你可以通过将函数作为 prop 传递给元素如 `<button>` 来处理事件。
- 必须传递事件处理函数，**而非函数调用！** `onClick={handleClick}` ，不是 `onClick={handleClick()}`。
- 你可以单独或者内联定义事件处理函数。
- 事件处理函数在组件内部定义，所以它们可以访问 props。
- 你可以在父组件中定义一个事件处理函数，并将其作为 prop 传递给子组件。
- 你可以根据特定于应用程序的名称定义事件处理函数的 prop。
- 事件会向上传播。通过事件的第一个参数调用 `e.stopPropagation()` 来防止这种情况。
- 事件可能具有不需要的浏览器默认行为。调用 `e.preventDefault()` 来阻止这种情况。
- 从子组件显式调用事件处理函数 prop 是事件传播的另一种优秀替代方案。
