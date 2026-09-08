import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type Theme = 'light' | 'dark';

interface Palette {
  background: string;
  surface: string;
  text: string;
  secondaryText: string;
  primary: string;
  border: string;
}

interface ThemeContextValue {
  theme: Theme;
  palette: Palette;
  toggleTheme: () => void;
}

const palettes: Record<Theme, Palette> = {
  light: {
    background: '#f1f5f9',
    surface: '#ffffff',
    text: '#0f172a',
    secondaryText: '#64748b',
    primary: '#2563eb',
    border: '#e2e8f0',
  },
  dark: {
    background: '#0f172a',
    surface: '#1e293b',
    text: '#e2e8f0',
    secondaryText: '#94a3b8',
    primary: '#60a5fa',
    border: '#334155',
  },
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      palette: palettes[theme],
      toggleTheme: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (value === null) {
    throw new Error('useTheme 只能在 ThemeProvider 内部使用');
  }
  return value;
}
