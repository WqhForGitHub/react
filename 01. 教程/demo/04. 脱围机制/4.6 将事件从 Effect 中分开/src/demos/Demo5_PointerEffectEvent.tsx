import { useState, useEffect } from 'react';
import { useEffectEvent } from '../useEffectEvent';

/**
 * Demo 5: 解决方案 — 使用 useEffectEvent 修复过期值问题
 *
 * onMove 是 Effect Event，始终读取最新的 canMove。
 * Effect 依赖为 []，不需要响应 canMove 变化重新绑定事件。
 */
export default function Demo5_PointerEffectEvent() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canMove, setCanMove] = useState(true);

  const onMove = useEffectEvent((e: PointerEvent) => {
    if (canMove) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  });

  useEffect(() => {
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []); // ✅ Effect 不需要依赖 canMove 或 onMove

  return (
    <div className="demo-section">
      <h2>Demo 5: 解决方案 — useEffectEvent 修复过期值</h2>
      <p>
        使用 <code>useEffectEvent</code> 提取非响应式逻辑。<br />
        <code>onMove</code> 始终读取最新的 <code>canMove</code>，Effect 不需要响应 canMove 变化重新绑定事件。
      </p>
      <label>
        <input
          type="checkbox"
          checked={canMove}
          onChange={(e) => setCanMove(e.target.checked)}
        />
        The dot is allowed to move
      </label>
      <hr />
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'pink',
          borderRadius: '50%',
          opacity: 0.6,
          transform: `translate(${position.x}px, ${position.y}px)`,
          pointerEvents: 'none',
          left: -20,
          top: -20,
          width: 40,
          height: 40,
        }}
      />
    </div>
  );
}
