import { useState } from "react";

/**
 * 反面模式：用 Effect 根据 props/state 更新 state
 * 正确做法：在渲染期间直接计算
 */

// 🔴 避免：多余的 state 和不必要的 Effect
function FormBad() {
  const [firstName, setFirstName] = useState("Taylor");
  const [lastName, setLastName] = useState("Swift");
  // 🔴 多余的 state + Effect
  const [fullName, setFullName] = useState("Taylor Swift");

  // 模拟 Effect 行为（这里为了演示用 setTimeout 模拟异步）
  // 实际代码中你会写：useEffect(() => { setFullName(firstName + ' ' + lastName); }, [firstName, lastName]);
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setFirstName(next);
    // 延迟更新 fullName，模拟 Effect 的 "先渲染旧值再更新"
    setTimeout(() => {
      setFullName(next + " " + lastName);
    }, 0);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setLastName(next);
    setTimeout(() => {
      setFullName(firstName + " " + next);
    }, 0);
  };

  return (
    <div className="demo-card bad">
      <h4>🔴 避免：多余的 state 和 Effect</h4>
      <div className="form-row">
        <label>
          名：
          <input value={firstName} onChange={handleFirstNameChange} />
        </label>
        <label>
          姓：
          <input value={lastName} onChange={handleLastNameChange} />
        </label>
      </div>
      <p>
        全名：<strong>{fullName}</strong>
      </p>
      <p className="hint">
        问题：fullName 的更新是延迟的，需要额外的渲染周期
      </p>
    </div>
  );
}

// ✅ 正确做法：在渲染期间直接计算
function FormGood() {
  const [firstName, setFirstName] = useState("Taylor");
  const [lastName, setLastName] = useState("Swift");
  // ✅ 直接计算，无需 state 和 Effect
  const fullName = firstName + " " + lastName;

  return (
    <div className="demo-card good">
      <h4>✅ 正确：在渲染期间直接计算</h4>
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
      <p>
        全名：<strong>{fullName}</strong>
      </p>
      <p className="hint">
        优势：fullName 始终同步，无需额外渲染，代码更简洁
      </p>
    </div>
  );
}

export default function CalculateDuringRender() {
  return (
    <div>
      <h3>1. 根据 props 或 state 来更新 state</h3>
      <p>
        如果一个值可以基于现有的 props 或 state 计算得出，不要把它作为一个
        state，而是在渲染期间直接计算这个值。
      </p>
      <div className="comparison">
        <FormBad />
        <FormGood />
      </div>
    </div>
  );
}
