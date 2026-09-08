import { useTheme } from '../theme/ThemeContext';

export function Toolbar() {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: 16,
        borderRadius: 12,
        border: '1px solid transparent',
      }}
    >
      <Logo />
      <span style={{ marginLeft: 'auto' }} />
      <ThemeButton />
    </header>
  );
}

function Logo() {
  const { palette } = useTheme();
  return (
    <strong style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span
        style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          background: palette.primary,
        }}
      />
      ThemeShop
    </strong>
  );
}

function ThemeButton() {
  const { theme, palette, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '8px 16px',
        border: 'none',
        borderRadius: 8,
        background: palette.primary,
        color: '#fff',
        cursor: 'pointer',
        fontSize: 14,
      }}
    >
      切换到{theme === 'light' ? '深色' : '浅色'}模式
    </button>
  );
}
