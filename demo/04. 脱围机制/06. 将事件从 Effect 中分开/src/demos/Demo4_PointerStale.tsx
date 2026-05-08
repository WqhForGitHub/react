import { useState, useEffect } from 'react';

/**
 * Demo 4: 问题 — 抑制依赖项检查导致过期值 bug
 *
 * handleMove 读取 canMove，但 Effect 依赖为 []，
 * eslint 被抑制了。结果是 handleMove 中的 canMove
 * 永远是初始值 true，取消勾选后点仍然会跟随光标。
 */
export default function Demo4_PointerStale() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canMove, setCanMove] = useState(true);

  function handleMove(e: PointerEvent) {
    if (canMove) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  }

  useEffect(() => {
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 🔴 抑制依赖检查，canMove 变化后 handleMove 不会更新

  return (
    <div className="demo-section">
      <h2>Demo 4: 问题 — 抑制依赖检查导致过期值</h2>
      <p>
        Effect 依赖为 <code>[]</code>，且抑制了 eslint 警告。<br />
        <strong>问题：</strong>取消勾选后，点仍然会跟随光标，因为 handleMove 中的 canMove 永远是初始值 true。
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
