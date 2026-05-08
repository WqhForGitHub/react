import { useState } from "react";
import CalculateDuringRender from "./components/CalculateDuringRender";
import CachingExpensiveCalculation from "./components/CachingExpensiveCalculation";
import ResetStateWithKey from "./components/ResetStateWithKey";
import AdjustStateDuringRender from "./components/AdjustStateDuringRender";
import SharedEventHandlerLogic from "./components/SharedEventHandlerLogic";
import PostRequestDemo from "./components/PostRequestDemo";
import ChainedEffects from "./components/ChainedEffects";
import AppInitialization from "./components/AppInitialization";
import NotifyParentDemo from "./components/NotifyParentDemo";
import SubscribeExternalStore from "./components/SubscribeExternalStore";
import DataFetchingDemo from "./components/DataFetchingDemo";
import "./App.css";

const demos = [
  { id: 1, title: "根据 props/state 更新 state", component: CalculateDuringRender },
  { id: 2, title: "缓存昂贵的计算", component: CachingExpensiveCalculation },
  { id: 3, title: "用 key 重置所有 state", component: ResetStateWithKey },
  { id: 4, title: "调整部分 state", component: AdjustStateDuringRender },
  { id: 5, title: "共享事件处理逻辑", component: SharedEventHandlerLogic },
  { id: 6, title: "发送 POST 请求", component: PostRequestDemo },
  { id: 7, title: "避免链式 Effect", component: ChainedEffects },
  { id: 8, title: "初始化应用", component: AppInitialization },
  { id: 9, title: "通知父组件 state 变化", component: NotifyParentDemo },
  { id: 10, title: "订阅外部 store", component: SubscribeExternalStore },
  { id: 11, title: "获取数据", component: DataFetchingDemo },
];

function App() {
  const [activeDemo, setActiveDemo] = useState(0);

  return (
    <div className="app">
      <header className="app-header">
        <h1>你可能不需要 Effect</h1>
        <p className="subtitle">
          Effect 是 React 范式中的一种脱围机制。如果没有涉及到外部系统，你就不应该使用
          Effect。
        </p>
      </header>

      <nav className="sidebar">
        <button
          className={`nav-item ${activeDemo === 0 ? "active" : ""}`}
          onClick={() => setActiveDemo(0)}
        >
          概览
        </button>
        {demos.map((demo) => (
          <button
            key={demo.id}
            className={`nav-item ${activeDemo === demo.id ? "active" : ""}`}
            onClick={() => setActiveDemo(demo.id)}
          >
            {demo.id}. {demo.title}
          </button>
        ))}
      </nav>

      <main className="content">
        {activeDemo === 0 ? (
          <div className="overview">
            <h2>概览</h2>
            <div className="principles">
              <div className="principle-card">
                <h3>渲染期间计算</h3>
                <p>
                  如果一个值可以基于现有的 props 或 state
                  计算得出，不要把它作为一个 state，而是在渲染期间直接计算。
                </p>
              </div>
              <div className="principle-card">
                <h3>useMemo 缓存</h3>
                <p>
                  想要缓存昂贵的计算，请使用 <code>useMemo</code> 而不是{" "}
                  <code>useEffect</code>。
                </p>
              </div>
              <div className="principle-card">
                <h3>key 重置 state</h3>
                <p>
                  想要重置整个组件树的 state，请传入不同的 <code>key</code>。
                </p>
              </div>
              <div className="principle-card">
                <h3>渲染期间调整</h3>
                <p>
                  想要在 prop 变化时重置某些特定的 state，请在渲染期间处理。
                </p>
              </div>
              <div className="principle-card">
                <h3>事件处理函数</h3>
                <p>
                  组件 <strong>显示</strong>{" "}
                  时就需要执行的代码应该放在 Effect 中，否则应该放在事件处理函数中。
                </p>
              </div>
              <div className="principle-card">
                <h3>批量更新</h3>
                <p>
                  如果你需要更新多个组件的 state，最好在单个事件处理函数中处理。
                </p>
              </div>
              <div className="principle-card">
                <h3>状态提升</h3>
                <p>
                  当你尝试在不同组件中同步 state 变量时，请考虑状态提升。
                </p>
              </div>
              <div className="principle-card">
                <h3>数据获取</h3>
                <p>
                  你可以使用 Effect 获取数据，但你需要实现清除逻辑以避免竞态条件。
                </p>
              </div>
            </div>
            <div className="navigation-hint">
              <p>点击左侧导航栏查看各个场景的对比演示</p>
            </div>
          </div>
        ) : (
          demos.map((demo) => {
            const Component = demo.component;
            return (
              activeDemo === demo.id && <Component key={demo.id} />
            );
          })
        )}
      </main>
    </div>
  );
}

export default App;
