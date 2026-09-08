import type { CSSProperties, ReactNode } from 'react';
import { Toolbar } from './components/Toolbar';
import { ThemeProvider, useTheme } from './theme/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <Page />
    </ThemeProvider>
  );
}

function Page() {
  const { palette } = useTheme();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: palette.background,
        color: palette.text,
        fontFamily: 'system-ui, sans-serif',
        padding: 24,
        transition: 'background 200ms, color 200ms',
      }}
    >
      <h1 style={{ marginBottom: 4 }}>016 · Context 主题切换</h1>
      <p style={{ color: palette.secondaryText, fontSize: 14, lineHeight: 1.7 }}>
        深层组件用 useContext 直接拿到主题，中间的布局层级完全不需要透传 props
      </p>

      <Toolbar />

      <LayoutLayer>
        <LayoutLayer>
          <ThemedCard />
        </LayoutLayer>
      </LayoutLayer>
    </div>
  );
}

function LayoutLayer({ children }: { children: ReactNode }) {
  return (
    <div style={{ padding: 16, border: '1px dashed #94a3b8', borderRadius: 12, marginTop: 16 }}>
      {children}
    </div>
  );
}

function ThemedCard() {
  const { palette } = useTheme();

  const cardStyle: CSSProperties = {
    padding: 20,
    borderRadius: 12,
    background: palette.surface,
    border: `1px solid ${palette.border}`,
  };

  return (
    <div style={cardStyle}>
      <h2 style={{ marginTop: 0, fontSize: 16 }}>我在好几层布局下面</h2>
      <p style={{ color: palette.secondaryText, fontSize: 14 }}>
        这张卡片和右边的徽章都直接调用 useTheme()，最外层的 LayoutLayer 们对主题一无所知
      </p>
      <ThemedBadge />
    </div>
  );
}

function ThemedBadge() {
  const { palette } = useTheme();
  return (
    <span
      style={{
        padding: '4px 12px',
        borderRadius: 999,
        background: palette.primary,
        color: '#fff',
        fontSize: 13,
      }}
    >
      主题色徽章
    </span>
  );
}
