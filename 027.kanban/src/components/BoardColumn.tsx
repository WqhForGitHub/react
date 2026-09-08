import { useState, type CSSProperties, type DragEvent } from 'react';
import {
  useKanbanStore,
  type Card,
  type Column,
  type Priority,
} from '../store/useKanbanStore';

const priorityBadge: Record<Priority, { text: string; color: string }> = {
  low: { text: '低', color: '#22c55e' },
  mid: { text: '中', color: '#f59e0b' },
  high: { text: '高', color: '#ef4444' },
};

const columnStyle: CSSProperties = {
  background: '#f8fafc',
  borderRadius: 12,
  padding: 12,
  flex: 1,
  minWidth: 240,
  border: '2px dashed transparent',
  transition: 'background 150ms, border-color 150ms',
};

const cardStyle: CSSProperties = {
  padding: 12,
  borderRadius: 10,
  background: '#fff',
  border: '1px solid #e2e8f0',
  marginBottom: 8,
  cursor: 'grab',
  userSelect: 'none',
  boxShadow: '0 1px 2px rgba(15, 23, 42, 0.06)',
};

const input: CSSProperties = {
  flex: 1,
  padding: '7px 10px',
  border: '1px solid #cbd5e1',
  borderRadius: 8,
  fontSize: 13,
};

const muted: CSSProperties = { color: '#64748b', fontSize: 12 };

const countChip: CSSProperties = {
  padding: '1px 8px',
  borderRadius: 999,
  background: '#e2e8f0',
  color: '#475569',
  fontSize: 12,
};

export function BoardColumn({ column }: { column: Column }) {
  const cards = useKanbanStore((s) => s.cards);
  const addCard = useKanbanStore((s) => s.addCard);
  const removeCard = useKanbanStore((s) => s.removeCard);
  const moveCard = useKanbanStore((s) => s.moveCard);

  const [title, setTitle] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const items = column.cardIds
    .map((id) => cards[id])
    .filter((card): card is Card => card !== undefined);

  const handleDrop = (e: DragEvent<HTMLDivElement>, index?: number) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');
    if (cardId) {
      moveCard(cardId, column.id, index);
    }
    setDragOver(false);
    setOverIndex(null);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => handleDrop(e, undefined)}
      style={{
        ...columnStyle,
        background: dragOver ? '#eff6ff' : '#f8fafc',
        borderColor: dragOver ? '#93c5fd' : 'transparent',
      }}
    >
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 12,
          padding: '0 4px',
        }}
      >
        <strong>{column.title}</strong>
        <span style={countChip}>{items.length}</span>
      </header>

      {items.map((card, index) => {
        const badge = priorityBadge[card.priority];
        return (
          <div
            key={card.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.effectAllowed = 'move';
              e.dataTransfer.setData('text/plain', card.id);
            }}
            onDragEnter={() => setOverIndex(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.stopPropagation();
              handleDrop(e, index);
            }}
            onDragEnd={() => setOverIndex(null)}
            style={{
              ...cardStyle,
              boxShadow: overIndex === index ? 'inset 0 3px 0 #2563eb' : cardStyle.boxShadow,
            }}
          >
            <strong style={{ fontSize: 14 }}>{card.title}</strong>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
              <span
                style={{
                  padding: '1px 8px',
                  borderRadius: 999,
                  background: badge.color,
                  color: '#fff',
                  fontSize: 11,
                }}
              >
                {badge.text}
              </span>
              <span style={muted}>{card.assignee}</span>
              <button
                onClick={() => removeCard(card.id)}
                aria-label={`删除 ${card.title}`}
                style={{
                  marginLeft: 'auto',
                  border: 'none',
                  background: 'transparent',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  fontSize: 14,
                }}
              >
                ×
              </button>
            </div>
          </div>
        );
      })}

      <input
        style={input}
        placeholder="新卡片，回车添加"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addCard(column.id, title, 'mid');
            setTitle('');
          }
        }}
      />
    </div>
  );
}
