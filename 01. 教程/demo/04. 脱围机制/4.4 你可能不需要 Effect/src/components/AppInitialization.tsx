import { useEffect, useRef } from "react";

// ✅ 方案一：使用顶层变量记录是否已初始化
let didInit = false;

function simulateLoadData() {
  console.log("[初始化] 从 localStorage 加载数据...");
  return { theme: "dark", language: "zh-CN" };
}

function simulateCheckAuth() {
  console.log("[初始化] 检查认证 token...");
  return { token: "valid-token-123" };
}

// 🔴 避免：把只需要执行一次的逻辑放在 Effect 中
// 开发环境严格模式下会执行两次
function AppBad() {
  // 🔴 问题：开发环境会执行两次
  useEffect(() => {
    console.log("[🔴 AppBad] Effect 执行 - 加载数据和检查认证");
    simulateLoadData();
    simulateCheckAuth();
  }, []);

  return (
    <div className="demo-card bad">
      <h4>🔴 避免：Effect 中只执行一次的逻辑</h4>
      <p>
        在开发环境（严格模式）下，Effect 会执行两次，可能导致认证 token
        失效等问题。
      </p>
      <p className="hint">
        问题：useEffect(() =&gt; &#123; loadData(); checkAuth(); &#125;,
        [])，在开发环境会执行两次
      </p>
    </div>
  );
}

// ✅ 方案一：使用顶层变量确保只执行一次
function AppGoodV1() {
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      console.log("[✅ AppGoodV1] 只在应用加载时执行一次");
      simulateLoadData();
      simulateCheckAuth();
    }
  }, []);

  return (
    <div className="demo-card good">
      <h4>✅ 方案一：使用顶层变量</h4>
      <p>使用顶层 <code>didInit</code> 变量确保逻辑只在应用加载时执行一次。</p>
      <pre className="code-block">{`let didInit = false;

function App() {
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      loadDataFromLocalStorage();
      checkAuthToken();
    }
  }, []);
}`}</pre>
    </div>
  );
}

// ✅ 方案二：在模块初始化时执行
function AppGoodV2() {
  // 初始化逻辑在模块顶层执行，不在 Effect 中
  return (
    <div className="demo-card good">
      <h4>✅ 方案二：模块初始化时执行</h4>
      <p>
        在组件外部（模块顶层）执行初始化逻辑，在应用渲染之前就完成。
      </p>
      <pre className="code-block">{`if (typeof window !== 'undefined') {
  // 只在每次应用加载时执行一次
  checkAuthToken();
  loadDataFromLocalStorage();
}

function App() {
  // ...
}`}</pre>
      <p className="hint">
        注意：顶层代码在模块被导入时执行，应将此逻辑保留在入口文件中
      </p>
    </div>
  );
}

export default function AppInitialization() {
  const hasLogged = useRef(false);

  if (!hasLogged.current) {
    hasLogged.current = true;
    console.log("===== AppInitialization 演示 =====");
    console.log("观察控制台，了解不同初始化方式的执行时机");
  }

  return (
    <div>
      <h3>8. 初始化应用</h3>
      <p>
        有些逻辑只需要在应用加载时执行一次。不要放在 Effect
        中（开发环境会执行两次），使用顶层变量或模块顶层代码。
      </p>
      <div className="comparison">
        <AppBad />
        <AppGoodV1 />
      </div>
      <div style={{ marginTop: "1rem" }}>
        <AppGoodV2 />
      </div>
    </div>
  );
}
