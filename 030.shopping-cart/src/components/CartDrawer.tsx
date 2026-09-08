import { useMemo, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import {
  catalog,
  discountRules,
  FREE_SHIPPING_THRESHOLD,
  resolveDiscount,
  SHIPPING_FEE,
  type Product,
} from '../api/products';
import { selectCartCount, useCartStore } from '../store/useCartStore';

interface CartDrawerProps {
  open: boolean;
  placing: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const overlay: CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(15, 23, 42, 0.5)',
  display: 'flex',
  justifyContent: 'flex-end',
  zIndex: 1000,
};

const panel: CSSProperties = {
  width: 'min(92vw, 380px)',
  height: '100%',
  background: '#fff',
  boxSizing: 'border-box',
  padding: 20,
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '-16px 0 48px rgba(0, 0, 0, 0.2)',
};

const muted: CSSProperties = { color: '#64748b', fontSize: 13 };

const ghostBtn: CSSProperties = {
  width: 26,
  height: 26,
  borderRadius: 6,
  border: '1px solid #e2e8f0',
  background: '#fff',
  cursor: 'pointer',
  fontSize: 14,
  lineHeight: 1,
};

const btn: CSSProperties = {
  padding: '10px 0',
  border: 'none',
  borderRadius: 8,
  background: '#2563eb',
  color: '#fff',
  cursor: 'pointer',
  fontSize: 15,
  width: '100%',
};

export function CartDrawer({ open, placing, onClose, onCheckout }: CartDrawerProps) {
  const lines = useCartStore((s) => s.lines);
  const setQty = useCartStore((s) => s.setQty);
  const remove = useCartStore((s) => s.remove);
  const count = useCartStore(selectCartCount);

  const summary = useMemo(() => {
    const rows = lines
      .map((line) => {
        const product = catalog.find((p) => p.id === line.id);
        return product ? { product, qty: line.qty } : null;
      })
      .filter((row): row is { product: Product; qty: number } => row !== null);
    const subtotal = rows.reduce((sum, row) => sum + row.product.price * row.qty, 0);
    const discount = resolveDiscount(subtotal);
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    return {
      rows,
      subtotal,
      discount,
      shipping,
      total: subtotal - (discount?.off ?? 0) + shipping,
    };
  }, [lines]);

  if (!open) return null;

  return createPortal(
    <div onClick={onClose} style={overlay}>
      <aside onClick={(e) => e.stopPropagation()} style={panel}>
        <header style={{ display: 'flex', alignItems: 'center' }}>
          <h3 style={{ margin: 0, flex: 1 }}>购物车（{count} 件）</h3>
          <button onClick={onClose} aria-label="关闭" style={{ ...ghostBtn, width: 30, height: 30 }}>
            ×
          </button>
        </header>

        <div style={{ flex: 1, overflowY: 'auto', marginTop: 12 }}>
          {summary.rows.length === 0 && (
            <p style={{ ...muted, textAlign: 'center', padding: 32 }}>购物车是空的，去挑几件吧</p>
          )}
          {summary.rows.map(({ product, qty }) => (
            <div
              key={product.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 0',
                borderBottom: '1px solid #f1f5f9',
              }}
            >
              <span style={{ width: 36, height: 36, borderRadius: 8, background: product.color, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14 }}>{product.name}</div>
                <div style={muted}>¥{product.price} × {qty}</div>
              </div>
              <button style={ghostBtn} onClick={() => setQty(product.id, qty - 1)} aria-label="减少数量">
                -
              </button>
              <span style={{ fontSize: 14, width: 22, textAlign: 'center' }}>{qty}</span>
              <button style={ghostBtn} onClick={() => setQty(product.id, qty + 1)} aria-label="增加数量">
                +
              </button>
              <button
                style={{ ...ghostBtn, color: '#ef4444' }}
                onClick={() => remove(product.id)}
                aria-label="移除商品"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <footer style={{ borderTop: '1px solid #e2e8f0', paddingTop: 12 }}>
          <p style={{ display: 'flex', justifyContent: 'space-between', margin: '4px 0' }}>
            <span style={muted}>小计</span>
            <span>¥{summary.subtotal}</span>
          </p>
          <p style={{ display: 'flex', justifyContent: 'space-between', margin: '4px 0' }}>
            <span style={muted}>优惠</span>
            <span style={{ color: summary.discount ? '#16a34a' : '#64748b' }}>
              {summary.discount ? `${summary.discount.label}（-¥${summary.discount.off}）` : '暂无'}
            </span>
          </p>
          <p style={{ display: 'flex', justifyContent: 'space-between', margin: '4px 0' }}>
            <span style={muted}>运费</span>
            <span>{summary.shipping === 0 ? '包邮' : `¥${summary.shipping}`}</span>
          </p>
          <p style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0 12px' }}>
            <strong>应付</strong>
            <strong style={{ color: '#ef4444' }}>¥{summary.total}</strong>
          </p>
          <button style={{ ...btn, opacity: count === 0 ? 0.5 : 1 }} disabled={count === 0 || placing} onClick={onCheckout}>
            {placing ? '下单中…' : '去结算'}
          </button>
          <p style={{ ...muted, fontSize: 12, textAlign: 'center', marginTop: 10, marginBottom: 0 }}>
            {discountRules.map((rule) => rule.label).join('；')}；满 ¥{FREE_SHIPPING_THRESHOLD} 包邮
          </p>
        </footer>
      </aside>
    </div>,
    document.body
  );
}
