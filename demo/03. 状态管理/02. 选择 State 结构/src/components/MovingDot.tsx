import { useState } from 'react';

/**
 * 原则1：合并关联的 state
 * 如果两个 state 变量总是一起变化，将它们合并为一个 state 变量更好。
 * 这里 x 和 y 坐标总是一起更新，所以用对象 { x, y } 来表示位置。
 */
export default function MovingDot() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <div
      onPointerMove={(e) => {
        setPosition({ x: e.clientX, y: e.clientY });
      }}
      style={{
        position: 'relative',
        width: '100%',
        height: '300px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'red',
          borderRadius: '50%',
          transform: `translate(${position.x}px, ${position.y}px)`,
          left: -10,
          top: -10,
          width: 20,
          height: 20,
          pointerEvents: 'none',
        }}
      />
      <p
        style={{
          position: 'absolute',
          bottom: 8,
          left: 8,
          margin: 0,
          fontSize: 12,
          color: '#888',
        }}
      >
        移动鼠标来控制红点位置 | x: {position.x}, y: {position.y}
      </p>
    </div>
  );
}
