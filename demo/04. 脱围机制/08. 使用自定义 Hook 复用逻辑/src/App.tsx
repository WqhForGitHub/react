import { useState } from "react";
import OnlineStatusDemo from "./demos/OnlineStatusDemo.tsx";
import FormInputDemo from "./demos/FormInputDemo.tsx";
import ChatRoomDemo from "./demos/ChatRoomDemo.tsx";
import FadeInDemo from "./demos/FadeInDemo.tsx";
import "./App.css";

const DEMOS: { key: string; label: string; component: React.ComponentType }[] =
  [
    { key: "online", label: "useOnlineStatus", component: OnlineStatusDemo },
    { key: "form", label: "useFormInput", component: FormInputDemo },
    { key: "chat", label: "useChatRoom", component: ChatRoomDemo },
    { key: "fade", label: "useFadeIn", component: FadeInDemo },
  ];

function App() {
  const [activeDemo, setActiveDemo] = useState("online");

  const ActiveComponent = DEMOS.find((d) => d.key === activeDemo)!.component;

  return (
    <div className="app">
      <header className="app-header">
        <h1>React 自定义 Hook Demo</h1>
        <p>组件间共享逻辑，而不是共享状态</p>
      </header>

      <nav className="demo-nav">
        {DEMOS.map((demo) => (
          <button
            key={demo.key}
            className={`nav-btn ${activeDemo === demo.key ? "active" : ""}`}
            onClick={() => setActiveDemo(demo.key)}
          >
            {demo.label}
          </button>
        ))}
      </nav>

      <main className="demo-main">
        <ActiveComponent />
      </main>

      <footer className="app-footer">
        <p>
          基于{" "}
          <a
            href="https://zh-hans.react.dev/learn/reusing-logic-with-custom-hooks"
            target="_blank"
            rel="noreferrer"
          >
            React 官方文档 - 复用逻辑 with 自定义 Hook
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
