# 一、createContext 是什么？

在 React 中：

👉 `createContext` 用来创建一个“上下文对象”，让组件树中任意层级共享数据。

```js
const MyContext = createContext(defaultValue);
```

- `defaultValue`：默认值（兜底用）
- 返回：一个 **Context 对象**

📌 关键理解：

- Context 本身 **不存数据**
- 它只是一个“通道标识”
- 真正的数据由 Provider 提供 ([react.dev][1])

---

# 二、基础用法（最重要）

## 1️⃣ 创建 Context

```js
import { createContext } from "react";

export const ThemeContext = createContext("light");
```

👉 注意：

- 一般写在组件外
- 可以单独放文件

---

## 2️⃣ 提供数据（Provider）

```js
import { useState } from "react";
import { ThemeContext } from "./ThemeContext";

function App() {
  const [theme, setTheme] = useState("dark");

  return (
    <ThemeContext value={theme}>
      <Page />
    </ThemeContext>
  );
}
```

📌 React 19 写法：

```jsx
<ThemeContext value={theme}>
```

旧版本：

```jsx
<ThemeContext.Provider value={theme}>
```

👉 Provider 的作用：

- 给子组件“广播”数据
- 所有子组件都能拿到

---

## 3️⃣ 使用数据（useContext）

```js
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Button() {
  const theme = useContext(ThemeContext);

  return <button className={theme}>Click</button>;
}
```

👉 `useContext` 会读取：

- 最近的 Provider 的 value ([react.dev][2])

---

# 三、完整示例（推荐掌握）

```js
// context.js
import { createContext } from "react";

export const UserContext = createContext(null);
```

```js
// App.js
import { useState } from "react";
import { UserContext } from "./context";
import Profile from "./Profile";

export default function App() {
  const [user, setUser] = useState({ name: "Alice" });

  return (
    <UserContext value={user}>
      <Profile />
    </UserContext>
  );
}
```

```js
// Profile.js
import { useContext } from "react";
import { UserContext } from "./context";

export default function Profile() {
  const user = useContext(UserContext);

  return <div>{user.name}</div>;
}
```

---

# 四、核心机制（面试重点）

## ✅ 1. 最近原则（就近 Provider）

```jsx
<ThemeContext value="dark">
  <A>
    <ThemeContext value="light">
      <B />
    </ThemeContext>
  </A>
</ThemeContext>
```

👉 `B` 拿到 `"light"`，不是 `"dark"`

---

## ✅ 2. 自动更新

当 value 变化：

```js
<ThemeContext value={theme}>
```

👉 所有使用该 context 的组件都会重新渲染 ([reactalt.org][3])

---

## ✅ 3. defaultValue 规则

```js
const ThemeContext = createContext("light");
```

只有在 **没有 Provider 时才用**

👉 一旦有 Provider：

- defaultValue 完全失效 ([react.dev][1])

---

# 五、进阶用法

## 1️⃣ Context + 修改函数

```js
const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext value={{ theme, setTheme }}>
      <Page />
    </ThemeContext>
  );
}
```

```js
function Button() {
  const { theme, setTheme } = useContext(ThemeContext);

  return <button onClick={() => setTheme("dark")}>{theme}</button>;
}
```

👉 常见：**状态 + 修改方法一起传**

---

## 2️⃣ 多 Context

```js
<ThemeContext value="dark">
  <UserContext value={{ name: "Alice" }}>
    <App />
  </UserContext>
</ThemeContext>
```

👉 每个 context 独立

---

## 3️⃣ 封装 Hook（推荐）

```js
export function useUser() {
  return useContext(UserContext);
}
```

👉 好处：

- 简化调用
- 统一逻辑

---

# 六、常见坑（非常重要）

## ❌ 1. 误以为 defaultValue 会更新

错：

```js
createContext({ count: 0 });
```

👉 它不会变！

✔ 正确：用 state + Provider

---

## ❌ 2. 忘记包 Provider

```js
const value = useContext(MyContext); // undefined/null
```

👉 原因：没有 Provider

---

## ❌ 3. 每次传新对象 → 全量渲染

```js
<MyContext value={{ count }}>
```

👉 每次 render 都是新对象 → 全部子组件更新

✔ 优化：

```js
const value = useMemo(() => ({ count }), [count]);
```

---

## ❌ 4. 滥用 Context（很关键）

Context 适合：

✔ 主题（theme）
✔ 用户信息（auth）
✔ 语言（i18n）

不适合：

❌ 高频更新数据（比如表单）
❌ 局部状态

👉 因为会影响性能

---

# 七、createContext vs props

| 对比       | props    | context  |
| ---------- | -------- | -------- |
| 数据传递   | 一层层传 | 直接跨层 |
| 使用复杂度 | 简单     | 中等     |
| 适用场景   | 局部     | 全局     |
| 可维护性   | 高       | 滥用会差 |

---

# 八、一句话总结

👉 `createContext` 本质就是：

> 创建一个“跨组件共享数据通道”，由 Provider 提供数据，useContext 消费数据。
