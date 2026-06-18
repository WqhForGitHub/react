# 1. useEffect 是干什么的？

React 官方定义：
👉 用来**让组件和外部系统同步**（比如 API、DOM、订阅、定时器等）([React][1])

常见用途：

- 请求数据（fetch / axios）
- 添加 / 移除事件监听
- 设置定时器（setInterval / setTimeout）
- 操作 DOM
- 订阅 WebSocket / 第三方库

---

# 2. 基本语法

```js
useEffect(() => {
  // 副作用逻辑

  return () => {
    // 清理逻辑（可选）
  };
}, [dependencies]);
```

---

# 3. 执行时机（非常重要）

## （1）没有依赖数组

```js
useEffect(() => {
  console.log("每次 render 后都会执行");
});
```

👉 每次组件重新渲染都会执行

---

## （2）空依赖数组 []

```js
useEffect(() => {
  console.log("只在首次挂载执行一次");
}, []);
```

👉 类似 `componentDidMount`

---

## （3）有依赖数组

```js
useEffect(() => {
  console.log("count 变化时执行");
}, [count]);
```

👉 依赖项变化才执行（任意一个变化都会触发）

---

# 4. 清理函数（cleanup）

用于避免内存泄漏：

```js
useEffect(() => {
  const timer = setInterval(() => {
    console.log("tick");
  }, 1000);

  return () => {
    clearInterval(timer);
  };
}, []);
```

👉 组件卸载时会执行 cleanup
👉 或依赖变化前先执行 cleanup

---

# 5. 经典应用场景

## ① 数据请求

```js
useEffect(() => {
  async function fetchData() {
    const res = await fetch("/api/user");
    const data = await res.json();
    setUser(data);
  }

  fetchData();
}, []);
```

---

## ② 监听窗口事件

```js
useEffect(() => {
  const handleResize = () => {
    console.log(window.innerWidth);
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
```

---

## ③ 订阅 / WebSocket

```js
useEffect(() => {
  const ws = new WebSocket("ws://localhost:3000");

  ws.onmessage = (msg) => {
    console.log(msg.data);
  };

  return () => ws.close();
}, []);
```

---

# 6. 常见坑（非常关键）

## ❌ 1. 忘记依赖数组

```js
useEffect(() => {
  // 会每次 render 都执行
});
```

👉 容易性能问题 / 死循环

---

## ❌ 2. 在 effect 里做“本来可以 render 计算的事情”

```js
useEffect(() => {
  setFullName(first + last);
}, [first, last]);
```

👉 ❌ 不推荐
👉 应该直接：

```js
const fullName = first + last;
```

---

## ❌ 3. 依赖写错导致 bug

```js
useEffect(() => {
  fetchData(id);
}, []); // ❌ 忘了 id
```

👉 会导致数据不更新

---

# 7. useEffect 执行流程（理解核心）

一次完整流程：

1. render
2. DOM 更新
3. 浏览器绘制
4. 执行 useEffect
5. 如果依赖变化 → 先 cleanup → 再执行 effect

---

# 8. React 官方建议（重点）

- useEffect ≠ 生命周期替代品
- 不要滥用 useEffect
- 如果是“计算值”，不要放 effect
- 如果是“用户行为”，优先用事件处理函数

---

# 9. 一句话总结

👉 useEffect = **React 组件和外部世界同步的入口**
