import { memo, type CSSProperties } from 'react';
import type { Product } from '../api/products';

interface ProductCardProps {
  product: Product;
  qty: number;
  onAdd: (id: string) => void;
}

const card: CSSProperties = {
  padding: 14,
  borderRadius: 14,
  border: '1px solid #e2e8f0',
  background: '#fff',
};

const thumb: CSSProperties = {
  height: 110,
  borderRadius: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'rgba(255, 255, 255, 0.85)',
  fontSize: 34,
  fontWeight: 800,
};

const muted: CSSProperties = { color: '#64748b', fontSize: 12 };

const btn: CSSProperties = {
  padding: '7px 14px',
  border: 'none',
  borderRadius: 8,
  background: '#2563eb',
  color: '#fff',
  cursor: 'pointer',
  fontSize: 13,
};

function ProductCardInner({ product, qty, onAdd }: ProductCardProps) {
  return (
    <article style={card}>
      <div style={{ ...thumb, background: product.color }}>{product.name.slice(0, 1)}</div>
      <h3 style={{ margin: '10px 0 4px', fontSize: 15 }}>{product.name}</h3>
      <p style={muted}>
        {product.category} · 评分 {product.rating} · 月销 {product.sales.toLocaleString('zh-CN')}
      </p>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 10 }}>
        <strong style={{ fontSize: 18, color: '#ef4444' }}>¥{product.price}</strong>
        <span style={{ ...muted, textDecoration: 'line-through' }}>¥{product.originPrice}</span>
        <button style={{ ...btn, marginLeft: 'auto' }} onClick={() => onAdd(product.id)}>
          {qty > 0 ? `再 +1（已 ${qty}）` : '加入购物车'}
        </button>
      </div>
    </article>
  );
}

export const ProductCard = memo(ProductCardInner);
