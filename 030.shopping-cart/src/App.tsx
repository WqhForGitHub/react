import { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react';
import { fetchProducts, type Product } from './api/products';
import { CartDrawer } from './components/CartDrawer';
import { ProductCard } from './components/ProductCard';
import { useDebounce } from './hooks/useDebounce';
import { selectCartCount, useCartStore } from './store/useCartStore';

const CATEGORIES = ['全部', '手机', '电脑', '配件', '影音'] as const;

type SortKey = 'default' | 'price-asc' | 'price-desc' | 'sales';

const page: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  maxWidth: 1080,
  margin: '0 auto',
  padding: 24,
};

const input: CSSProperties = {
  padding: '9px 12px',
  border: '1px solid #cbd5e1',
  borderRadius: 8,
  fontSize: 14,
  width: 220,
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

const muted: CSSProperties = { color: '#64748b', fontSize: 13 };

const banner: CSSProperties = {
  marginTop: 16,
  padding: '10px 16px',
  borderRadius: 10,
  background: '#dcfce7',
  color: '#166534',
  display: 'flex',
  alignItems: 'center',
  gap: 12,
};

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('全部');
  const [sort, setSort] = useState<SortKey>('default');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [orderDone, setOrderDone] = useState(false);

  const lines = useCartStore((s) => s.lines);
  const add = useCartStore((s) => s.add);
  const clear = useCartStore((s) => s.clear);
  const count = useCartStore(selectCartCount);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    let active = true;
    fetchProducts().then((data) => {
      if (!active) return;
      setProducts(data);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const qtyMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (const line of lines) {
      map[line.id] = line.qty;
    }
    return map;
  }, [lines]);

  const visible = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    let list = products.filter((product) => {
      const matchCategory = category === '全部' || product.category === category;
      const matchQuery =
        !q || product.name.toLowerCase().includes(q) || product.category.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'sales') list = [...list].sort((a, b) => b.sales - a.sales);
    return list;
  }, [products, debouncedQuery, category, sort]);

  const handleAdd = useCallback((id: string) => add(id), [add]);

  const checkout = async () => {
    setPlacing(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setPlacing(false);
    setDrawerOpen(false);
    clear();
    setOrderDone(true);
  };

  return (
    <main style={page}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <h1 style={{ margin: 0 }}>030 · 综合购物车</h1>
        <span style={muted}>
          异步加载 + 防抖搜索 + zustand 持久化 + memo 渲染优化 + Portal 抽屉
        </span>
        <button style={{ ...btn, marginLeft: 'auto' }} onClick={() => setDrawerOpen(true)}>
          购物车（{count}）
        </button>
      </header>

      {orderDone && (
        <div style={banner}>
          <span>下单成功！购物车已清空，刷新页面购物车状态也会保留（zustand persist）。</span>
          <button style={{ ...ghostBtn, marginLeft: 'auto' }} onClick={() => setOrderDone(false)}>
            知道了
          </button>
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '16px 0', flexWrap: 'wrap' }}>
        <input
          style={input}
          placeholder="搜索商品或分类…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {CATEGORIES.map((c) => (
          <button key={c} style={c === category ? btn : ghostBtn} onClick={() => setCategory(c)}>
            {c}
          </button>
        ))}
        <select
          style={{ ...input, width: 150 }}
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
        >
          <option value="default">默认排序</option>
          <option value="price-asc">价格从低到高</option>
          <option value="price-desc">价格从高到低</option>
          <option value="sales">销量优先</option>
        </select>
      </div>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 14 }}>
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} style={{ height: 220, borderRadius: 14, background: '#f1f5f9' }} />
          ))}
          <p style={{ ...muted, gridColumn: '1 / -1', textAlign: 'center' }}>商品加载中…</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 14 }}>
          {visible.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              qty={qtyMap[product.id] ?? 0}
              onAdd={handleAdd}
            />
          ))}
          {visible.length === 0 && (
            <p style={{ ...muted, gridColumn: '1 / -1', textAlign: 'center', padding: 24 }}>
              没有匹配「{query}」的商品
            </p>
          )}
        </div>
      )}

      <CartDrawer
        open={drawerOpen}
        placing={placing}
        onClose={() => setDrawerOpen(false)}
        onCheckout={checkout}
      />
    </main>
  );
}
