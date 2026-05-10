import { useState } from 'react';

export default function MovingDotMutationDemo() {
  const [position, _setPosition] = useState({
    x: 0,
    y: 0,
  });

  return (
    <div className="moving-dot-container">
      <p className="demo-hint">
        在下方区域移动光标——红点<strong>不会</strong>跟随移动，因为直接修改了 state 对象（mutation），React 不知道发生了变化。
      </p>
      <div
        className="dot-area"
        onPointerMove={(e) => {
          // ❌ 错误：直接修改 state 中的对象
          position.x = e.clientX;
          position.y = e.clientY;
        }}
      >
        <div
          className="red-dot"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
        />
      </div>
      <p className="state-info">
        当前 position: <code>{`{ x: ${position.x}, y: ${position.y} }`}</code>
      </p>
      <pre className="code-block">{`// ❌ 直接修改 state —— 不会触发重新渲染
onPointerMove={e => {
  position.x = e.clientX;
  position.y = e.clientY;
}}`}</pre>
    </div>
  );
}
