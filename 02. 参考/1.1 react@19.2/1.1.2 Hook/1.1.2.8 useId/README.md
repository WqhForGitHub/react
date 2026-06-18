# 🧠 useId 是做什么的？

一句话：

> `useId()` 用来生成“跨客户端 + 服务端一致”的唯一 ID。

它解决的问题是：

- ❌ 手写 id（容易重复）
- ❌ `Math.random()`（SSR 会不一致）
- ❌ useState / useRef 自己写计数器（可能 hydration 不一致）

React 官方设计它的核心目标是：
👉 **SSR + CSR 渲染 id 必须一致**

([usereactjs.com][1])

---

# ⚙️ 基本用法

```jsx
import { useId } from "react";

function Input() {
  const id = useId();

  return (
    <>
      <label htmlFor={id}>用户名</label>
      <input id={id} />
    </>
  );
}
```

---

# 🔗 常见使用场景（非常重要）

## 1️⃣ 表单 label 关联 input（最常用）

```jsx
function PasswordField() {
  const id = useId();

  return (
    <>
      <label htmlFor={id}>密码</label>
      <input type="password" id={id} />
    </>
  );
}
```

👉 避免多个组件重复 id

---

## 2️⃣ aria 无障碍属性（推荐）

```jsx
function Tooltip() {
  const id = useId();

  return (
    <>
      <button aria-describedby={id}>说明</button>
      <p id={id}>这是提示信息</p>
    </>
  );
}
```

👉 screen reader 会正确读取

---

## 3️⃣ 一个 useId 派生多个 id（推荐写法）

```jsx
const id = useId();

const inputId = `${id}-input`;
const errorId = `${id}-error`;
```

👉 不要在同一个组件里多次 useId（没必要）

---

# 🚫 不能用 useId 的地方

## ❌ 1. 不能当 React key

```jsx
items.map((item) => <div key={useId()} />); // ❌ 错
```

原因：

- Hooks 不能在循环里调用
- key 必须来自数据（id / uuid）

---

## ❌ 2. 不能当业务唯一 ID

比如：

```js
const orderId = useId(); // ❌ 不推荐
```

原因：

- 它是“UI 标识”，不是业务 ID

---

# ⚠️ useId 的特点（重点理解）

## 1️⃣ SSR 一致性

- server render 和 client hydrate 必须一致
- React 内部保证生成规则一致

👉 防止 hydration mismatch

([usereactjs.com][1])

---

## 2️⃣ 稳定性

- 同一个组件实例 → ID 不变
- 重新 mount → ID 会变

---

## 3️⃣ 不能条件调用

```jsx
if (x) {
  const id = useId(); // ❌ 错
}
```

---

# useId vs 其他方案

| 方法         | 是否推荐  | 问题                 |
| ------------ | --------- | -------------------- |
| useId        | ✅ 推荐   | React 专用、SSR 安全 |
| Math.random  | ❌ 不推荐 | SSR 不一致           |
| uuid         | ⚠️ 可用   | 可能 SSR mismatch    |
| 自增 counter | ⚠️ 可用   | 多实例冲突风险       |

---

# 💡 最佳实践总结

✔ 用于：

- label / input 关联
- aria-labelledby / aria-describedby
- 组件内部唯一 DOM id

❌ 不用于：

- key
- 数据 ID
- 业务主键
- 列表生成
