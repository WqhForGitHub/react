import { useState, useEffect } from "react";

// 模拟 POST 请求
const post = (url: string, data: Record<string, unknown>) => {
  console.log(`POST ${url}`, data);
  alert(`发送 POST 请求到 ${url}\n数据: ${JSON.stringify(data)}`);
};

// 🔴 避免：在 Effect 中发送事件特定的 POST 请求
function FormBad() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // ✅ 这个分析请求保留在 Effect 中是正确的
  useEffect(() => {
    post("/analytics/event", { eventName: "visit_form" });
  }, []);

  // 🔴 避免：在 Effect 中处理表单提交
  const [jsonToSubmit, setJsonToSubmit] = useState<{
    firstName: string;
    lastName: string;
  } | null>(null);

  useEffect(() => {
    if (jsonToSubmit !== null) {
      post("/api/register", jsonToSubmit);
    }
  }, [jsonToSubmit]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setJsonToSubmit({ firstName, lastName });
  }

  return (
    <div className="demo-card bad">
      <h4>🔴 避免：在 Effect 中发送表单数据</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            名：
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label>
            姓：
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
        </div>
        <button type="submit" className="btn-small">
          注册
        </button>
      </form>
      <p className="hint">
        问题：表单提交是用户事件，不应该通过 Effect + state 间接触发。引入了多余的
        state 和渲染周期。
      </p>
    </div>
  );
}

// ✅ 正确做法：分析请求用 Effect，表单提交用事件处理函数
function FormGood() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // ✅ 分析请求保留在 Effect 中 —— 组件显示时就需要执行
  useEffect(() => {
    post("/analytics/event", { eventName: "visit_form" });
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // ✅ 事件特定的逻辑直接在事件处理函数中处理
    post("/api/register", { firstName, lastName });
  }

  return (
    <div className="demo-card good">
      <h4>✅ 正确：分析请求用 Effect，提交用事件处理函数</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            名：
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label>
            姓：
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
        </div>
        <button type="submit" className="btn-small">
          注册
        </button>
      </form>
      <p className="hint">
        优势：组件显示时执行分析（Effect），用户点击时提交注册（事件处理函数），职责清晰
      </p>
    </div>
  );
}

export default function PostRequestDemo() {
  return (
    <div>
      <h3>6. 发送 POST 请求</h3>
      <p>
        判断标准：如果逻辑是由特定交互引起的，放在事件处理函数中；如果是由组件
        <strong>显示</strong>引起的，放在 Effect 中。
      </p>
      <div className="comparison">
        <FormBad />
        <FormGood />
      </div>
    </div>
  );
}
