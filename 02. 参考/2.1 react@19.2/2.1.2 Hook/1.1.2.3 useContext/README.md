# 一、useContext 是干什么的？

一句话理解：

> 👉 `useContext` 让组件可以“直接拿到全局/共享数据”，不用一层层传 props。

比如：

- 主题（dark / light）
- 用户信息（user）
- 语言（i18n）
- 登录状态

---

# 二、核心组成（必须一起用）

`useContext` 不能单独使用，它必须配合：

### 1️⃣ createContext（创建容器）

### 2️⃣ Provider（提供数据）

### 3️⃣ useContext（消费数据）

---

# 三、完整使用流程（重点）

## 1. 创建 Context

```js
import { createContext } from "react";

export const ThemeContext = createContext("light");
```

👉 `"light"` 是默认值（没有 Provider 时才用）

---

## 2. 提供数据（Provider）

```js
import { ThemeContext } from "./ThemeContext";

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Home />
    </ThemeContext.Provider>
  );
}
```

👉 `value="dark"` 才是真正传递的数据

---

## 3. 子组件使用 useContext

```js
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Button() {
  const theme = useContext(ThemeContext);

  return <button className={theme}>按钮</button>;
}
```

👉 `theme === "dark"`

---

# 四、数据是怎么“流动”的？

React 内部逻辑是：

```
Provider(value = "dark")
        ↓
   Home
        ↓
   Button → useContext → 直接拿 "dark"
```

✔ 不需要 props
✔ 不需要中间组件传递

---

# 五、真实开发例子（用户登录）

## 1. 创建 Context

```js
const UserContext = createContext(null);
```

---

## 2. Provider 提供用户数据

```js
function App() {
  const user = { name: "Alice", isLogin: true };

  return (
    <UserContext.Provider value={user}>
      <Dashboard />
    </UserContext.Provider>
  );
}
```

---

## 3. 任意组件使用

```js
function Profile() {
  const user = useContext(UserContext);

  return <div>{user.name}</div>;
}
```

---

# 六、useContext + useState（最常见组合）

Context 本身**不会存状态**，一般这样用：

```js
const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Page />
    </ThemeContext.Provider>
  );
}
```

---

## 子组件可以直接改状态：

```js
function SwitchButton() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      切换主题
    </button>
  );
}
```

---

# 七、useContext 的本质（很重要）

👉 它不是状态管理工具（不是 Redux）

它只是：

> ✔ “数据共享通道”
> ❌ 不是完整状态系统

---

# 八、常见坑（面试重点）

## ❌ 1. 忘记写 Provider

```js
// 错误：会拿到默认值
<ThemeContext>
```

正确：

```js
<ThemeContext.Provider value="dark">
```

---

## ❌ 2. value 写错

```js
<ThemeContext theme="dark" /> // ❌ 无效
```

必须：

```js
<ThemeContext.Provider value="dark" />
```

---

## ❌ 3. 每次 render 都创建新对象（性能问题）

```js
<ThemeContext.Provider value={{ theme, setTheme }}>
```

优化：

```js
const value = useMemo(() => ({ theme, setTheme }), [theme]);
```

---

# 九、什么时候用 useContext？

✔ 适合：

- 主题 theme
- 用户 user
- 语言 locale
- UI 状态（弹窗、侧边栏）

❌ 不适合：

- 大型业务状态
- 高频更新数据（表格、列表）
- 复杂状态流

---

# 十、一句话总结

> `useContext` = 让组件“直接读取最近 Provider 的共享数据”，避免 props 层层传递。
