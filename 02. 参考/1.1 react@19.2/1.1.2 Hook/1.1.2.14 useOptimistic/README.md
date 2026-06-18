# 🧠 一句话理解

👉 `useOptimistic` = **“先假装成功更新 UI，等服务器结果回来再校准”**

---

# 📦 基本语法

```js
const [optimisticState, addOptimistic] = useOptimistic(
  state,
  (currentState, optimisticValue) => {
    // 返回“乐观后的新状态”
  },
);
```

或者简单版：

```js
const [optimisticState, addOptimistic] = useOptimistic(state);
```

---

# ⚙️ 核心思想

它解决的问题是：

> 在请求还没完成时，UI 不要“卡住等结果”，而是先更新一个“临时结果”。

比如：

- 点赞 👍
- 发送评论 💬
- 加入购物车 🛒
- 切换关注 👤

---

# 🚀 最简单例子（点赞）

```jsx
import { useOptimistic, useState, startTransition } from "react";

export default function LikeButton() {
  const [likes, setLikes] = useState(0);

  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (current) => current + 1,
  );

  async function handleLike() {
    startTransition(async () => {
      // 1️⃣ 先做“假更新”
      addOptimisticLike();

      // 2️⃣ 再请求服务器
      await fetch("/api/like", { method: "POST" });

      // 3️⃣ 最终以真实数据为准
      setLikes((l) => l + 1);
    });
  }

  return <button onClick={handleLike}>👍 {optimisticLikes}</button>;
}
```

---

# 🧩 关键点解释

## 1️⃣ optimisticState（展示用）

```js
optimisticLikes;
```

👉 UI 实际显示的是它
👉 可能比真实 state “超前一步”

---

## 2️⃣ setOptimistic（临时更新）

```js
addOptimisticLike();
```

👉 只影响当前“正在进行的 action”
👉 不会真正改变服务器数据

---

## 3️⃣ state（真实数据）

```js
likes;
```

👉 来自服务器 / 数据源
👉 是最终“权威结果”

---

# 🔥 使用场景（非常重要）

## 👍 1. 点赞 / 收藏

```js
addOptimistic((prev) => prev + 1);
```

---

## 💬 2. 评论列表（最常见）

```js
const [optimisticComments, addComment] = useOptimistic(
  comments,
  (state, newComment) => [...state, newComment],
);
```

---

## 👤 3. 关注/取关

```js
(state, follow) => ({
  ...state,
  isFollowing: follow,
});
```

---

# 🧠 高级用法（Reducer 版本）

适合复杂数据（比如列表增删改）

```js
const [optimisticTodos, dispatch] = useOptimistic(todos, (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.todo];
    case "delete":
      return state.filter((t) => t.id !== action.id);
    default:
      return state;
  }
});
```

调用：

```js
dispatch({ type: "add", todo: { id: 1, text: "learn React" } });
```

---

# ⚠️ 常见坑

## ❌ 1. 必须在 Action / Transition 里用

否则会报错：

> “outside a Transition or Action”

✔ 正确：

```js
startTransition(() => {
  addOptimisticLike();
});
```

---

## ❌ 2. 它不是 state 替代品

它只是：

> UI 层的“临时视图”

真实数据仍然要靠 `useState / server data`

---

## ❌ 3. 不处理网络失败逻辑

如果请求失败，你需要自己回滚或提示

---

# useState 区别

| 对比               | useState | useOptimistic    |
| ------------------ | -------- | ---------------- |
| 数据来源           | 真实数据 | 临时 UI 数据     |
| 是否立即更新 UI    | 是       | 是（但是假数据） |
| 是否适合异步请求   | 一般     | 非常适合         |
| 是否自动同步服务器 | 否       | 否（需你处理）   |

---

# 💡 真实理解模型（很重要）

你可以把它理解成：

> 🧠 “UI 分裂成两层”

- 真实层（server state）
- 幻觉层（optimistic state）

React 自动帮你管理“幻觉层的生命周期”

---

# 🚀 一句话总结

👉 `useOptimistic` = **让 UI 先变快一步，再等真实数据纠正**
