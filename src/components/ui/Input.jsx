/**
 * @component Input
 * @description Text input with label, helper text, error state, icon, and clear button.
 *
 * @param {string} [label] - Label text above the input
 * @param {string} [helperText] - Helper text below the input
 * @param {string} [error] - Error message (activates error styling)
 * @param {React.ReactNode} [icon] - Icon rendered inside the input (left side)
 * @param {boolean} [clearable=false] - Show a clear button when input has a value
 * @param {Function} [onClear] - Callback when clear button is clicked
 * @param {boolean} [required=false] - Marks the field as required
 * @param {string} [className] - Additional CSS classes for the input element
 * @param {string} [id] - Input element id (auto-generated if not provided)
 */
import { useId } from 'react';
import { X } from 'lucide-react';
import './Input.css';

export function Input({
  label,
  helperText,
  error,
  icon,
  clearable = false,
  onClear,
  required = false,
  className = '',
  id: propId,
  value,
  ...props
}) {
  const autoId = useId();
  const inputId = propId || autoId;
  const hasValue = value !== undefined && value !== '';

  const inputClasses = [
    'input',
    icon && 'input--has-icon',
    clearable && hasValue && 'input--has-clear',
    error && 'input--error',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="input-group">
      {label && (
        <label
          htmlFor={inputId}
          className={`input-group__label${required ? ' input-group__label--required' : ''}`}
        >
          {label}
        </label>
      )}

      <div className="input-wrap">
        {icon && (
          <span className="input-wrap__icon" aria-hidden="true">
            {icon}
          </span>
        )}

        <input
          id={inputId}
          className={inputClasses}
          value={value}
          required={required}
          aria-invalid={!!error || undefined}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />

        {clearable && hasValue && (
          <button
            type="button"
            className="input-wrap__clear"
            onClick={onClear}
            aria-label="Clear input"
            tabIndex={-1}
          >
            <X />
          </button>
        )}
      </div>

      {error && (
        <span id={`${inputId}-error`} className="input-group__error" role="alert">
          {error}
        </span>
      )}
      {!error && helperText && (
        <span id={`${inputId}-helper`} className="input-group__helper">
          {helperText}
        </span>
      )}
    </div>
  );
}

/**
 * @component Textarea
 * @description Multi-line text input with label, helper text, and error state.
 *
 * @param {string} [label] - Label text
 * @param {string} [helperText] - Helper text below the textarea
 * @param {string} [error] - Error message
 * @param {boolean} [required=false] - Marks the field as required
 * @param {string} [className] - Additional CSS classes
 * @param {number} [rows=3] - Number of visible text rows
 */
export function Textarea({
  label,
  helperText,
  error,
  required = false,
  className = '',
  id: propId,
  rows = 3,
  ...props
}) {
  const autoId = useId();
  const inputId = propId || autoId;

  const textareaClasses = [
    'textarea',
    error && 'textarea--error',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="input-group">
      {label && (
        <label
          htmlFor={inputId}
          className={`input-group__label${required ? ' input-group__label--required' : ''}`}
        >
          {label}
        </label>
      )}

      <textarea
        id={inputId}
        className={textareaClasses}
        rows={rows}
        required={required}
        aria-invalid={!!error || undefined}
        aria-describedby={
          error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
        }
        {...props}
      />

      {error && (
        <span id={`${inputId}-error`} className="input-group__error" role="alert">
          {error}
        </span>
      )}
      {!error && helperText && (
        <span id={`${inputId}-helper`} className="input-group__helper">
          {helperText}
        </span>
      )}
    </div>
  );
}

export default Input;
