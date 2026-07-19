# 迁移状态逻辑至 Reducer 中

对于拥有许多状态更新逻辑的组件来说，过于分散的事件处理程序可能会令人不知所措。对于这种情况，你可以将组件的所有状态更新逻辑整合到一个外部函数中，这个函数叫作 **reducer**。

## 项目结构

```
05. 迁移状态逻辑至 Reducer 中/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── AddTask.tsx        # 添加任务表单
│   │   └── TaskList.tsx       # 任务列表（含编辑、删除、勾选）
│   ├── demos/
│   │   ├── UseStateDemo.tsx   # useState 版本演示
│   │   └── UseReducerDemo.tsx # useReducer 版本演示
│   ├── types.ts               # Task 类型、TaskAction 类型、initialTasks
│   ├── tasksReducer.ts        # reducer 函数（added/changed/deleted）
│   ├── App.tsx                # 主应用，tab 切换两个 demo
│   ├── App.css                # 组件样式
│   ├── index.css              # 全局样式（含暗色模式）
│   ├── main.tsx               # 入口
│   └── vite-env.d.ts
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── eslint.config.js
```

## 关键演示对比

- **useState 版本** (`UseStateDemo.tsx`)：三个事件处理函数 `handleAddTask`、`handleChangeTask`、`handleDeleteTask` 各自包含 `setTasks` 状态更新逻辑
- **useReducer 版本** (`UseReducerDemo.tsx`)：事件处理函数只 `dispatch` action，状态更新逻辑集中在 `tasksReducer.ts` 中

## 运行

```bash
npm install
npm run dev
```

## 参考

- [React 官方文档 - 迁移状态逻辑至 Reducer 中](https://zh-hans.react.dev/learn/extracting-state-logic-into-a-reducer)

下面我用**通俗 + 代码 + 对比表**给你彻底讲清楚 👇

---

# 一、`useReducer` 怎么用？

先看最小可运行例子：

```tsx
import { useReducer } from "react";

// 1. 定义 reducer（核心逻辑）
function reducer(state: number, action: { type: string }) {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
}

export default function Counter() {
  // 2. 使用 useReducer
  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <>
      <p>{count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </>
  );
}
```

### 核心理解（三步）：

1. **state**：当前状态
2. **dispatch(action)**：触发更新
3. **reducer(state, action)**：决定怎么更新

👉 流程是：

```
用户操作 → dispatch(action) → reducer → 返回新 state → 重新渲染
```

👉 和 Redux 思想一模一样（简化版）

---

# 二、`useState` vs `useReducer` 本质区别

## 1️⃣ 最核心一句话

- `useState`：**直接改状态**
- `useReducer`：**通过“规则”改状态**

---

## 2️⃣ 对比表（非常关键）

| 对比点   | useState   | useReducer         |
| -------- | ---------- | ------------------ |
| 使用难度 | 简单       | 较复杂             |
| 状态更新 | 直接 set   | dispatch + reducer |
| 适合场景 | 简单状态   | 复杂状态           |
| 逻辑位置 | 写在组件里 | 抽离到 reducer     |
| 可维护性 | 一般       | 更好               |
| 可测试性 | 较差       | 更好               |

👉 官方也强调：

- 简单 → 用 `useState`
- 复杂 → 用 `useReducer` ([前端达人][1])

---

## 3️⃣ 举个直观对比

### 👉 用 `useState`（简单）

```tsx
const [count, setCount] = useState(0);

setCount(count + 1);
```

---

### 👉 用 `useReducer`（结构化）

```tsx
dispatch({ type: "increment" });
```

👉 更新逻辑集中在 reducer：

```tsx
function reducer(state, action) {
  if (action.type === "increment") return state + 1;
}
```

---

# 三、什么时候用 useReducer？

这是面试最爱问的👇

## ✅ 适合 useReducer 的场景

### 1️⃣ 多个状态互相影响

```ts
{
  loading: boolean,
  data: any,
  error: string
}
```

👉 这种用 `useState` 会乱

---

### 2️⃣ 状态更新逻辑复杂

比如：

- 表单（10+字段）
- 多步骤流程（step1 → step2 → step3）
- 状态机逻辑

---

### 3️⃣ 多个地方修改同一个 state

👉 reducer 可以统一管理

---

### 4️⃣ 想要“像 Redux 一样”

- action
- reducer
- dispatch

👉 更规范、更可维护 ([Vishal Garg][2])

---

## ❌ 不要乱用 useReducer

👉 官方一句话很经典：

> 用 useReducer 管简单状态，就像“用推土机种花” ([SISL.PL][3])

---

# 四、一个真实对比（强烈建议看）

## ❌ 用 useState（混乱版）

```tsx
const [name, setName] = useState("");
const [age, setAge] = useState(0);
const [error, setError] = useState("");
```

👉 逻辑分散

---

## ✅ 用 useReducer（清晰版）

```tsx
function reducer(state, action) {
  switch (action.type) {
    case "setName":
      return { ...state, name: action.payload };
    case "setAge":
      return { ...state, age: action.payload };
    case "error":
      return { ...state, error: action.payload };
  }
}

const [state, dispatch] = useReducer(reducer, {
  name: "",
  age: 0,
  error: "",
});
```

👉 所有逻辑集中一个地方 ✅

---

# 五、一个更深层理解（很重要）

React 官方总结：

- `useState`：代码更少，简单直观
- `useReducer`：**把“怎么更新”从组件里抽出来** ([React][4])

👉 这点非常关键：

```
useState = 写结果
useReducer = 写规则
```

---

# 六、面试总结（直接背）

👉 一句话回答：

> useState 适合简单状态；useReducer 适合复杂状态和集中管理更新逻辑。

👉 再补一句加分：

> useReducer 可以让状态变化更可预测、更易维护，尤其在复杂业务中。
