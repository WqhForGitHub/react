# State：组件的记忆

组件通常需要根据交互更改屏幕上显示的内容。输入表单应该更新输入字段，单击轮播图上的"下一个"应该更改显示的图片，单击"购买"应该将商品放入购物车。组件需要"记住"某些东西：当前输入值、当前图片、购物车。在 React 中，这种组件特有的记忆被称为 **state**。

## 运行

```bash
npm install
npm run dev
```

## 项目结构

```
src/
├── main.tsx
├── App.tsx          # Tab 导航，4 个 demo 切换
├── App.css
├── index.css
├── vite-env.d.ts
├── data.ts          # sculptureList 数据 + Sculpture 类型
└── demos/
    ├── LocalVariableProblemDemo.tsx  # 普通变量的局限
    ├── UseStateBasicDemo.tsx         # 添加 state 变量
    ├── MultipleStateDemo.tsx         # 多个 state 变量
    └── StateIsPrivateDemo.tsx        # State 是隔离且私有的
```

## Demo 列表

### 1. 普通变量的局限

点击 "Next" 按钮后 `index` 虽然改变了，但界面不会更新。局部变量存在两个问题：
1. **局部变量无法在多次渲染中持久保存。** 当 React 再次渲染这个组件时，它会从头开始渲染——不会考虑之前对局部变量的任何更改。
2. **更改局部变量不会触发渲染。** React 没有意识到它需要使用新数据再次渲染组件。

### 2. 添加 state 变量

使用 `useState` Hook 替换局部变量，同时解决两个问题：
1. **State 变量** 用于保存渲染间的数据。
2. **State setter 函数** 更新变量并触发 React 再次渲染组件。

将 `let index = 0` 替换为 `const [index, setIndex] = useState(0)`，点击 "Next" 按钮即可切换雕塑。

### 3. 多个 state 变量

一个组件可以拥有任意多种类型的 state 变量。此组件有数字 `index` 和布尔值 `showMore` 两个 state，点击 "Show details" 会改变 `showMore` 的值。

如果它们不相关，那么存在多个 state 变量是一个好主意。但是，如果你发现经常同时更改两个 state 变量，那么最好将它们合并为一个。

### 4. State 是隔离且私有的

两个 `<Gallery />` 组件的 state 完全独立，互不影响。State 是屏幕上组件实例内部的状态，**如果你渲染同一个组件两次，每个副本都会有完全隔离的 state**！改变其中一个不会影响另一个。

与 props 不同，**state 完全私有于声明它的组件**。父组件无法更改它。这使你可以向任何组件添加或删除 state，而不会影响其他组件。

## 摘要

- 当一个组件需要在多次渲染间"记住"某些信息时使用 state 变量。
- State 变量是通过调用 `useState` Hook 来声明的。
- Hook 是以 `use` 开头的特殊函数。它们能让你 "hook" 到像 state 这样的 React 特性中。
- Hook 可能会让你想起 import：它们需要在非条件语句中调用。调用 Hook 时，包括 `useState`，仅在组件或另一个 Hook 的顶层被调用才有效。
- `useState` Hook 返回一对值：当前 state 和更新它的函数。
- 你可以拥有多个 state 变量。在内部，React 按顺序匹配它们。
- State 是组件私有的。如果你在两个地方渲染它，则每个副本都有独属于自己的 state。
