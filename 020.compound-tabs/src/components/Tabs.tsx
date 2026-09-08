import {
  createContext,
  useContext,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

interface TabsContextValue {
  value: string;
  setValue: (next: string) => void;
  idPrefix: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs(): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (ctx === null) {
    throw new Error('Tabs 子组件必须放在 Tabs 内部使用');
  }
  return ctx;
}

interface TabsProps {
  defaultValue: string;
  value?: string;
  onChange?: (value: string) => void;
  children: ReactNode;
}

export function Tabs({ defaultValue, value: controlled, onChange, children }: TabsProps) {
  const [internal, setInternal] = useState(defaultValue);
  const idPrefix = useId();

  const context = useMemo<TabsContextValue>(
    () => ({
      value: controlled ?? internal,
      idPrefix,
      setValue: (next: string) => {
        if (controlled === undefined) setInternal(next);
        onChange?.(next);
      },
    }),
    [controlled, internal, idPrefix, onChange]
  );

  return <TabsContext.Provider value={context}>{children}</TabsContext.Provider>;
}

export function TabsList({ children }: { children: ReactNode }) {
  return (
    <div
      role="tablist"
      style={{ display: 'flex', gap: 8, borderBottom: '1px solid #e2e8f0', padding: 4 }}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children }: { value: string; children: ReactNode }) {
  const { value: active, setValue, idPrefix } = useTabs();
  const isActive = active === value;

  return (
    <button
      role="tab"
      id={`${idPrefix}-tab-${value}`}
      aria-selected={isActive}
      aria-controls={`${idPrefix}-panel-${value}`}
      onClick={() => setValue(value)}
      style={{
        padding: '8px 16px',
        border: 'none',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        cursor: 'pointer',
        background: isActive ? '#2563eb' : 'transparent',
        color: isActive ? '#fff' : '#475569',
        fontSize: 14,
      }}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }: { value: string; children: ReactNode }) {
  const { value: active, idPrefix } = useTabs();
  if (active !== value) return null;

  return (
    <div
      role="tabpanel"
      id={`${idPrefix}-panel-${value}`}
      aria-labelledby={`${idPrefix}-tab-${value}`}
      style={{
        padding: 16,
        border: '1px solid #e2e8f0',
        borderTop: 'none',
        borderRadius: '0 0 12px 12px',
        lineHeight: 1.8,
      }}
    >
      {children}
    </div>
  );
}
