import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { fetchFeed, TOTAL_COUNT, type FeedItem } from './api/fakeFeed';

const page: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  maxWidth: 640,
  margin: '40px auto',
  padding: 24,
};

const card: CSSProperties = {
  padding: 16,
  borderRadius: 12,
  border: '1px solid #e2e8f0',
  background: '#fff',
  marginBottom: 10,
};

const ghostBtn: CSSProperties = {
  padding: '8px 14px',
  border: 'none',
  borderRadius: 8,
  background: '#f1f5f9',
  color: '#334155',
  cursor: 'pointer',
  fontSize: 14,
};

const muted: CSSProperties = { color: '#64748b', fontSize: 13, lineHeight: 1.7 };

export default function App() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const pageRef = useRef(0);

  const loadMore = useCallback(() => {
    if (loadingRef.current || !hasMoreRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    pageRef.current += 1;
    fetchFeed(pageRef.current).then((res) => {
      setItems((prev) => [...prev, ...res.items]);
      hasMoreRef.current = res.hasMore;
      setHasMore(res.hasMore);
      loadingRef.current = false;
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          loadMore();
        }
      },
      { rootMargin: '240px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  const reset = () => {
    setItems([]);
    pageRef.current = 0;
    hasMoreRef.current = true;
    setHasMore(true);
    loadMore();
  };

  return (
    <main style={page}>
      <h1>026 · 无限滚动</h1>
      <p style={muted}>
        IntersectionObserver 盯住底部的哨兵元素，进入视口就加载下一页；
        loadingRef / hasMoreRef 防止一次滚动触发多次重复请求
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '12px 0' }}>
        <span style={{ ...muted, fontSize: 14 }}>
          已加载 {items.length} / {TOTAL_COUNT} 条
        </span>
        <button style={{ ...ghostBtn, marginLeft: 'auto' }} onClick={reset}>
          重置
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item) => (
          <li key={item.id} style={card}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <strong>{item.title}</strong>
              <span style={{ ...muted, marginLeft: 'auto' }}>{item.minutes} 分钟读完</span>
            </div>
            <p style={{ ...muted, margin: '6px 0 0' }}>
              {item.author} · {item.summary}
            </p>
          </li>
        ))}
      </ul>

      <div ref={sentinelRef} style={{ height: 1 }} />

      <p style={{ textAlign: 'center', ...muted }}>
        {loading && '加载中…'}
        {!loading && hasMore && '继续向下滚动加载更多'}
        {!loading && !hasMore && `已经到底啦，共 ${items.length} 条`}
      </p>
    </main>
  );
}
