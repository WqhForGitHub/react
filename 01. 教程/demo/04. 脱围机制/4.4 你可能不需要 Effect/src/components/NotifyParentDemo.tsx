import { useState } from "react";

// 🔴 避免：在 Effect 中通知父组件 state 变化
function ToggleBad({ onChange }: { onChange: (isOn: boolean) => void }) {
  const [isOn, setIsOn] = useState(false);

  // 🔴 onChange 执行太晚了 —— 先更新自身 state，再渲染，再执行 Effect
  const [prevIsOn, setPrevIsOn] = useState(isOn);
  if (isOn !== prevIsOn) {
    setPrevIsOn(isOn);
    // 模拟 Effect 中的 onChange 调用
    onChange(isOn);
  }

  function handleClick() {
    setIsOn(!isOn);
  }

  function handleDragEnd(e: React.MouseEvent) {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const isCloserToRight = e.clientX > rect.left + rect.width / 2;
    setIsOn(isCloserToRight);
  }

  return (
    <div className="demo-card bad">
      <h4>🔴 避免：在 Effect 中通知父组件</h4>
      <div
        className={`toggle ${isOn ? "on" : "off"}`}
        onClick={handleClick}
        onMouseUp={handleDragEnd}
      >
        <div className="toggle-knob" />
      </div>
      <p>状态: {isOn ? "开" : "关"}</p>
      <p className="hint">
        问题：Toggle 先更新自身 state 并渲染，然后才通知父组件，导致两次渲染流程
      </p>
    </div>
  );
}

// ✅ 正确做法：在同一个事件处理函数中更新两个组件的 state
function ToggleGood({ onChange }: { onChange: (isOn: boolean) => void }) {
  const [isOn, setIsOn] = useState(false);

  // ✅ 提取共享逻辑
  function updateToggle(nextIsOn: boolean) {
    setIsOn(nextIsOn);
    onChange(nextIsOn);
  }

  function handleClick() {
    updateToggle(!isOn);
  }

  function handleDragEnd(e: React.MouseEvent) {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const isCloserToRight = e.clientX > rect.left + rect.width / 2;
    updateToggle(isCloserToRight);
  }

  return (
    <div className="demo-card good">
      <h4>✅ 正确：在事件处理函数中同时更新</h4>
      <div
        className={`toggle ${isOn ? "on" : "off"}`}
        onClick={handleClick}
        onMouseUp={handleDragEnd}
      >
        <div className="toggle-knob" />
      </div>
      <p>状态: {isOn ? "开" : "关"}</p>
      <p className="hint">
        优势：在同一个事件处理函数中更新子组件和父组件的 state，React
        批量处理，只需一次渲染
      </p>
    </div>
  );
}

// ✅ 更好：完全受控组件（状态提升）
function ToggleControlled({
  isOn,
  onChange,
}: {
  isOn: boolean;
  onChange: (isOn: boolean) => void;
}) {
  function handleClick() {
    onChange(!isOn);
  }

  return (
    <div className="demo-card good">
      <h4>✅ 更好：完全受控组件（状态提升）</h4>
      <div className={`toggle ${isOn ? "on" : "off"}`} onClick={handleClick}>
        <div className="toggle-knob" />
      </div>
      <p>状态: {isOn ? "开" : "关"}</p>
      <p className="hint">
        优势：完全由父组件控制，无需内部 state，数据流更清晰
      </p>
    </div>
  );
}

export default function NotifyParentDemo() {
  const [parentStateBad, setParentStateBad] = useState(false);
  const [parentStateGood, setParentStateGood] = useState(false);
  const [parentStateControlled, setParentStateControlled] = useState(false);

  return (
    <div>
      <h3>9. 通知父组件有关 state 变化</h3>
      <p>
        不要在 Effect 中通知父组件。在同一个事件处理函数中更新所有
        state，或者使用状态提升。
      </p>
      <div className="comparison">
        <div>
          <ToggleBad onChange={setParentStateBad} />
          <p className="parent-state">父组件状态: {parentStateBad ? "开" : "关"}</p>
        </div>
        <div>
          <ToggleGood onChange={setParentStateGood} />
          <p className="parent-state">父组件状态: {parentStateGood ? "开" : "关"}</p>
        </div>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <ToggleControlled
          isOn={parentStateControlled}
          onChange={setParentStateControlled}
        />
        <p className="parent-state">父组件状态: {parentStateControlled ? "开" : "关"}</p>
      </div>
    </div>
  );
}
