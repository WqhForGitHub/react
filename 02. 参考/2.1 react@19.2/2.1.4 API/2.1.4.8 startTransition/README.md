# 一、基本定义

```js
import { startTransition } from "react";

startTransition(() => {
  setState(...);
});
```

React 官方定义是：
👉 在 `action` 里的所有 state 更新都会被标记为 **Transition（过渡更新）** ([React][1])

---

# 二、它解决什么问题？

React 更新 UI 是“渲染驱动”的：

- 输入框输入（必须立即响应 ❗）
- 搜索结果列表更新（可以慢一点 ⏳）
- 大列表/图表渲染（可能很重 🐢）

如果不区分优先级：

👉 输入 + 大渲染会互相卡住（掉帧、卡顿）

---

# 三、startTransition 的核心作用

## ✅ 1. 标记“非紧急更新”

```js
startTransition(() => {
  setList(newData);
});
```

👉 告诉 React：

- 这个更新不重要（UI 可以晚点更新）
- 用户输入、点击优先处理

---

## ✅ 2. 保持输入流畅

典型场景：搜索框

```js
function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);

  function onChange(e) {
    const value = e.target.value;

    setInput(value); // ❗紧急：立即更新输入框

    startTransition(() => {
      setList(expensiveFilter(value)); // ⏳非紧急
    });
  }
}
```

效果：

- 输入框不卡（优先级高）
- 列表稍后更新（低优先级）

---

## ✅ 3. React 可以“中断渲染”

Transition 的特点：

- React 可以暂停/重启这次渲染
- 如果用户继续输入，会直接丢弃旧渲染
- 保证界面始终“跟手”

---

# 四、startTransition vs useTransition

## 1️⃣ startTransition（函数版）

```js
import { startTransition } from "react";
```

适合：

- 非组件内部
- 工具函数 / store / 事件回调外层

---

## 2️⃣ useTransition（Hook版）

```js
const [isPending, startTransition] = useTransition();
```

多了一个能力：

```js
isPending; // 是否正在渲染中
```

👉 可以做 loading UI

---

# 五、重要特性（容易误解）

## ❗1. 它不是“异步”

```js
startTransition(() => {
  setState(1);
});

console.log("next");
```

👉 会立刻执行函数，只是：

- state 更新被标记为低优先级

---

## ❗2. 不能延迟逻辑

```js
startTransition(() => {
  setTimeout(() => setState(1), 1000); // ❌不会被标记
});
```

必须：

```js
setTimeout(() => {
  startTransition(() => {
    setState(1);
  });
});
```

---

## ❗3. 只影响“更新优先级”，不影响 JS 执行顺序

---

# 六、典型使用场景

## 1️⃣ 搜索过滤（最常见）

```js
onChange → input立即更新
         → list transition更新
```

---

## 2️⃣ 路由切换

```js
startTransition(() => {
  navigate("/dashboard");
});
```

避免大页面切换卡顿

---

## 3️⃣ 大表格 / 图表更新

- 数据量大
- 渲染重

---

## 4️⃣ 状态联动复杂 UI

比如：

- tab 切换
- dashboard 刷新
- 图表重新计算

---

# 七、什么时候不该用？

❌ 不要用在：

- 输入框 value 更新
- checkbox / radio
- 必须立即反馈的 UI
- 表单受控输入

👉 原则：

> 只有“可以延迟的 UI 更新”才用 Transition

---

# 八、一句话总结

👉 `startTransition` 的本质就是：

> 把“可能卡 UI 的 state 更新”降级为低优先级，让 React 保证用户交互始终流畅。
