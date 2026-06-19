# 1. useState 基本语法

```js
import { useState } from "react";

const [state, setState] = useState(initialValue);
```

它做了三件事：

- `state`：当前状态值
- `setState`：修改状态的方法
- `initialValue`：初始值（只在首次渲染时生效）

📌 React 会“记住”这个 state，而不是每次重新执行函数都丢失

---

# 2. 最简单例子（计数器）

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

点击按钮时：

1. 调用 `setCount`
2. React 更新 state
3. 组件重新渲染
4. UI 自动变成新值

---

# 3. state 更新特点（非常重要）

## ❗ state 不是立刻变的

```js
setCount(count + 1);
console.log(count); // 还是旧值
```

👉 因为 React 的更新是“异步 + 批处理”的

---

## ✔ 正确方式：函数式更新（推荐）

当新 state 依赖旧 state 时：

```js
setCount((prev) => prev + 1);
```

优点：

- 不会拿到旧闭包
- 多次更新更安全

```js
setCount((c) => c + 1);
setCount((c) => c + 1);
setCount((c) => c + 1);
```

👉 最终 +3（不会出错）

---

# 4. useState 可以存任何类型

## ① 数字

```js
const [count, setCount] = useState(0);
```

## ② 字符串

```js
const [name, setName] = useState("Tom");
```

## ③ 布尔值

```js
const [isOpen, setIsOpen] = useState(false);
```

## ④ 数组

```js
const [list, setList] = useState([]);

setList([...list, 1]); // 必须新数组
```

## ⑤ 对象

```js
const [user, setUser] = useState({ name: "A", age: 20 });

setUser({
  ...user,
  age: 21,
});
```

📌 核心原则：**不能直接修改 state（必须创建新值）**

---

# 5. 常见错误（面试高频）

## ❌ 直接修改 state

```js
user.age = 30;
setUser(user);
```

问题：

- React 可能检测不到变化
- UI 不更新

---

## ❌ 在条件/循环中使用 useState

```js
if (true) {
  const [a, setA] = useState(0); // ❌ 错
}
```

👉 Hook 必须在组件顶层调用

---

## ❌ 依赖旧值但没用函数更新

```js
setCount(count + 1); // 可能出错
```

---

# 6. 初始值是函数（性能优化）

```js
const [data, setData] = useState(() => {
  return expensiveCalculation();
});
```

📌 只会执行一次（初始渲染）

---

# 7. state 更新后发生了什么？

流程如下：

1. 调用 `setState`
2. React 标记组件需要更新
3. 重新执行组件函数
4. 返回新的 UI
5. React diff 并更新 DOM

---

# 8. 多个 useState

一个组件可以有多个 state：

```js
const [name, setName] = useState("");
const [age, setAge] = useState(0);
const [loading, setLoading] = useState(false);
```

👉 每个 state 是独立的

---

# 9. useState vs 普通变量

❌ 普通变量不会触发更新：

```js
let count = 0;

function add() {
  count++;
}
```

✔ useState 才会更新 UI：

```js
const [count, setCount] = useState(0);
```

---

# 10. 一句话总结

👉 `useState` = **让函数组件拥有“记忆能力”，并且修改后自动重新渲染 UI 的机制**
