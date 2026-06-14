import { CloseIcon } from '@/atoms/icon';
import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Button from './button';

interface IProps {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}

export default function Modal({
  open,
  title,
  subtitle,
  onClose,
  children,
  footer,
}: IProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // ESC to close + lock body scroll + focus the panel for keyboard users.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = requestAnimationFrame(() =>
      panelRef.current?.querySelector<HTMLElement>(
        'input, textarea, button, select',
      )?.focus(),
    );
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      cancelAnimationFrame(focusTimer);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="absolute inset-0 animate-backdrop-in bg-black/55 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="relative z-10 w-full max-w-md animate-scale-in rounded-t-2xl border border-line bg-panel shadow-lift sm:rounded-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
          <div>
            <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-content">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-0.5 text-sm text-muted">{subtitle}</p>
            )}
          </div>
          <Button
            variant="icon"
            aria-label="Close dialog"
            onClick={onClose}
            icon={<CloseIcon className="size-5" />}
          />
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-5 py-4">{children}</div>

        {footer && (
          <div className="flex items-center justify-end gap-2 border-t border-line px-5 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
