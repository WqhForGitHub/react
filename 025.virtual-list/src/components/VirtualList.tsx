import { useState, type CSSProperties, type ReactNode } from 'react';

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  height: number;
  overscan?: number;
  renderItem: (item: T, index: number) => ReactNode;
  keyOf: (item: T, index: number) => string | number;
}

const scroller: CSSProperties = {
  overflowY: 'auto',
  border: '1px solid #e2e8f0',
  borderRadius: 12,
  boxSizing: 'border-box',
  background: '#fff',
};

const stats: CSSProperties = {
  padding: '8px 12px',
  textAlign: 'center',
  color: '#94a3b8',
  fontSize: 12,
  background: '#f8fafc',
  borderTop: '1px solid #f1f5f9',
  position: 'sticky',
  bottom: 0,
};

export function VirtualList<T>({
  items,
  itemHeight,
  height,
  overscan = 6,
  renderItem,
  keyOf,
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);

  const total = items.length;
  const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const end = Math.min(total, Math.ceil((scrollTop + height) / itemHeight) + overscan);

  return (
    <div
      style={{ ...scroller, height }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: total * itemHeight, position: 'relative' }}>
        {items.slice(start, end).map((item, offset) => {
          const index = start + offset;
          return (
            <div
              key={keyOf(item, index)}
              style={{
                position: 'absolute',
                top: index * itemHeight,
                height: itemHeight,
                left: 0,
                right: 0,
              }}
            >
              {renderItem(item, index)}
            </div>
          );
        })}
      </div>
      <div style={stats}>
        共 {total.toLocaleString('zh-CN')} 条 · 可视区实际渲染 {end - start} 条
      </div>
    </div>
  );
}
