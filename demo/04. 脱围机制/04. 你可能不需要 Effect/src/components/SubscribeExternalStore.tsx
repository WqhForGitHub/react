import { useState, useEffect, useSyncExternalStore } from "react";

// 🔴 避免：在 Effect 中手动订阅外部 store
function useOnlineStatusBad() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    function updateState() {
      setIsOnline(navigator.onLine);
    }
    updateState();

    window.addEventListener("online", updateState);
    window.addEventListener("offline", updateState);
    return () => {
      window.removeEventListener("online", updateState);
      window.removeEventListener("offline", updateState);
    };
  }, []);

  return isOnline;
}

// ✅ 正确做法：使用 useSyncExternalStore
function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

function useOnlineStatusGood() {
  return useSyncExternalStore(
    subscribe, // 只要传递的是同一个函数，React 不会重新订阅
    () => navigator.onLine, // 如何在客户端获取值
    () => true // 如何在服务端获取值
  );
}

function ChatIndicatorBad() {
  const isOnline = useOnlineStatusBad();

  return (
    <div className="demo-card bad">
      <h4>🔴 避免：在 Effect 中手动订阅外部 store</h4>
      <div className="online-status">
        <span className={`status-dot ${isOnline ? "online" : "offline"}`} />
        <span>{isOnline ? "在线" : "离线"}</span>
      </div>
      <p className="hint">
        问题：手动同步可变数据到 React state 容易出错，需要正确处理订阅/取消订阅
      </p>
    </div>
  );
}

function ChatIndicatorGood() {
  const isOnline = useOnlineStatusGood();

  return (
    <div className="demo-card good">
      <h4>✅ 正确：使用 useSyncExternalStore</h4>
      <div className="online-status">
        <span className={`status-dot ${isOnline ? "online" : "offline"}`} />
        <span>{isOnline ? "在线" : "离线"}</span>
      </div>
      <p className="hint">
        优势：内置 Hook 处理了订阅逻辑，支持服务端渲染，减少错误
      </p>
      <pre className="code-block">{`function useOnlineStatus() {
  return useSyncExternalStore(
    subscribe,
    () => navigator.onLine,  // 客户端
    () => true               // 服务端
  );
}`}</pre>
    </div>
  );
}

export default function SubscribeExternalStore() {
  return (
    <div>
      <h3>10. 订阅外部 store</h3>
      <p>
        当需要订阅 React 外部的数据（如浏览器 API、第三方库）时，使用{" "}
        <code>useSyncExternalStore</code> 而不是手动在 Effect 中同步。
      </p>
      <p className="hint" style={{ marginBottom: "1rem" }}>
        提示：你可以通过浏览器的开发者工具 &gt; Network &gt; Offline
        来切换网络状态，观察两个组件的响应
      </p>
      <div className="comparison">
        <ChatIndicatorBad />
        <ChatIndicatorGood />
      </div>
    </div>
  );
}
