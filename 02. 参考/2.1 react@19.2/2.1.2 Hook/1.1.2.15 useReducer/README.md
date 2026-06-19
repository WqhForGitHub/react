# 1. 基本语法

```js
const [state, dispatch] = useReducer(reducer, initialState);
```

也可以带第三个参数（懒初始化）：

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

---

# 2. 核心概念

## （1）state

当前状态

```js
state;
```

---

## （2）dispatch

触发更新的方法（类似“发指令”）

```js
dispatch({ type: "increment" });
```

---

## （3）reducer（最关键）

一个纯函数，负责“计算下一个 state”

```js
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };

    case "decrement":
      return { count: state.count - 1 };

    default:
      return state;
  }
}
```

---

# 3. 最经典例子：计数器

```js
import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "inc":
      return { count: state.count + 1 };
    case "dec":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <h1>{state.count}</h1>

      <button onClick={() => dispatch({ type: "inc" })}>+</button>

      <button onClick={() => dispatch({ type: "dec" })}>-</button>
    </div>
  );
}
```

---

# 4. useReducer vs useState（核心区别）

## useState

适合：简单状态

```js
const [count, setCount] = useState(0);
setCount(count + 1);
```

---

## useReducer

适合：复杂状态逻辑

```js
dispatch({ type: "increment" });
```

### 更适合场景：

- 多个 state 互相影响
- 表单（多个字段）
- 状态逻辑复杂（if/switch很多）
- 状态更新需要“统一管理”

---

# 5. action 可以带参数

```js
dispatch({
  type: "add",
  payload: 5,
});
```

reducer：

```js
function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { count: state.count + action.payload };
  }
}
```

---

# 6. 初始值懒加载（重要优化）

如果初始 state 计算很重：

```js
function init(initialCount) {
  return { count: initialCount };
}

const [state, dispatch] = useReducer(reducer, 10, init);
```

👉 `init` 只会执行一次（不是每次 render）

---

# 7. 一个实战例子：表单管理

```js
function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value
  }
}

const [form, dispatch] = useReducer(reducer, {
  username: '',
  password: ''
})

<input
  onChange={(e) =>
    dispatch({
      name: 'username',
      value: e.target.value
    })
  }
/>
```

---

# 8. useReducer 的本质（非常重要）

可以理解为：

> useReducer = useState + “集中式状态更新规则”

它把：

- “怎么改 state” → reducer
- “什么时候改 state” → dispatch

---

# 9. 什么时候应该用 useReducer？

✔ 推荐用：

- 表单（多个字段）
- 复杂状态（对象/嵌套结构）
- 状态更新逻辑复杂
- 需要可维护性（类似 mini Redux）

❌ 不推荐：

- 只有一个简单数字/boolean
- setState 一行就能解决的逻辑

---

# 10. 一句话总结

> useReducer 用来把“状态更新逻辑”从组件中抽离出来，让复杂 state 更可预测、更结构化。
