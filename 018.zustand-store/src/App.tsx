import type { CSSProperties } from 'react';
import { CartBadge } from './components/CartBadge';
import { ProductList } from './components/ProductList';
import { selectTotalPrice, useShopStore } from './store/useShopStore';

const page: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  maxWidth: 720,
  margin: '40px auto',
  padding: 24,
};

const btn: CSSProperties = {
  padding: '8px 16px',
  border: 'none',
  borderRadius: 8,
  background: '#2563eb',
  color: '#fff',
  cursor: 'pointer',
  fontSize: 14,
};

const ghostBtn: CSSProperties = {
  ...btn,
  background: '#f1f5f9',
  color: '#334155',
};

const muted: CSSProperties = { color: '#64748b', fontSize: 14, lineHeight: 1.7 };

export default function App() {
  const totalPrice = useShopStore(selectTotalPrice);
  const clear = useShopStore((s) => s.clear);

  return (
    <main style={page}>
      <h1>018 · zustand 全局状态</h1>
      <p style={muted}>
        状态放在组件树之外，任何组件都能直接读写，不需要 Provider，也不需要一层层传 props；
        选择器让每个组件只订阅自己关心的那部分数据
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '16px 0' }}>
        <CartBadge />
        <button style={ghostBtn} onClick={clear}>
          清空购物袋
        </button>
        <span style={{ ...muted, marginLeft: 'auto', fontWeight: 700, color: '#0f172a' }}>
          合计 ¥{totalPrice}
        </span>
      </div>

      <ProductList />
    </main>
  );
}
