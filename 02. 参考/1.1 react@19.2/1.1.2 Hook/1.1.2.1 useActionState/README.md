# 一、基本用法（核心结构）

```js
import { useActionState } from "react";

async function updateAction(prevState, formData) {
  const name = formData.get("name");

  // 模拟请求
  await new Promise((r) => setTimeout(r, 1000));

  return {
    ...prevState,
    name,
    success: true,
  };
}

export default function App() {
  const [state, action, isPending] = useActionState(updateAction, {
    name: "",
    success: false,
  });

  return (
    <form action={action}>
      <input name="name" />
      <button type="submit">{isPending ? "提交中..." : "提交"}</button>

      <p>结果：{state.name}</p>
    </form>
  );
}
```

---

# 二、三大返回值理解

```js
const [state, action, isPending] = useActionState(...)
```

### 1️⃣ state

当前状态（类似 `useState`）

```js
state.name;
state.success;
```

---

### 2️⃣ action

一个“专门给 React 用的 dispatch 函数”

可以直接：

```jsx
<form action={action}>
```

或手动触发：

```js
startTransition(() => {
  action(formData);
});
```

---

### 3️⃣ isPending

是否正在执行 action（自动帮你管理 loading）

```js
isPending === true; // 请求中
```

---

# 三、它到底解决什么问题？

以前你要这样写：

```js
const [loading, setLoading] = useState(false);
const [data, setData] = useState(null);

async function submit(e) {
  setLoading(true);
  const res = await fetch(...);
  setData(res);
  setLoading(false);
}
```

---

### 用 useActionState 之后：

👉 自动帮你做三件事：

- 管理 state
- 管理 loading（isPending）
- 管理 action 队列（避免重复提交冲突）

---

# 四、两种常见使用方式

---

## 1️⃣ 配合 form（推荐）

```jsx
<form action={action}>
```

特点：

- 最简单
- 自动处理 submit
- 自动 transition
- 最 React 19 推荐方式

---

## 2️⃣ 手动触发

```js
startTransition(() => {
  action(formData);
});
```

适合：

- onClick
- 非 form 场景

---

# 五、action 函数的关键规则

```js
async function action(prevState, formData)
```

### 参数顺序固定：

| 参数      | 说明         |
| --------- | ------------ |
| prevState | 上一次 state |
| formData  | 表单数据     |

⚠️ 注意：不是 `(formData, prevState)`，是反过来的！

---

# 六、和 useReducer 的区别（很重要）

| 对比           | useReducer | useActionState |
| -------------- | ---------- | -------------- |
| 是否允许副作用 | ❌ 不允许  | ✅ 允许        |
| 是否适合请求   | ❌ 不适合  | ✅ 适合        |
| 是否有 loading | ❌ 没有    | ✅ isPending   |
| 设计目标       | UI 状态    | Action 状态    |

---

# 七、一个简单理解方式（重点）

你可以把它理解成：

> useState + async reducer + loading 状态 + form action 的集合体

---

# 八、使用场景总结

✔ 表单提交
✔ API 请求更新
✔ 点赞 / 收藏 / 购物车
✔ 需要 loading 状态的 action
✔ 需要自动队列处理的更新
