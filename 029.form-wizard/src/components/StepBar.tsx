import type { CSSProperties } from 'react';

interface StepBarProps {
  step: number;
  total: number;
}

const circle = (active: boolean): CSSProperties => ({
  width: 30,
  height: 30,
  borderRadius: '50%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 13,
  fontWeight: 700,
  flexShrink: 0,
  background: active ? '#2563eb' : '#e2e8f0',
  color: active ? '#fff' : '#94a3b8',
  transition: 'background 200ms, color 200ms',
});

export function StepBar({ step, total }: StepBarProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <div key={n} style={{ display: 'flex', alignItems: 'center', flex: n < total ? 1 : 'none' }}>
          <span style={circle(n <= step)}>{n}</span>
          {n < total && (
            <div
              style={{
                flex: 1,
                height: 4,
                borderRadius: 999,
                margin: '0 8px',
                background: n < step ? '#2563eb' : '#e2e8f0',
                transition: 'background 200ms',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
