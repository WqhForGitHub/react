# 一、核心作用（一句话）

👉 给自定义 Hook 在 React DevTools 里“加标签”，让调试更清晰

比如：

- 不用它：只看到 `useOnlineStatus → true`
- 用了它：看到 `useOnlineStatus → Online`

---

# 二、基本语法

```js
useDebugValue(value, format?)
```

- `value`：要展示的调试值
- `format`（可选）：格式化函数（只在 DevTools 打开时执行）

---

# 三、必须知道的规则

### 1️⃣ 只能在「自定义 Hook」里使用

❌ 不能在普通组件里用
✔️ 只能在 `useXXX()` 这种 Hook 内

```js
function useOnlineStatus() {
  useDebugValue("Online");
}
```

---

### 2️⃣ 不影响运行时逻辑

它：

- ❌ 不改变 state
- ❌ 不触发 re-render
- ❌ 不影响性能（除非你在 format 里写重计算）

---

### 3️⃣ 只在 React DevTools 中可见

生产环境基本没有意义

---

# 四、最简单示例

## ✅ 示例 1：标记状态

```js
import { useDebugValue, useState } from "react";

function useOnlineStatus() {
  const [isOnline] = useState(true);

  useDebugValue(isOnline ? "Online" : "Offline");

  return isOnline;
}
```

👉 DevTools 里会看到：

```
useOnlineStatus: "Online"
```

---

# 五、真实开发常见用法（推荐）

## ✅ 示例 2：自定义 Hook 调试（推荐写法）

```js
function useCounter() {
  const [count, setCount] = useState(0);

  useDebugValue(count);

  return { count, setCount };
}
```

👉 DevTools 可以直接看到 count 的变化

---

# 六、带 format 函数（性能优化重点）

如果你想显示“更友好的格式”，可以这样：

```js
useDebugValue(date, (d) => d.toDateString());
```

### ⚠️ 关键点：

format 函数 **不会每次 render 都执行**
👉 只在 DevTools 打开时执行（避免性能损耗）

---

# 七、复杂一点的实战例子

## 🎯 自定义 Hook：登录状态

```js
function useAuth(user) {
  const isLoggedIn = !!user;

  useDebugValue(user, (u) => (u ? `Logged in: ${u.name}` : "Not logged in"));

  return isLoggedIn;
}
```

DevTools 显示：

```
useAuth: Logged in: John
```

---

# 八、什么时候该用？

## 👍 适合用：

- 自定义 Hook（useXXX）
- 复杂状态逻辑（比如 useFetch / useAuth / useForm）
- library / 组件库开发

---

## 👎 不适合用：

- 普通业务组件
- 简单 state
- 每个 hook 都加（没必要）

---

# 九、面试一句话总结

👉 `useDebugValue` 是一个“只服务开发者体验”的 Hook，用于在 React DevTools 中给自定义 Hook 添加可读标签，方便调试复杂逻辑。
