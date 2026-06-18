# 1. 基本用法

```js
import { useTransition } from "react";

function App() {
  const [isPending, startTransition] = useTransition();

  const [list, setList] = useState([]);

  const handleClick = () => {
    startTransition(() => {
      setList(heavyComputeData());
    });
  };

  return (
    <>
      <button onClick={handleClick}>更新列表 {isPending && "加载中..."}</button>

      <List data={list} />
    </>
  );
}
```

---

# 2. 返回值

```js
const [isPending, startTransition] = useTransition();
```

### ✔ isPending

- boolean
- 表示“transition 是否还在进行”
- 常用于 loading UI

### ✔ startTransition(fn)

- 用来包裹**低优先级 state 更新**

---

# 3. 核心作用（非常重要）

## ❗ React 默认行为

所有 state 更新都是“高优先级”，会可能卡 UI：

- 输入框卡顿
- 大列表渲染阻塞
- 页面掉帧

---

## ✅ useTransition 改变的是优先级

```text
用户输入（高优先级）
⬆ 优先处理

列表更新（低优先级 transition）
⬇ 可以延后渲染
```

👉 React 会优先保证“交互流畅”，再慢慢渲染重 UI。

([React][1])

---

# 4. 典型使用场景

## ① 搜索 + 大列表过滤（最常见）

```js
const [isPending, startTransition] = useTransition();
const [query, setQuery] = useState("");

const handleChange = (e) => {
  setQuery(e.target.value); // 高优先级

  startTransition(() => {
    setFilterResult(expensiveFilter(e.target.value));
  });
};
```

👉 输入不卡顿，但列表慢慢更新

---

## ② Tab 切换（复杂页面）

```js
startTransition(() => {
  setTab("analytics");
});
```

👉 切换 UI 时不会阻塞点击/输入

---

## ③ 路由切换（SPA）

```js
startTransition(() => {
  navigate("/dashboard");
});
```

👉 避免页面切换白屏闪烁

---

## ④ 表单提交后 UI 更新

```js
startTransition(() => {
  setTableData(newData);
});
```

---

# 5. 和普通 setState 的区别

| 行为               | 普通 setState | useTransition |
| ------------------ | ------------- | ------------- |
| 优先级             | 高            | 低            |
| 是否阻塞 UI        | 可能          | 不会          |
| 是否可中断         | 否            | 是            |
| 是否影响输入流畅度 | 会            | 不会          |

---

# 6. 一个关键误区 ⚠️

## ❌ 误解：它是“异步”

不是。

```js
startTransition(() => {
  setState(...)
});
```

👉 这个函数是**同步执行的**

真正“延迟”的是 React 的渲染过程，而不是代码执行。

---

# 7. 不能用的情况（很重要）

## ❌ 不要用于 input value

```js
startTransition(() => {
  setText(e.target.value);
});
```

👉 会导致输入延迟/卡顿（React 明确禁止这样用）

---

## ❌ 不适合“必须立即更新”的 UI

比如：

- 输入框
- 密码
- checkbox
- 按钮状态

---

# 8. useTransition vs useDeferredValue

| Hook             | 用途               |
| ---------------- | ------------------ |
| useTransition    | 控制“更新行为”     |
| useDeferredValue | 控制“值的延迟版本” |

简单理解：

- useTransition → 控制 **更新**
- useDeferredValue → 控制 **数据**

---

# 9. 实战最佳实践（面试常问）

## ✔ 推荐用法

- 搜索过滤
- 大列表渲染
- 图表更新
- 页面切换
- dashboard UI 更新

---

## ✔ 推荐结构

```js
const [isPending, startTransition] = useTransition();

const onChange = (value) => {
  setInput(value);

  startTransition(() => {
    setResult(expensiveCompute(value));
  });
};
```

---

# 10. 一句话总结

👉 `useTransition` 的本质是：

> 把“可能卡 UI 的 state 更新”降级为低优先级任务，让 React 优先保证用户交互流畅。
