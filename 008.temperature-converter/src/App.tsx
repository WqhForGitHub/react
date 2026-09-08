import { useState, type CSSProperties } from 'react';
import { TemperatureInput, type Scale } from './components/TemperatureInput';

interface TempState {
  value: string;
  scale: Scale;
}

const page: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  maxWidth: 640,
  margin: '40px auto',
  padding: 24,
};

const card: CSSProperties = {
  padding: 24,
  borderRadius: 14,
  border: '1px solid #e2e8f0',
  marginTop: 16,
};

const btn: CSSProperties = {
  padding: '8px 16px',
  border: 'none',
  borderRadius: 8,
  background: '#2563eb',
  color: '#fff',
  cursor: 'pointer',
  marginTop: 16,
};

const muted: CSSProperties = { color: '#64748b', fontSize: 14, lineHeight: 1.7 };

function toNumber(raw: string): number | null {
  if (raw.trim() === '') return null;
  const n = Number(raw);
  return Number.isNaN(n) ? null : n;
}

const round1 = (n: number) => Math.round(n * 10) / 10;

function waterState(celsius: number): { label: string; color: string } {
  if (celsius <= 0) return { label: '结冰了', color: '#38bdf8' };
  if (celsius < 40) return { label: '凉水', color: '#22d3ee' };
  if (celsius < 70) return { label: '温热', color: '#f59e0b' };
  if (celsius < 100) return { label: '很烫了', color: '#f97316' };
  return { label: '沸腾！', color: '#ef4444' };
}

export default function App() {
  const [state, setState] = useState<TempState>({ value: '25', scale: 'c' });

  const raw = toNumber(state.value);
  const celsius = raw === null ? null : state.scale === 'c' ? raw : ((raw - 32) * 5) / 9;
  const fahrenheit = raw === null ? null : state.scale === 'f' ? raw : (raw * 9) / 5 + 32;

  const celsiusText =
    state.scale === 'c' ? state.value : celsius === null ? '' : String(round1(celsius));
  const fahrenheitText =
    state.scale === 'f' ? state.value : fahrenheit === null ? '' : String(round1(fahrenheit));

  const water = celsius === null ? null : waterState(celsius);
  const progress = celsius === null ? 0 : Math.min(100, Math.max(0, celsius));

  return (
    <main style={page}>
      <h1>008 · 温度转换器</h1>
      <p style={muted}>
        两个输入框共享父组件里的同一份状态，这就是「状态提升」：子组件不私藏数据，由共同的父级统一管理并换算
      </p>

      <section style={{ ...card, display: 'flex', gap: 16 }}>
        <TemperatureInput
          scale="c"
          value={celsiusText}
          onChange={(value) => setState({ value, scale: 'c' })}
        />
        <TemperatureInput
          scale="f"
          value={fahrenheitText}
          onChange={(value) => setState({ value, scale: 'f' })}
        />
      </section>

      <section style={card}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 44, fontVariantNumeric: 'tabular-nums' }}>
            {celsius === null ? '--' : `${round1(celsius)}°C`}
          </span>
          {water && (
            <span
              style={{
                padding: '4px 12px',
                borderRadius: 999,
                background: water.color,
                color: '#fff',
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              {water.label}
            </span>
          )}
        </div>
        <div style={{ height: 10, borderRadius: 999, background: '#e2e8f0', marginTop: 16, overflow: 'hidden' }}>
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #38bdf8, #f97316, #ef4444)',
              transition: 'width 200ms',
            }}
          />
        </div>
        <p style={{ ...muted, marginTop: 8, marginBottom: 0 }}>
          {celsius === null
            ? '输入一个数字试试'
            : `换算成华氏度是 ${round1(fahrenheit ?? 0)}°F，水在 100°C 沸腾`}
        </p>
      </section>

      <button style={btn} onClick={() => setState({ value: '25', scale: 'c' })}>
        回到默认 25°C
      </button>
    </main>
  );
}
