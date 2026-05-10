import { useState } from 'react';

export default function MovingDotCorrectDemo() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  return (
    <div className="moving-dot-container">
      <p className="demo-hint">
        在下方区域移动光标——红点<strong>会</strong>跟随移动，因为创建了新的对象并传递给了 state 设置函数。
      </p>
      <div
        className="dot-area"
        onPointerMove={(e) => {
          // ✅ 正确：创建新对象替换 state
          setPosition({
            x: e.clientX,
            y: e.clientY,
          });
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
      <pre className="code-block">{`// ✅ 创建新对象 —— 触发重新渲染
onPointerMove={e => {
  setPosition({
    x: e.clientX,
    y: e.clientY
  });
}}`}</pre>
    </div>
  );
}
