import { useState, useEffect, useContext, createContext } from 'react';
import { useEffectEvent } from '../useEffectEvent';

// 模拟购物车 Context
interface CartItem {
  id: number;
  name: string;
}

const ShoppingCartContext = createContext<{ items: CartItem[] }>({ items: [] });

/**
 * Demo 6: 使用 Effect Event 读取最新的 props 和 state
 *
 * logVisit 应该响应 url 变化（不同页面 = 不同访问事件），
 * 但不应该响应 numberOfItems 变化（购物车变化 ≠ 重新访问页面）。
 */
function Page({ url }: { url: string }) {
  const { items } = useContext(ShoppingCartContext);
  const numberOfItems = items.length;

  // Effect Event: 非响应式，但始终读取最新的 numberOfItems
  const onVisit = useEffectEvent((visitedUrl: string) => {
    console.log(`Page visit logged: ${visitedUrl}, items in cart: ${numberOfItems}`);
  });

  // Effect: 响应式，url 变化时重新运行（不同页面 = 不同访问事件）
  useEffect(() => {
    onVisit(url);
  }, [url]);

  return (
    <div style={{ padding: 16, border: '1px dashed #888', borderRadius: 8, marginTop: 8 }}>
      <h3>Current page: {url}</h3>
      <p>Items in cart: {numberOfItems}</p>
      <p style={{ color: '#666', fontSize: 14 }}>
        Check the console — logVisit 只在 url 变化时运行，<br />
        但始终读取最新的 numberOfItems。
      </p>
    </div>
  );
}

export default function Demo6_PageVisit() {
  const [url, setUrl] = useState('/home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <ShoppingCartContext.Provider value={{ items: cartItems }}>
      <div className="demo-section">
        <h2>Demo 6: Effect Event 读取最新的 props 和 state</h2>
        <p>
          <code>logVisit</code> 应该响应 <code>url</code> 变化，但不应该响应{' '}
          <code>numberOfItems</code> 变化。
        </p>
        <label>
          Current page:{' '}
          <select value={url} onChange={(e) => setUrl(e.target.value)}>
            <option value="/home">/home</option>
            <option value="/about">/about</option>
            <option value="/products">/products</option>
          </select>
        </label>
        <button
          onClick={() =>
            setCartItems((prev) => [
              ...prev,
              { id: prev.length + 1, name: `Item ${prev.length + 1}` },
            ])
          }
          style={{ display: 'block', marginTop: 8 }}
        >
          Add item to cart ({cartItems.length} items)
        </button>
        <Page url={url} />
      </div>
    </ShoppingCartContext.Provider>
  );
}
