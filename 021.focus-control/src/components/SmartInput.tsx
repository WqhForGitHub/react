import {
  useId,
  useImperativeHandle,
  useRef,
  type CSSProperties,
  type InputHTMLAttributes,
  type Ref,
} from 'react';

export interface SmartInputHandle {
  focus: () => void;
  clear: () => void;
  shake: () => void;
  getValue: () => string;
}

interface SmartInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  ref?: Ref<SmartInputHandle>;
}

const box: CSSProperties = { marginBottom: 16 };

const labelText: CSSProperties = {
  display: 'block',
  fontWeight: 600,
  marginBottom: 6,
  fontSize: 14,
};

const input: CSSProperties = {
  width: '100%',
  padding: '9px 11px',
  border: '1px solid #cbd5e1',
  borderRadius: 8,
  boxSizing: 'border-box',
  fontSize: 14,
};

export function SmartInput({ label, ref, ...rest }: SmartInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputId = useId();

  useImperativeHandle(
    ref,
    () => ({
      focus: () => inputRef.current?.focus(),
      clear: () => {
        if (inputRef.current) inputRef.current.value = '';
      },
      getValue: () => inputRef.current?.value ?? '',
      shake: () => {
        const el = wrapRef.current;
        if (!el) return;
        let step = 0;
        const timer = setInterval(() => {
          step += 1;
          if (step >= 7) {
            clearInterval(timer);
            el.style.transform = 'translateX(0)';
            return;
          }
          el.style.transform = `translateX(${step % 2 === 1 ? -6 : 6}px)`;
        }, 50);
      },
    }),
    []
  );

  return (
    <div ref={wrapRef} style={box}>
      <label htmlFor={inputId} style={labelText}>
        {label}
      </label>
      <input id={inputId} ref={inputRef} style={input} {...rest} />
    </div>
  );
}
