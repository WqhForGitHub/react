import { useEffect, type CSSProperties, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}

const overlay: CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(15, 23, 42, 0.55)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const panel: CSSProperties = {
  background: '#fff',
  borderRadius: 16,
  padding: 24,
  width: 'min(92vw, 420px)',
  boxShadow: '0 24px 64px rgba(0, 0, 0, 0.3)',
};

export function Modal({ open, title, onClose, children, footer }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div onClick={onClose} style={overlay}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        style={panel}
      >
        <header style={{ display: 'flex', alignItems: 'center' }}>
          <h3 style={{ margin: 0, flex: 1 }}>{title}</h3>
          <button
            onClick={onClose}
            aria-label="关闭"
            style={{ border: 'none', background: 'transparent', fontSize: 22, cursor: 'pointer', lineHeight: 1 }}
          >
            ×
          </button>
        </header>
        <div style={{ margin: '16px 0', color: '#475569', lineHeight: 1.8 }}>{children}</div>
        {footer && (
          <footer style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>{footer}</footer>
        )}
      </div>
    </div>,
    document.body
  );
}
