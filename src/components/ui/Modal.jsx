/**
 * @component Modal
 * @description Accessible modal dialog with backdrop blur, animations, and portal rendering.
 *
 * @param {boolean} open - Whether the modal is visible
 * @param {Function} onClose - Callback to close the modal
 * @param {string} [title] - Modal title shown in header
 * @param {'sm'|'md'|'lg'} [size='md'] - Modal width variant
 * @param {React.ReactNode} [footer] - Content rendered in the modal footer
 * @param {string} [className] - Additional CSS classes for the modal panel
 * @param {React.ReactNode} children - Modal body content
 */
import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import './Modal.css';

export function Modal({
  open,
  onClose,
  title,
  size = 'md',
  footer,
  className = '',
  children,
}) {
  /* Close on Escape key */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose?.();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', handleKeyDown);
    /* Prevent body scroll while modal is open */
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  const classes = ['modal', `modal--${size}`, className].filter(Boolean).join(' ');

  return createPortal(
    <div
      className="modal-overlay"
      onClick={(e) => {
        /* Close on backdrop click */
        if (e.target === e.currentTarget) onClose?.();
      }}
      aria-modal="true"
      role="dialog"
      aria-label={title || 'Modal dialog'}
    >
      <div className={classes}>
        {/* Header */}
        {(title || onClose) && (
          <div className="modal__header">
            {title && <h2 className="modal__title">{title}</h2>}
            {onClose && (
              <button
                className="modal__close"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="modal__body">{children}</div>

        {/* Footer */}
        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
