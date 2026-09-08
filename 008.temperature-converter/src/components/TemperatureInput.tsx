import type { CSSProperties } from 'react';

export type Scale = 'c' | 'f';

interface TemperatureInputProps {
  scale: Scale;
  value: string;
  onChange: (value: string) => void;
}

const scaleInfo: Record<Scale, { label: string; unit: string; placeholder: string }> = {
  c: { label: '摄氏度', unit: '°C', placeholder: '如 25' },
  f: { label: '华氏度', unit: '°F', placeholder: '如 77' },
};

const input: CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  fontSize: 20,
  border: '1px solid #cbd5e1',
  borderRadius: 10,
  fontVariantNumeric: 'tabular-nums',
  boxSizing: 'border-box',
};

export function TemperatureInput({ scale, value, onChange }: TemperatureInputProps) {
  const info = scaleInfo[scale];
  return (
    <label style={{ display: 'block', flex: 1 }}>
      <span style={{ display: 'block', marginBottom: 6, color: '#475569', fontSize: 14 }}>
        {info.label}（{info.unit}）
      </span>
      <input
        style={input}
        value={value}
        placeholder={info.placeholder}
        inputMode="decimal"
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
