import { useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import { useDebounce } from './hooks/useDebounce';

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  price: number;
}

const books: Book[] = [
  { id: 1, title: 'React 学习手册', author: '陈晨', category: '前端', price: 89 },
  { id: 2, title: 'TypeScript 实战', author: '李雷', category: '前端', price: 99 },
  { id: 3, title: 'Vue.js 设计与实现', author: '韩梅', category: '前端', price: 129 },
  { id: 4, title: '深入浅出 Node.js', author: '王浩', category: '后端', price: 79 },
  { id: 5, title: '数据结构与算法', author: '赵琳', category: '基础', price: 69 },
  { id: 6, title: '计算机网络：自顶向下', author: '孙强', category: '基础', price: 119 },
  { id: 7, title: '设计模式之禅', author: '周杰', category: '基础', price: 75 },
  { id: 8, title: '重构：改善既有代码', author: '吴静', category: '工程', price: 108 },
  { id: 9, title: '代码整洁之道', author: '郑爽', category: '工程', price: 59 },
  { id: 10, title: '领域驱动设计', author: '冯坤', category: '架构', price: 88 },
  { id: 11, title: '微服务架构设计模式', author: '褚亮', category: '架构', price: 139 },
  { id: 12, title: 'Docker 实战', author: '卫东', category: '运维', price: 69 },
  { id: 13, title: 'Kubernetes 权威指南', author: '蒋鑫', category: '运维', price: 149 },
  { id: 14, title: 'SQL 必知必会', author: '沈括', category: '数据库', price: 39 },
  { id: 15, title: '高性能 MySQL', author: '韩信', category: '数据库', price: 129 },
  { id: 16, title: 'React 设计模式', author: '陈晨', category: '前端', price: 95 },
];

const page: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  maxWidth: 640,
  margin: '40px auto',
  padding: 24,
};

const row: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '10px 14px',
  borderRadius: 10,
  border: '1px solid #e2e8f0',
  marginBottom: 8,
};

const input: CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  fontSize: 16,
  border: '1px solid #cbd5e1',
  borderRadius: 10,
  boxSizing: 'border-box',
};

const muted: CSSProperties = { color: '#64748b', fontSize: 14 };

const chip: CSSProperties = {
  padding: '2px 10px',
  borderRadius: 999,
  background: '#f1f5f9',
  color: '#475569',
  fontSize: 12,
};

function highlight(text: string, query: string): ReactNode {
  if (!query) return text;
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <mark style={{ background: '#fef08a', padding: 0 }}>{text.slice(index, index + query.length)}</mark>
      {text.slice(index + query.length)}
    </>
  );
}

export default function App() {
  const [query, setQuery] = useState('');
  const [delay, setDelay] = useState(300);
  const debouncedQuery = useDebounce(query, delay);

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return books;
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.category.toLowerCase().includes(q)
    );
  }, [debouncedQuery]);

  const isTyping = query.trim() !== debouncedQuery.trim();

  return (
    <main style={page}>
      <h1>014 · 防抖搜索</h1>
      <p style={muted}>
        useDebounce 让「输入」和「真正要执行的过滤」隔一段时间，停止输入后才计算，避免每敲一个字符都过滤一遍
      </p>

      <input
        style={input}
        placeholder="搜索书名、作者或分类…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '12px 0' }}>
        <label style={muted}>
          防抖延迟
          <select
            style={{ marginLeft: 8, padding: '6px 8px', borderRadius: 8, border: '1px solid #cbd5e1' }}
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
          >
            <option value={300}>300ms</option>
            <option value={600}>600ms</option>
            <option value={1200}>1200ms</option>
          </select>
        </label>
        {isTyping && (
          <span style={{ color: '#f59e0b', fontSize: 13 }}>输入中，等待防抖结束再搜索…</span>
        )}
        <span style={{ ...muted, marginLeft: 'auto' }}>
          命中 {filtered.length} / {books.length} 本
        </span>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {filtered.map((book) => (
          <li key={book.id} style={row}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{highlight(book.title, debouncedQuery.trim())}</div>
              <div style={{ ...muted, fontSize: 13 }}>{highlight(book.author, debouncedQuery.trim())}</div>
            </div>
            <span style={chip}>{highlight(book.category, debouncedQuery.trim())}</span>
            <span style={{ ...muted, width: 56, textAlign: 'right' }}>¥{book.price}</span>
          </li>
        ))}
        {filtered.length === 0 && (
          <li style={{ ...muted, textAlign: 'center', padding: 24 }}>
            没有找到「{debouncedQuery}」相关的书
          </li>
        )}
      </ul>
    </main>
  );
}
