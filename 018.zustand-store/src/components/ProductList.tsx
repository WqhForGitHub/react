import { useRef } from 'react';
import { products, useShopStore } from '../store/useShopStore';

export function ProductList() {
  const quantities = useShopStore((s) => s.quantities);
  const add = useShopStore((s) => s.add);
  const remove = useShopStore((s) => s.remove);
  const renders = useRef(0);
  renders.current += 1;

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 12,
        }}
      >
        {products.map((product) => {
          const qty = quantities[product.id] ?? 0;
          return (
            <div
              key={product.id}
              style={{
                padding: 16,
                borderRadius: 12,
                border: '1px solid #e2e8f0',
                background: '#fff',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 34, height: 34, borderRadius: 10, background: product.color }} />
                <strong style={{ flex: 1 }}>{product.name}</strong>
              </div>
              <p style={{ color: '#64748b', fontSize: 13, marginBottom: 12 }}>
                ¥{product.price} · 已加 {qty} 件
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => remove(product.id)}
                  disabled={qty === 0}
                  style={{
                    padding: '6px 12px',
                    border: 'none',
                    borderRadius: 8,
                    background: '#f1f5f9',
                    color: '#334155',
                    cursor: qty === 0 ? 'not-allowed' : 'pointer',
                    fontSize: 14,
                  }}
                >
                  -
                </button>
                <button
                  onClick={() => add(product.id)}
                  style={{
                    padding: '6px 12px',
                    border: 'none',
                    borderRadius: 8,
                    background: '#2563eb',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: 14,
                  }}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <p style={{ color: '#94a3b8', fontSize: 12, marginTop: 12 }}>
        列表渲染 {renders.current} 次（订阅了整个 quantities 对象，任何商品变化都会更新）
      </p>
    </div>
  );
}
