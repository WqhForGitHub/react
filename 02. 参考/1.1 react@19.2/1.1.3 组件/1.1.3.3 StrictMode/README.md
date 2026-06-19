# 一、StrictMode 是什么？

👉 核心一句话：
**它是一个只在开发环境生效的检查器，用来暴露隐蔽问题。**

```jsx
import { StrictMode } from "react";

<StrictMode>
  <App />
</StrictMode>;
```

特点：

- ✅ 不渲染任何 DOM（类似 Fragment）([GeeksforGeeks][2])
- ✅ 只在开发环境生效（生产环境完全无影响）([React][1])
- ✅ 用于发现副作用、内存泄漏、不规范用法

---

# 二、StrictMode 会做什么（重点🔥）

开启后，会触发 **4类关键检查机制**：

---

## 1️⃣ 组件会“额外渲染一次”（双调用）

👉 用来检测 **不纯组件（副作用）**

```jsx
function Test() {
  console.log("render");
  return <div>Hello</div>;
}
```

开启 StrictMode 后：

```
render
render   // 多执行一次
```

📌 原因：

React 假设组件是“纯函数”，即：

> 相同输入 → 相同输出

如果你写了副作用（比如修改外部变量），第二次执行就会暴露问题。([React][1])

---

## 2️⃣ useEffect 会执行两次（setup → cleanup → setup）

```jsx
useEffect(() => {
  console.log("effect");
  return () => {
    console.log("cleanup");
  };
}, []);
```

StrictMode 下执行顺序：

```
effect
cleanup
effect
```

📌 作用：

- 检测你是否忘记写 cleanup
- 防止内存泄漏（如订阅、定时器）

👉 官方解释：会额外执行一轮 setup + cleanup 来暴露问题 ([React][1])

---

## 3️⃣ ref 回调会执行两次

```jsx
<div ref={(el) => console.log(el)} />
```

执行流程：

```
set ref
cleanup ref
set ref
```

📌 用于检测：

- 是否正确清理 ref
- 是否有 DOM 引用泄漏

---

## 4️⃣ 检查废弃 API（deprecation）

比如：

- 旧生命周期（componentWillMount 等）
- findDOMNode
- string refs

👉 会直接给 warning

---

# 三、使用方式

---

## ✅ 1. 全局开启（推荐）

```jsx
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

👉 官方建议：新项目直接全开 ([React][1])

---

## ✅ 2. 局部开启

```jsx
function App() {
  return (
    <>
      <Header />
      <StrictMode>
        <Main />
      </StrictMode>
      <Footer />
    </>
  );
}
```

👉 适用于：

- 老项目逐步迁移
- 某些库不兼容 StrictMode

---

# 四、常见“坑”（非常重要）

---

## ❗ 1. useEffect 执行两次不是 bug

很多人误以为：

> “React 出问题了？”

其实是 **设计行为**

👉 用来逼你写正确代码

---

## ❗ 2. 请求发送两次

```jsx
useEffect(() => {
  fetch("/api"); // 会执行两次
}, []);
```

解决：

```jsx
useEffect(() => {
  let ignore = false;

  fetch("/api").then((res) => {
    if (!ignore) {
      // 处理数据
    }
  });

  return () => {
    ignore = true;
  };
}, []);
```

---

## ❗ 3. 不能依赖“只执行一次”

错误写法：

```jsx
let count = 0;

function App() {
  count++;
}
```

👉 StrictMode 会让你发现这种隐式副作用

---

## ❗ 4. 第三方库不兼容

有些库：

- 依赖 mount 只执行一次
- 没有 cleanup

👉 解决：

- 局部关闭 StrictMode
- 或换库

---

# 五、底层设计思想（非常关键）

StrictMode 本质是在模拟未来 React 的能力：

👉 **Concurrent Rendering（并发渲染）**

React 未来可能会：

- 中断 render
- 重复执行 render
- 重新挂载组件

StrictMode 提前让你适应这种模型。

---

# 六、什么时候用 / 不用？

---

## ✅ 建议使用

- 新项目（强烈推荐）
- Hook-heavy 项目
- 复杂状态管理

---

## ❌ 可以不用（或局部用）

- 老项目迁移期
- 某些图形库 / canvas / WebGL
- 不可控第三方组件

---

# 七、一句话总结

👉 `<StrictMode>` 本质就是：

> **用“故意多执行几次”的方式，帮你提前发现副作用和潜在 bug**

---
