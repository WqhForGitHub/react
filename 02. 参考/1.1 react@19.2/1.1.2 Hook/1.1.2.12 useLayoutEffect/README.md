# 🧠 一句话理解

> `useLayoutEffect` = **DOM 更新后 → 浏览器绘制前执行（同步阻塞）**

而：

> `useEffect` = **浏览器已经绘制完成后执行（异步）**

---

# ⏱️ 执行时机对比（核心）

React 渲染流程大致是：

```
1. 组件 render（生成虚拟 DOM）
2. React commit（更新真实 DOM）
3. ↓↓↓ 差异点
   ├─ useLayoutEffect  ← 在这里执行（阻塞绘制）
   ↓
4. 浏览器 paint（用户看到页面）
5. useEffect         ← 在这里执行（不阻塞）
```

📌 结论：

- `useLayoutEffect`：**先执行，阻塞绘制**
- `useEffect`：**后执行，不阻塞绘制**

---

# 🎯 useLayoutEffect 适合什么场景？

## 1️⃣ 读取 DOM 布局（最典型）

比如测量元素尺寸：

```jsx
useLayoutEffect(() => {
  const rect = ref.current.getBoundingClientRect();
  console.log(rect.width, rect.height);
}, []);
```

👉 必须在“用户看到 UI 之前”拿到准确尺寸，否则会闪烁。

---

## 2️⃣ 防止页面闪烁（layout shift）

例如 tooltip：

```jsx
useLayoutEffect(() => {
  const height = ref.current.offsetHeight;

  if (height > 200) {
    setPosition("bottom");
  } else {
    setPosition("top");
  }
}, []);
```

👉 如果用 `useEffect`：

- 先渲染错误位置
- 再跳一下（用户能看到闪动）

---

## 3️⃣ 同步 DOM 修改（避免 flicker）

比如手动改样式：

```jsx
useLayoutEffect(() => {
  document.body.style.backgroundColor = "black";
}, []);
```

👉 确保用户不会看到“闪一下默认颜色”。

---

# ⚠️ 不适合 useLayoutEffect 的情况

❌ 请求接口
❌ setTimeout / setInterval
❌ Redux dispatch（非 UI 同步需求）
❌ 重计算 / heavy logic

原因：

> 它是同步阻塞的，会卡住浏览器绘制，影响性能

---

# ⚡ useLayoutEffect vs useEffect 对比表

| 对比项         | useLayoutEffect    | useEffect              |
| -------------- | ------------------ | ---------------------- |
| 执行时机       | DOM 更新后、绘制前 | 绘制后                 |
| 是否阻塞 UI    | ✅ 阻塞            | ❌ 不阻塞              |
| 是否可测量 DOM | ✅ 可以            | ⚠️ 可能闪烁            |
| 性能           | 较差（慎用）       | 更好                   |
| 常见用途       | 布局计算 / 防闪烁  | 请求 / 订阅 / 业务逻辑 |

---

# 🧩 面试级总结（很重要）

你可以这样记：

> **useLayoutEffect 用来“在用户看到之前修正 UI”**

它本质做三件事：

1. DOM 已经更新
2. JS 立刻同步执行 effect
3. 再允许浏览器绘制

👉 所以它适合：

- 需要“先算再画”的 UI 场景

---

# 🚀 实战建议（非常重要）

React 官方建议：

> 👉 **能用 useEffect 就不要用 useLayoutEffect**

只有在下面情况才用：

- 防闪烁（tooltip / modal / animation）
- DOM 测量
- 强依赖布局计算
