import { memo, useRef } from 'react';
import { selectTotalCount, useShopStore } from '../store/useShopStore';

function CartBadgeInner() {
  const count = useShopStore(selectTotalCount);
  const renders = useRef(0);
  renders.current += 1;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 18px',
        borderRadius: 999,
        background: '#0f172a',
        color: '#fff',
        fontSize: 14,
      }}
    >
      <span>购物袋：{count} 件</span>
      <span style={{ opacity: 0.55, fontSize: 12 }}>
        （徽章渲染 {renders.current} 次，只有总数变化才更新）
      </span>
    </div>
  );
}

export const CartBadge = memo(CartBadgeInner);
