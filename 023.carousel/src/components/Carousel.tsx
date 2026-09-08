import { useEffect, useState, type CSSProperties } from 'react';

export interface Slide {
  id: string;
  title: string;
  subtitle: string;
  background: string;
}

interface CarouselProps {
  slides: Slide[];
  interval?: number;
}

const arrowBtn: CSSProperties = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: 40,
  height: 40,
  borderRadius: '50%',
  border: 'none',
  background: 'rgba(255, 255, 255, 0.25)',
  color: '#fff',
  fontSize: 20,
  cursor: 'pointer',
};

const badge: CSSProperties = {
  background: 'rgba(0, 0, 0, 0.35)',
  color: '#fff',
  padding: '2px 10px',
  borderRadius: 999,
  fontSize: 12,
};

export function Carousel({ slides, interval = 3000 }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, interval);
    return () => clearInterval(id);
  }, [paused, interval, total]);

  const go = (next: number) => setIndex(((next % total) + total) % total);

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        style={{
          display: 'flex',
          transition: 'transform 450ms ease',
          transform: `translateX(-${index * 100}%)`,
        }}
      >
        {slides.map((slide) => (
          <section
            key={slide.id}
            style={{
              minWidth: '100%',
              height: 280,
              boxSizing: 'border-box',
              padding: 32,
              background: slide.background,
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <h2 style={{ margin: 0, fontSize: 30 }}>{slide.title}</h2>
            <p style={{ margin: '8px 0 0', opacity: 0.85 }}>{slide.subtitle}</p>
          </section>
        ))}
      </div>

      <button style={{ ...arrowBtn, left: 12 }} onClick={() => go(index - 1)} aria-label="上一张">
        ‹
      </button>
      <button style={{ ...arrowBtn, right: 12 }} onClick={() => go(index + 1)} aria-label="下一张">
        ›
      </button>

      <div
        style={{
          position: 'absolute',
          bottom: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 6,
        }}
      >
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            aria-label={`跳到第 ${i + 1} 张`}
            onClick={() => go(i)}
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              background: i === index ? '#fff' : 'rgba(255, 255, 255, 0.4)',
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          display: 'flex',
          gap: 8,
        }}
      >
        <span style={badge}>
          {index + 1} / {total}
        </span>
        {paused && (
          <span style={{ ...badge, background: 'rgba(245, 158, 11, 0.9)' }}>已暂停</span>
        )}
      </div>
    </div>
  );
}
